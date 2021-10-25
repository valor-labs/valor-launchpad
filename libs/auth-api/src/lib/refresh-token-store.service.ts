import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import type { Redis } from 'ioredis';

@Injectable()
export class RefreshTokenStoreService {
  private prefix = 'valor_launchpad:refresh_token';
  private redis: Redis;
  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getClient();
  }

  async saveRefreshToken(userId: string, refreshToken: string) {
    // refresh token expires after 1 day
    await this.redis.setex(`${this.prefix}:${userId}`, 86400, refreshToken);
  }

  getRefreshToken(userId: string) {
    return this.redis.get(`${this.prefix}:${userId}`);
  }
}
