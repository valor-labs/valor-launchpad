import { PrismaClient } from '@prisma/client';
import { Seeder } from './seeder';
import { defaultTermsOfUse } from '../seed-data/terms-of-use.data';
import { USER_1 } from '../seed-data/users';


export class TermsOfUseSeed implements Seeder {
  constructor(private prisma: PrismaClient) { }

  async seed() {
    await this.prisma.termsOfUse.create({
      data: {
        ...defaultTermsOfUse,
        createdUserId: USER_1.id
      }
    })
  }

  async delete() {
    return await this.prisma.termsOfUse.deleteMany();
  }
}