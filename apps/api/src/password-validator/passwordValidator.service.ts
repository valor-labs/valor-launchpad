import { Injectable } from '@nestjs/common';
import { PrismaService } from '@valor-launchpad/prisma';

@Injectable()
export class PasswordValidatorService {
  constructor(private prisma: PrismaService) {}

  async updatePasswordValidation(user_id: string, validation) {
    return await this.prisma.passwordValidationEntity.update({
      where: {
        user_id: user_id,
      },
      data: {
        passwordValidation: validation,
      },
    });
  }

  async getPasswordValidation(user_id: string) {
    return await this.prisma.passwordValidationEntity.findUnique({
      where: {
        user_id: user_id,
      },
    });
  }
}
