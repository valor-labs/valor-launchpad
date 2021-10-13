import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { HELPERS } from '../../libs/common-api/src/lib/entity/seed_helpers/data';
import { Seeder } from './seeder';
import { USER_1, USER_2, USER_3 } from '../seed-data/users';

export class UserSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed(): Promise<unknown> {
    return await this.prisma.userEntity.createMany({
      data: [
        { ...(await this.defaultEntity()), ...USER_1 },
        { ...(await this.defaultEntity()), ...USER_2 },
        { ...(await this.defaultEntity()), ...USER_3 },
      ],
    });
  }

  async delete(): Promise<unknown> {
    return await this.prisma.userEntity.deleteMany();
  }

  async defaultEntity() {
    return {
      password: await bcrypt.hash(HELPERS.defaultPassword, HELPERS.saltRounds),
      emailVerified: true,
    };
  }
}
