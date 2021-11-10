import { User } from '@valor-launchpad/users-api';
import { UserEntity } from '@valor-launchpad/common-api';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { JwtAuthGuard } from '@valor-launchpad/auth-api';

@Controller('v1')
@UseGuards(JwtAuthGuard)
export class ClientsController {
  constructor(private passwordService: ClientsService) {}

  /**
   * Get user's profile data through username
   * @param user: acting user
   * @param username: if username is nil, return acting user's profile
   */

  @Get('myValidation')
  async getPasswordValidation(@User() user: UserEntity) {
    return await this.passwordService.getClients(user.id);
  }
}
