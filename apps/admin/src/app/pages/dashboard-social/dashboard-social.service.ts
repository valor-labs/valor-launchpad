import { Inject, Injectable } from '@angular/core';
import { ISocialActivity, IStory } from './dashboard-social.model';
import { HttpClient } from '@angular/common/http';
import { ENV_CONFIG, EnvironmentConfig } from '@valor-launchpad/http';
import { UserFollower } from '@valor-launchpad/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class DashboardSocialService {
  private apiBase = this.config.environment.apiBase;
  constructor(
    @Inject(ENV_CONFIG) private config: EnvironmentConfig,
    private http: HttpClient
  ) {}

  fetchTimeline() {
    return this.http.get<IStory[]>(
      this.apiBase + 'api/dashboard-social/v1/story'
    );
  }

  fetchFollowings() {
    return this.http.get<UserFollower[]>(
      this.config.environment.apiBase + `api/dashboard-social/v1/followings`
    );
  }

  fetchActivities(lastReadAt: number, limit: number) {
    const params: Record<string, number> = { limit };
    if (lastReadAt !== undefined && lastReadAt !== null) {
      params.lastReadAt = lastReadAt;
    }
    return this.http.get<ISocialActivity>(
      this.apiBase + 'api/dashboard-social/v1/activity',
      { params }
    );
  }

  likeStory(storyId: string) {
    return this.http.post(this.apiBase + 'api/dashboard-social/v1/like', {
      storyId,
    });
  }

  unlikeStory(storyId: string) {
    return this.http.post(this.apiBase + 'api/dashboard-social/v1/unlike', {
      storyId,
    });
  }

  followUser(userId: string) {
    return this.http.post(this.apiBase + 'api/dashboard-social/v1/follow', {
      userId,
    });
  }

  followUserByUsername(username: string) {
    return this.http.post(this.apiBase + 'api/dashboard-social/v1/follow', {
      username,
    });
  }

  unfollowUser(userId: string) {
    return this.http.post(this.apiBase + 'api/dashboard-social/v1/unfollow', {
      userId,
    });
  }

  unfollowUserByUsername(username: string) {
    return this.http.post(this.apiBase + 'api/dashboard-social/v1/unfollow', {
      username,
    });
  }

  getThreadIdByTargetUserId(targetUserId: string) {
    return this.http.get<{ threadId: string }>(
      this.apiBase + 'api/chat/v1/oneOnOneThreadWith',
      { params: { targetUserId } }
    );
  }
}
