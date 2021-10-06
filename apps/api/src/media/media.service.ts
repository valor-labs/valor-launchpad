import {Injectable} from '@nestjs/common';
import {PrismaService} from '@valor-launchpad/prisma';

@Injectable()
export class MediaService {
  constructor(private prisma: PrismaService) {
  }

  async updateProfileImg(originImagePath, webpImagePath, alt, imageType, profileId) {
   return await this.prisma.mediaAsset.upsert({
      where: {  profile_alt_unique_constraint: { profile_id: profileId, alt: alt } },
      update: { src:originImagePath, src_webp: webpImagePath },
      create: {
        type: imageType,
        src: originImagePath,
        alt: alt,
        src_webp: webpImagePath,
        profile: {
          connect: {
            id: profileId
          }
        }
      }
    })
  }

}
