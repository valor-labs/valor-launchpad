import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DashboardSocialService } from './dashboard-social.service';
import { JwtAuthGuard } from '@valor-launchpad/auth-api';
import { User } from '@valor-launchpad/users-api';
import { UserEntity } from '@valor-launchpad/common-api';
import { UserFollower } from '@valor-launchpad/api-interfaces';
import { FollowUserDTO, LikeStoryDTO } from './dashboard-social.dto';
import { isNil } from '@nestjs/common/utils/shared.utils';

@Controller('v1')
@UseGuards(JwtAuthGuard)
export class DashboardSocialController {
  constructor(private dashboardSocialService: DashboardSocialService) {}

  @Get('followings')
  getSelfFollowings(@User() user: UserEntity): Promise<UserFollower[]> {
    return this.dashboardSocialService.getAllFollowings(user.id, user.id);
  }

  @Get('followings/:userId')
  getFollowings(
    @User() user: UserEntity,
    @Param('userId') userId: string
  ): Promise<UserFollower[]> {
    return this.dashboardSocialService.getAllFollowings(userId, user.id);
  }

  @Post('follow')
  follow(@User() user: UserEntity, @Body() { userId }: FollowUserDTO) {
    return this.dashboardSocialService.follow(userId, user.id);
  }

  @Post('unfollow')
  unfollow(@User() user: UserEntity, @Body() { userId }: FollowUserDTO) {
    console.log(user);
    return this.dashboardSocialService.unfollow(userId, user.id);
  }

  @Post('like')
  likeStory(@User() user: UserEntity, @Body() { storyId }: LikeStoryDTO) {
    return this.dashboardSocialService.likeStory(storyId, user.id);
  }

  @Post('unlike')
  unlikeStory(@User() user: UserEntity, @Body() { storyId }: LikeStoryDTO) {
    return this.dashboardSocialService.unlikeStory(storyId, user.id);
  }

  @Get('story')
  getStories(@User() user: UserEntity) {
    return this.dashboardSocialService.getStories(user.id);
  }

  @Get('activity')
  getActivities(
    @Query('lastReadAt') lastReadAtStr: string,
    @Query('limit') limitStr: string
  ) {
    const lastReadAt = !lastReadAtStr ? null : +lastReadAtStr;
    const limit = !limitStr ? 10 : +limitStr;
    if (!isNil(limit)) {
      return this.dashboardSocialService.getActivities(lastReadAt, limit);
    } else {
      return { result: [] };
    }
  }
}
