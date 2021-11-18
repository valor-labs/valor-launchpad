import { User } from '@valor-launchpad/users-api';
import { UserEntity } from '@valor-launchpad/common-api';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { JwtAuthGuard } from '@valor-launchpad/auth-api';

@Controller('v1')
@UseGuards(JwtAuthGuard)
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  /**
   * Get user's profile data through username
   * @param user: acting user
   */

  @Get('getClients')
  async getClients(@User() user: UserEntity) {
    return await this.clientsService.getClients(user.id);
  }
}
