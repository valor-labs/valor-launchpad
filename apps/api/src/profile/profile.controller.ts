import {Controller, Get} from '@nestjs/common';
import {ProfileService} from "./profile.service";

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {

  }

  @Get()
  async defaultProfile() {
    return await this.profileService.getProfile()
  }
}

