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
import { User, UsersService } from '@valor-launchpad/users-api';
import { RequestingUser, UserFollower } from '@valor-launchpad/api-interfaces';
import { FollowUserDTO, LikeStoryDTO } from './dashboard-social.dto';
import { isNil } from '@nestjs/common/utils/shared.utils';

@Controller('v1')
@UseGuards(JwtAuthGuard)
export class DashboardSocialController {
  constructor(
    private dashboardSocialService: DashboardSocialService,
    private usersService: UsersService
  ) {}

  @Get('followings')
  getSelfFollowings(@User() user: RequestingUser): Promise<UserFollower[]> {
    return this.dashboardSocialService.getAllFollowings(user.id, user.id);
  }

  @Get('followings/:userId')
  getFollowings(
    @User() user: RequestingUser,
    @Param('userId') userId: string
  ): Promise<UserFollower[]> {
    return this.dashboardSocialService.getAllFollowings(userId, user.id);
  }

  @Post('follow')
  async follow(
    @User() user: RequestingUser,
    @Body() { userId, username }: FollowUserDTO
  ) {
    let uid = userId;
    if (username) {
      const user = await this.usersService.findByUsername(username);
      uid = user.id;
    }
    return this.dashboardSocialService.follow(uid, user.id);
  }

  @Post('unfollow')
  async unfollow(
    @User() user: RequestingUser,
    @Body() { userId, username }: FollowUserDTO
  ) {
    let uid = userId;
    if (username) {
      const user = await this.usersService.findByUsername(username);
      uid = user.id;
    }
    return this.dashboardSocialService.unfollow(uid, user.id);
  }

  @Post('like')
  likeStory(@User() user: RequestingUser, @Body() { storyId }: LikeStoryDTO) {
    return this.dashboardSocialService.likeStory(storyId, user.id);
  }

  @Post('unlike')
  unlikeStory(@User() user: RequestingUser, @Body() { storyId }: LikeStoryDTO) {
    return this.dashboardSocialService.unlikeStory(storyId, user.id);
  }

  @Get('story')
  getStories(@User() user: RequestingUser) {
    return this.dashboardSocialService.getStories(user.id);
  }

  @Get('activity')
  getActivities(
    @User() user: RequestingUser,
    @Query('lastReadAt') lastReadAtStr: string,
    @Query('limit') limitStr: string
  ) {
    const lastReadAt = !lastReadAtStr ? null : +lastReadAtStr;
    const limit = !limitStr ? 10 : +limitStr;
    if (!isNil(limit)) {
      return this.dashboardSocialService.getActivities(
        lastReadAt,
        limit,
        user.id
      );
    } else {
      return { result: [] };
    }
  }
}
