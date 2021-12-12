import { PrismaClient } from '@prisma/client';
import { Seeder } from './seeder';
import { ROLES } from '../seed-data/role.data';

export class RoleSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed(): Promise<unknown> {
    return this.prisma.rolesEntity.createMany({
      data: ROLES,
    });
  }

  async delete(): Promise<unknown> {
    return this.prisma.rolesEntity.deleteMany();
  }
}
