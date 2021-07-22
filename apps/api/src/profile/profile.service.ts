import {Injectable} from '@nestjs/common';
import {PrismaService} from '@valor-launchpad/prisma';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {
  }

  async getProfile(id: string) {
    //TODO: need to fix this and the seed after cleanup
    const profile =  await this.prisma.profileEntity.findUnique({
      where: {
        id
      },
      include: {
        activityEntity: {
          include: {
            ActivityEntity: true
          }
        }
      }
    });
    return profile
  }
}
