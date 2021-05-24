import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ProfileEntity} from "./profile.entity";
import {Repository} from "typeorm";

@Injectable()
export class ProfileService {
  constructor(@InjectRepository(ProfileEntity)
              private profileRepository: Repository<ProfileEntity>) {
  }

  async getProfile() {
    return await this.profileRepository.findOne({relations: ["activity", "activity.children"]})
  }

}
