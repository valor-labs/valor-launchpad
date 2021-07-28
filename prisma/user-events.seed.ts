import {PrismaClient} from '@prisma/client';
import {UserEntity} from '../libs/common-api/src';

export class UserEventsSeed {
  constructor(private prisma: PrismaClient) {
  }

  async createUserEvent(event:string, targetUser: UserEntity, actingUser:UserEntity) {
    return this.prisma.userEventsEntity.create({
      data:{
        event,
        target_user_id: targetUser.id,
        acting_user_id: actingUser.id
      }
    })
  }
}
