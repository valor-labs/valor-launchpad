import { CreateRolesEntity, RolesEntity } from '../../libs/common-api/src';
import { PrismaClient } from '@prisma/client';
import { Seeder } from './seeder';
import { ROLES } from '../seed-data/role.data';

export class RoleSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async createRole(seedObj: CreateRolesEntity) {
    return await this.prisma.rolesEntity.upsert({
      where: { role: seedObj.role },
      update: {},
      create: seedObj as RolesEntity,
    });
  }

  async seed(): Promise<unknown> {
    return this.prisma.rolesEntity.createMany({
      data: ROLES,
    });
  }

  async delete(): Promise<unknown> {
    return this.prisma.rolesEntity.deleteMany();
  }
}
