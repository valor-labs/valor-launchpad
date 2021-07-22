import {Injectable} from '@nestjs/common';
import {PrismaService} from '@valor-launchpad/prisma';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {
  }

  async getProfile(username: string) {
    //TODO: need to fix this and the seed after cleanup
    return await this.prisma.profileEntity.findUnique({
      where: {
        username
      },
      include: {
        activityEntity: {
          include: {
            ActivityEntity: true
          }
        }
      }
    });
  }
}
