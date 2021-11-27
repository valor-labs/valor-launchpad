import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { UsersApiModule } from '@valor-launchpad/users-api';
import { PrismaModule } from '@valor-launchpad/prisma';

@Module({
  imports: [UsersApiModule, PrismaModule],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
