import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@valor-launchpad/prisma';
import { SocketConnService } from '@valor-launchpad/socket-gateway';
import {
  ChatMessageVo,
  ChatSearchVo,
  ChatThreadVo,
} from '@valor-launchpad/api-interfaces';
import { ChatUnreadService } from './chat-unread.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';

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

  async findRecentThreads(actingUser, keyword?: string) {
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

  async searchThreadOrUsers(
    keyword: string,
    actingUser
  ): Promise<ChatSearchVo> {
    let nameFilter: Prisma.UserEntityWhereInput;
    if (keyword && keyword.length > 0) {
      nameFilter = {
        OR: [
          { firstName: { contains: keyword } },
          { lastName: { contains: keyword } },
          { username: { contains: keyword } },
          { email: { contains: keyword } },
          { phone: { contains: keyword } },
        ],
      };
    }
    const others = await this.prisma.userEntity.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        profile: {
          select: {
            avatar: {
              select: {
                src: true,
                src_webp: true,
                alt: true,
              },
            },
          },
        },
        chatUserThreads: {
          where: {
            thread: {
              chatThreadUsers: {
                some: {
                  userId: actingUser.id,
                },
              },
              isGroup: false,
            },
          },
        },
      },
      where: {
        deletedDate: null,
        id: { not: actingUser.id },
        ...nameFilter,
      },
    });
    // find if self hit
    const self = await this.prisma.userEntity.findFirst({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        profile: {
          select: {
            avatar: {
              select: {
                src: true,
                src_webp: true,
                alt: true,
              },
            },
          },
        },
        chatUserThreads: {
          where: {
            thread: {
              chatThreadUsers: {
                every: {
                  userId: actingUser.id,
                },
              },
              isGroup: false,
            },
          },
        },
      },
      where: {
        id: actingUser.id,
        ...nameFilter,
      },
    });

    // find groups
    const groups = await this.prisma.chatThread.findMany({
      ...this.threadListSelect,
      where: {
        isGroup: true,
        name: {
          contains: keyword,
        },
      },
    });
    return {
      contacts: [...others, ...(self ? [self] : [])].map((i) => {
        return {
          id: i.chatUserThreads[0]?.threadId,
          targetingUser: i,
          avatar: i.profile.avatar,
          name: `${i.firstName} ${i.lastName}`,
        };
      }),
      groups: groups.map((i) => ({
        id: i.id,
        name: i.name,
        chatThreadUsers: i.chatThreadUsers.map((item) => item.user),
        isGroup: true,
      })),
    };
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

  async createGroup({ userIds, threadName }: CreateThreadDto, actingUser) {
    if (!userIds.includes(actingUser.id)) {
      userIds.push(actingUser.id);
    }
    const newThread = await this.prisma.chatThread.create({
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
    return this.threadToVo(newThread, actingUser);
  }

  async createSingleThread({ userIds }: CreateThreadDto, actingUser) {
    const query = await this.prisma.$queryRaw<unknown[]>`
      SELECT ctu.threadId, GROUP_CONCAT(ctu.userId) AS uids
      FROM ChatThreadUser ctu
      INNER JOIN ChatThread ct ON ctu.threadId = ct.id
      WHERE ct.isGroup = 0
      GROUP BY ctu.threadId
      HAVING
        (uids LIKE ${'%' + actingUser.id} AND uids LIKE ${userIds[0] + '%'})
          OR
        (uids LIKE ${actingUser.id + '%'} AND uids LIKE ${'%' + userIds[0]})
    `;
    if (query.length > 0) {
      throw new HttpException(
        'The thread exists already.',
        HttpStatus.BAD_REQUEST
      );
    }
    const lines = Array.from(new Set<string>([userIds[0], actingUser.id]));
    const newThread = await this.prisma.chatThread.create({
      ...this.threadListSelect,
      data: {
        isGroup: false,
        lastChatDate: new Date(),
        chatThreadUsers: {
          createMany: {
            data: lines.map((userId) => ({ userId })),
          },
        },
      },
    });
    return this.threadToVo(newThread, actingUser);
  }

  async updateGroup(
    threadId: string,
    updateThreadDto: UpdateThreadDto,
    actingUser
  ) {
    const data: Prisma.ChatThreadUpdateInput = {};
    if (Reflect.has(updateThreadDto, 'threadName')) {
      data.name = updateThreadDto.threadName;
    }
    if (Reflect.has(updateThreadDto, 'userIds')) {
      data.chatThreadUsers = {
        deleteMany: { threadId },
        createMany: {
          data: updateThreadDto.userIds.map((userId) => ({ userId })),
        },
      };
    }
    const updatedThread = await this.prisma.chatThread.update({
      ...this.threadListSelect,
      data,
      where: { id: threadId },
    });
    return this.threadToVo(updatedThread, actingUser);
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

  async findUnreadMessages(actingUser) {
    const query = await this.chatUnreadService.findUnreadThreads(actingUser.id);
    const messageIds = Object.values(query).reduce(
      (prev, item) => [...prev, ...item],
      []
    );
    return this.prisma.chatMessage.findMany({
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
      where: { id: { in: messageIds } },
      orderBy: { createdDate: 'desc' },
    });
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
    message: any[],
    actingUser,
    socketId: string
  ) {
    // find thread and update its lastChatDate
    const thread = await this.prisma.chatThread.findUnique({
      include: {
        chatThreadUsers: { select: { user: { select: { id: true } } } },
      },
      where: { id: threadId },
    });
    const relevantUserIds = thread.chatThreadUsers.map((i) => i.user.id);

    if (!relevantUserIds.includes(actingUser.id)) {
      throw new HttpException(
        'You are not in the thread',
        HttpStatus.FORBIDDEN
      );
    }

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
        message: message as Prisma.JsonArray,
        threadId,
        createdUserId: actingUser.id,
      },
    });

    // update thread's lastChatDate
    await this.prisma.chatThread.update({
      data: { lastChatDate: new Date() },
      where: { id: threadId },
    });

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
