import { Seeder } from './seeder';
import { PrismaClient } from '@prisma/client';
import { ADMIN, USER } from '../seed-data/role.data';
import { USER_1, USER_2, USER_3 } from '../seed-data/users';

export class UserRoleSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed(): Promise<unknown> {
    return await this.prisma.userRolesEntity.createMany({
      data: [
        { role_id: ADMIN.id, user_id: USER_1.id },
        { role_id: USER.id, user_id: USER_1.id },
        { role_id: USER.id, user_id: USER_2.id },
        { role_id: USER.id, user_id: USER_3.id },
      ],
    });
  }

  async delete(): Promise<unknown> {
    return await this.prisma.userRolesEntity.deleteMany();
  }
}
