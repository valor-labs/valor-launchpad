import { Injectable } from '@nestjs/common';
import { PrismaService } from '@valor-launchpad/prisma';
import { SocketConnService } from '@valor-launchpad/socket-gateway';
import { ChatMessageVo } from '@valor-launchpad/api-interfaces';
import { ChatUnreadService } from './chat-unread.service';

@Injectable()
export class ChatService {
  constructor(
    private prisma: PrismaService,
    private socketConnService: SocketConnService,
    private chatUnreadService: ChatUnreadService
  ) {}

  async findRecentThreads(actingUser) {
    const threads = await this.prisma.chatThread.findMany({
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
      where: {
        chatThreadUsers: {
          some: {
            userId: actingUser.id,
          },
        },
      },
      orderBy: { lastChatDate: 'desc' },
    });

    const unreadThreads = await this.chatUnreadService.findUnreadThreads(
      actingUser.id
    );

    return threads.map((t) => {
      const otherUsersInChat = t.chatThreadUsers
        .map((i) => ({
          ...i.user,
          isConnected: this.socketConnService.isConnected(i.user.id),
        }))
        .filter((i) => i.id !== actingUser.id);
      return {
        ...t,
        chatThreadUsers: t.chatThreadUsers.map((i) => ({
          ...i.user,
          isConnected: this.socketConnService.isConnected(i.user.id),
        })),
        avatar: t.isGroup ? null : otherUsersInChat[0].profile.avatar,
        name: t.isGroup
          ? t.name
          : `${otherUsersInChat[0].firstName} ${otherUsersInChat[0].lastName}`,
        isConnected: otherUsersInChat[0].isConnected,
        targetingUser: t.isGroup ? null : otherUsersInChat[0],
        unreadMessages: unreadThreads[t.id] ?? [],
      };
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
    // find thread
    const thread = await this.prisma.chatThread.findUnique({
      include: {
        chatThreadUsers: {
          select: { user: { select: { id: true } } },
        },
      },
      where: { id: threadId },
    });
    const chatMessage = await this.prisma.chatMessage.create({
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
      data: {
        message,
        threadId,
        createdUserId: actingUser.id,
      },
    });

    // notify relevant users
    // the source socket do not need
    const relevantUserIds = thread.chatThreadUsers.map((i) => i.user.id);
    for (const userId of relevantUserIds) {
      this.socketConnService.notifyByUserId<ChatMessageVo>(
        userId,
        'newMessage',
        {
          ...chatMessage,
          isSelf: chatMessage.createdUserId === userId,
        },
        [socketId]
      );
    }

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
    return { ...chatMessage, isSelf: true };
  }

  async markAsRead(userId: string, threadId: string) {
    return this.chatUnreadService.markAsRead(userId, threadId);
  }
}
