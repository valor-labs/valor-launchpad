import {CreateRolesEntity, RolesEntity} from '../libs/common-api/src';
import {PrismaClient} from '@prisma/client'

export class RoleSeed {
  constructor(private prisma: PrismaClient) {
  }

  async createRole(seedObj: CreateRolesEntity) {
    return await this.prisma.rolesEntity.upsert({
      where: {role: seedObj.role},
      update: {},
      create: seedObj as RolesEntity
    })
  }
}
