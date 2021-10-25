import { Module } from '@nestjs/common';
import { PrismaModule } from '@valor-launchpad/prisma';
import { MediaService } from './media.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [MediaService],
  exports: [MediaService],
})
export class MediaModule {}
