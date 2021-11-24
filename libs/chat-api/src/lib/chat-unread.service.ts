import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { RedisService } from 'nestjs-redis';

/**
 * data structure
 * [user] has unread [msg1, msg2] on [thread]
 * :user1:thread1 -------- [msg1, msg2]
 * :user1:thread2 -------- [msg3]
 * :user2:thread1 -------- [msg4]
 */
@Injectable()
export class ChatUnreadService {
  private redis: Redis;
  private prefix = 'valor_launchpad:chat';

  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getClient();
  }

  async add(userId: string, threadId: string, messageId: string) {
    await this.redis.rpush(`${this.prefix}:${userId}:${threadId}`, messageId);
  }

  async findUnreadThreads(userId: string): Promise<Record<string, string[]>> {
    const keys = await this.redis.keys(`${this.prefix}:${userId}:*`);
    const res = {};
    for (const k of keys) {
      res[k.split(':').pop()] = await this.redis.lrange(k, 0, -1);
    }
    return res;
  }

  async markAsRead(userId: string, threadId: string) {
    await this.redis.del(`${this.prefix}:${userId}:${threadId}`);
  }
}
