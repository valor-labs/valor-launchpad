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
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        },
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

  updateProfileName(profileId, newName: string, newBio: string) {
    return this.prisma.profileEntity.update({
      where: { id: profileId },
      data: {
        bio: newBio,
        user: {
          update: {
            username: newName,
          },
        },
      },
    });
  }

  updatePrivateProfile(profileId, firstName, lastName, email, newAddress, address2, city, zip, language, locale, timezone) {
    return this.prisma.profileEntity.update({
      where: {id: profileId},
      data: {
        location: newAddress,
        zip: zip,
        language: language,
        locale: locale,
        timeZone: timezone,
        city: city,
        address: address2,
        user: {
          update: {
            firstName,
            lastName,
            email
          }
        }
      }
    });
  }
}
