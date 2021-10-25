import { PrismaClient } from '@prisma/client';
import { Seeder } from './seeder';
import { PROJECTS } from '../seed-data/project.data';
import { PROJECT_MEDIA_ASSETS } from '../seed-data/project-media-asset.data';

export class ProjectsMediaAssetSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed(): Promise<unknown> {
    return await this.prisma.mediaAsset.createMany({
      data: PROJECT_MEDIA_ASSETS,
    });
  }

  async delete(): Promise<unknown> {
    return await this.prisma.mediaAsset.deleteMany({
      where: { project_id: { in: PROJECTS.map((i) => i.id) } },
    });
  }
}
