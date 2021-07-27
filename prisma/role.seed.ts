import {RolesEntity} from '../libs/common-api/src';
import {PrismaClient} from '@prisma/client'

export class RoleSeed {
  constructor(private prisma: PrismaClient) {
  }

  async createRole(seedObj: Partial<RolesEntity>){
    return await this.prisma.rolesEntity.create({
      data: seedObj as RolesEntity
    })
  }
}
