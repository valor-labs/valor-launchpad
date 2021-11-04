import { PrismaClient } from '@prisma/client';
import { Seeder } from './seeder';
import {
  USER1_VALIDATION,
  USER2_VALIDATION,
  USER3_VALIDATION,
} from '../seed-data/password-validation.data';

export class PasswordValidateSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed(): Promise<unknown> {
    return await this.prisma.passwordValidationEntity.createMany({
      data: [USER1_VALIDATION, USER2_VALIDATION, USER3_VALIDATION],
    });
  }

  async delete(): Promise<unknown> {
    return await this.prisma.passwordValidationEntity.deleteMany();
  }
}
