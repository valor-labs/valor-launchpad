import { User } from '@valor-launchpad/users-api';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PasswordValidatorService } from './passwordValidator.service';
import { JwtAuthGuard } from '@valor-launchpad/auth-api';
import { RequestingUser } from '@valor-launchpad/api-interfaces';

@Controller('v1')
@UseGuards(JwtAuthGuard)
export class PasswordValidatorController {
  constructor(private passwordService: PasswordValidatorService) {}

  /**
   * Get user's profile data through username
   * @param user: acting user
   * @param username: if username is nil, return acting user's profile
   */

  @Get('myValidation')
  async getPasswordValidation(@User() user: RequestingUser) {
    return await this.passwordService.getPasswordValidation(user.id);
  }

  @Post('update-validation')
  @UseGuards(JwtAuthGuard)
  async updatePasswordValidation(@User() user: RequestingUser, @Body() body) {
    return await this.passwordService.updatePasswordValidation(
      user.id,
      body.validation
    );
  }
}
