import { Injectable } from '@nestjs/common';
import { PrismaService } from '@valor-launchpad/prisma';
import { SocketConnService } from '@valor-launchpad/socket-gateway';
import { ChatMessageVo, ChatThreadVo } from '@valor-launchpad/api-interfaces';
import { ChatUnreadService } from './chat-unread.service';
import { CreateThreadDto } from './dto/create-thread.dto';

@Injectable()
export class ChatService {
  private threadListSelect = {
    include: {
      chatThreadUsers: {
        select: {
          user: {
            select: {
              id: true,
              username: true,
              firstName: true,
              lastName: true,
              profile: {
                select: {
                  avatar: {
                    select: { src: true, src_webp: true, alt: true },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  constructor(
    private prisma: PrismaService,
    private socketConnService: SocketConnService,
    private chatUnreadService: ChatUnreadService
  ) {}

  async findRecentThreads(actingUser) {
    const threads = await this.prisma.chatThread.findMany({
      ...this.threadListSelect,
      where: {
        chatThreadUsers: {
          some: {
            userId: actingUser.id,
          },
        },
      },
      orderBy: { lastChatDate: 'desc' },
    });

    const result = [];
    for (const t of threads) {
      result.push(await this.threadToVo(t, actingUser));
    }
    return result;
  }

  private async threadToVo(
    t,
    actingUser: { id: string }
  ): Promise<ChatThreadVo> {
    const unreadThreads = await this.chatUnreadService.findUnreadThreads(
      actingUser.id
    );
    let name;
    let avatar;
    let isConnected;
    let targetingUser;
    const otherUsersInChat = t.chatThreadUsers
      .map((i) => ({
        ...i.user,
        isConnected: this.socketConnService.isConnected(i.user.id),
      }))
      .filter((i) => i.id !== actingUser.id);
    if (t.isGroup) {
      name = t.name;
      avatar = null;
      isConnected = false;
      targetingUser = null;
    } else if (otherUsersInChat.length > 0) {
      name = `${otherUsersInChat[0].firstName} ${otherUsersInChat[0].lastName}`;
      avatar = otherUsersInChat[0].profile.avatar;
      isConnected = otherUsersInChat[0].isConnected;
      targetingUser = otherUsersInChat[0];
    } else {
      // chat with self
      name = `${t.chatThreadUsers[0].user.firstName} ${t.chatThreadUsers[0].user.lastName} (You)`;
      avatar = t.chatThreadUsers[0].user.profile.avatar;
      isConnected = true;
      targetingUser = t.chatThreadUsers[0].user;
    }
    return {
      ...t,
      chatThreadUsers: t.chatThreadUsers.map((i) => ({
        ...i.user,
        isConnected: this.socketConnService.isConnected(i.user.id),
      })),
      avatar,
      name,
      isConnected,
      targetingUser,
      unreadMessages: unreadThreads[t.id] ?? [],
    };
  }

  createGroup({ userIds, threadName }: CreateThreadDto, actingUser) {
    if (!userIds.includes(actingUser.id)) {
      userIds.push(actingUser.id);
    }
    return this.prisma.chatThread.create({
      ...this.threadListSelect,
      data: {
        isGroup: true,
        name: threadName,
        lastChatDate: new Date(),
        chatThreadUsers: {
          createMany: {
            data: userIds.map((userId) => ({ userId })),
          },
        },
      },
    });
  }

  // todo: paginate
  async findThreadMessages(threadId: string, actingUser) {
    const messages = await this.prisma.chatMessage.findMany({
      include: {
        createdUser: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            profile: {
              select: {
                avatar: { select: { src: true, src_webp: true, alt: true } },
              },
            },
          },
        },
      },
      where: { threadId },
      orderBy: { createdDate: 'desc' },
    });

    return messages.map((m) => ({
      ...m,
      isSelf: m.createdUserId === actingUser.id,
    }));
  }

  async findThread(targetUserId: string, actingUser) {
    return await this.prisma.chatThreadUser.findFirst({
      select: { threadId: true },
      where: {
        userId: actingUser.id,
        thread: {
          isGroup: false,
          chatThreadUsers: {
            some: {
              userId: targetUserId,
            },
          },
        },
      },
    });
  }

  async createMessage(
    threadId: string,
    message: string,
    actingUser,
    socketId: string
  ) {
    // find thread and update its lastChatDate
    const thread = await this.prisma.chatThread.update({
      data: { lastChatDate: new Date() },
      include: {
        chatThreadUsers: {
          select: { user: { select: { id: true } } },
        },
      },
      where: { id: threadId },
    });

    const chatMessage = await this.prisma.chatMessage.create({
      include: {
        thread: this.threadListSelect,
        createdUser: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            profile: {
              select: {
                avatar: { select: { src: true, src_webp: true, alt: true } },
              },
            },
          },
        },
      },
      data: {
        message,
        threadId,
        createdUserId: actingUser.id,
      },
    });

    const relevantUserIds = thread.chatThreadUsers.map((i) => i.user.id);

    // unread message store
    const otherRelevantUserIds = relevantUserIds.filter(
      (i) => i !== actingUser.id
    );
    for (const userId of otherRelevantUserIds) {
      await this.chatUnreadService.add(
        userId,
        chatMessage.threadId,
        chatMessage.id
      );
    }

    // notify relevant users
    // the source socket do not need
    for (const userId of relevantUserIds) {
      this.socketConnService.notifyByUserId<ChatMessageVo>(
        userId,
        'newMessage',
        {
          ...chatMessage,
          isSelf: chatMessage.createdUserId === userId,
          thread: await this.threadToVo(chatMessage.thread, { id: userId }),
        },
        [socketId]
      );
    }

    return { ...chatMessage, isSelf: true };
  }

  async markAsRead(userId: string, threadId: string) {
    return this.chatUnreadService.markAsRead(userId, threadId);
  }

  async syncTypingStatus(threadId: string, actingUser) {
    const query = await this.prisma.chatThreadUser.findMany({
      select: { userId: true },
      where: { threadId, userId: { not: actingUser.id } },
    });
    for (const { userId } of query) {
      // tell [userId]: actingUser is typing on [threadId]
      this.socketConnService.notifyByUserId(userId, 'typing', {
        userId: actingUser.id,
        threadId,
      });
    }
  }
}
