import { Injectable } from '@nestjs/common';
import { PrismaService } from '@valor-launchpad/prisma';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async getProfile(username: string, actingUser) {
    const userFollower = await this.prisma.socialUserFollower.findFirst({
      where: {
        user: { is: { username } },
        followerId: actingUser.id,
        deletedDate: null,
      },
    });
    const profile = await this.prisma.profileEntity.findUnique({
      where: { username },
      include: {
        avatar: {
          select: { src: true, alt: true, src_webp: true },
        },
        employers: {
          include: {
            employer: true,
          },
        },
        socialMedia: {
          select: {
            socialMediaUrl: true,
            socialMedia: {
              select: { icon: true, name: true },
            },
          },
          where: { deletedDate: null },
        },
        skills: {
          select: {
            skill: { select: { name: true } },
          },
          where: { deletedDate: null },
        },
      },
    });
    return {
      ...profile,
      following: !!userFollower,
    };
  }

  updateProfileName(profileId, newName: string) {
    return this.prisma.profileEntity.update({
      where: {id: profileId},
      data: {
        user: {
          update: {
            username: newName
          }
        }
      }
    });
  }
}
