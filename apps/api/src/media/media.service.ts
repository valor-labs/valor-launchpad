import { Injectable } from '@nestjs/common';
import { PrismaService } from '@valor-launchpad/prisma';

@Injectable()
export class MediaService {
  constructor(private prisma: PrismaService) {}

  updateProfileImg(originImagePath, webpImagePath, alt, imageType, profileId) {
    return this.prisma.mediaAsset.upsert({
      where: {
        profile_id: profileId
      },
      update: { src: originImagePath, src_webp: webpImagePath },
      create: {
        type: imageType,
        src: originImagePath,
        alt: alt,
        src_webp: webpImagePath,
        profile_id: profileId
      },
    });
  }
}
