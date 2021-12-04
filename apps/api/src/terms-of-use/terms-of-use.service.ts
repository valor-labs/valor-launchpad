import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@valor-launchpad/prisma';
import { TermsOfUseEntity } from '@valor-launchpad/api-interfaces';

@Injectable()
export class TermsOfUseService {
  constructor(private prisma: PrismaService) {}

  public async getUserTermsOfUse(userId: string): Promise<boolean> {
    let termOfUseAcceptance;
    const latestTermsOfUse = await this.fetchLatestTermsOfUse();

    if (latestTermsOfUse) {
      termOfUseAcceptance = await this.prisma.termsOfUseAcceptance.findFirst({
        where: {
          userId,
          termsOfUseId: latestTermsOfUse.id,
        },
      });
    }

    return !!termOfUseAcceptance;
  }

  public async fetchTermsOfUseList(): Promise<TermsOfUseEntity[]> {
    return await this.prisma.termsOfUse.findMany({});
  }

  public async fetchLatestTermsOfUse(): Promise<TermsOfUseEntity> {
    return await this.prisma.termsOfUse.findFirst({
      orderBy: {
        createdDate: 'desc',
      },
    });
  }

  public async createTermsOfUse(termOfUse: Partial<TermsOfUseEntity>) {
    const { title, content, createdUserId } = termOfUse;

    return await this.prisma.termsOfUse.create({
      data: {
        title,
        content,
        createdUserId,
      },
    });
  }

  public async acceptTermsOfUse(userId: string) {
    const latestTermsOfUse = await this.fetchLatestTermsOfUse();

    if (!latestTermsOfUse) {
      throw new HttpException('No Terms of use found', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.termsOfUseAcceptance.create({
      data: {
        termsOfUseId: latestTermsOfUse.id,
        userId,
      },
    });
  }
}
