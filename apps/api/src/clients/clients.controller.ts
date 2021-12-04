import { User } from '@valor-launchpad/users-api';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { JwtAuthGuard } from '@valor-launchpad/auth-api';
import { RequestingUser } from '@valor-launchpad/api-interfaces';

@Controller('v1')
@UseGuards(JwtAuthGuard)
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  /**
   * Get user's profile data through username
   * @param user: acting user
   */
  @Get('getClients')
  async getClients(@User() user: RequestingUser) {
    return await this.clientsService.getClients(user.id);
  }
}
