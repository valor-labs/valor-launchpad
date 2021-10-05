import * as Faker from 'faker';
import { PrismaClient, Prisma } from '@prisma/client';
import { SOCIAL_MEDIAS } from './seed-data/social-media.data';
import { SKILLS } from './seed-data/skill.data';

export class ProfileSeed {
  constructor(private prisma: PrismaClient) {}

  async createProfile(user) {
    const createEntity: Prisma.ProfileEntityUncheckedCreateInput = {
      username: user.username,
      name: user.firstName + ' ' + user.lastName,
      avatar: {
        create: {
          type: 'image/jpg',
          src: user.avatar.src,
          alt: `${user.username} profile picture`,
        },
      },
      from: Faker.address.city(),
      title: Faker.random.word(),
      location: Faker.address.city(),
      socialMedia: {
        createMany: {
          data: SOCIAL_MEDIAS.map((i) => ({
            socialMediaId: i.id,
            socialMediaUrl: i.baseUrl,
          })),
          skipDuplicates: true,
        },
      },
      skills: {
        create: SKILLS.map((skill) => ({
          skill: { connect: { name: skill.name } },
        })),
      },
    };
    return await this.prisma.profileEntity.upsert({
      where: { username: user.username },
      update: {},
      create: createEntity,
    });
  }
}
