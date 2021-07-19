import {Controller, Get} from '@nestjs/common';
import {UsersService} from './users.service';

@Controller('v1')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @Get('all')
  async getAllUsers(){
    return await this.usersService.findAll();
  }
}
