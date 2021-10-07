import { Validate } from 'class-validator';
import { Xor } from '@valor-launchpad/common-api';

export class FollowUserDTO {
  @Validate(Xor, ['username'])
  userId: string;

  @Validate(Xor, ['userId'])
  username: string;
}

export interface LikeStoryDTO {
  storyId: string;
}
