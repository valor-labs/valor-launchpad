import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ISocialActivity, ISocialUser, ISocialUserInfo, IStory } from './dashboard-social.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardSocialService {

  constructor() { }

  fetchTimeline() {
    return of<IStory[]>([
      {
        avatarUrl: 'assets/img/avatars/avatar-5.jpg',
        username: 'Ashley Briggs',
        createdAt: new Date(),
        content: 'Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus.',
        images: [
          'assets/img/photos/unsplash-2.jpg',
          'assets/img/photos/unsplash-3.jpg',
        ],
        comments: [
          {
            username: 'Stacie Hall',
            content: 'Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.',
            avatarUrl: 'assets/img/avatars/avatar-4.jpg',
          },
        ],
      },
      {
        avatarUrl: 'assets/img/avatars/avatar.jpg',
        username: 'Chris Wood',
        createdAt: new Date('2021-05-01 12:00:00'),
        content: 'Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante.',
        images: [],
        comments: [],
      },
      {
        avatarUrl: 'assets/img/avatars/avatar-2.jpg',
        username: 'Carl Jenkins',
        createdAt: new Date('2021-05-01 12:00:00'),
        content: '',
        images: ['assets/img/photos/unsplash-1.jpg'],
        comments: [
          {
            username: 'Stacie Hall',
            avatarUrl: 'assets/img/avatars/avatar-4.jpg',
            content: 'Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.',
          }
        ],
      },
      {
        avatarUrl: 'assets/img/avatars/avatar-5.jpg',
        username: 'Ashley Briggs',
        createdAt: new Date('2021-05-01 12:00:00'),
        content: ' Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante.',
        images: [],
        comments: [],
      }
    ]);
  }

  fetchUserInfo() {
    return of<ISocialUserInfo>({
      username: 'Chris Wood',
      avatarUrl: 'assets/img/avatars/avatar.jpg',
      job: 'UX Engineer',
      followed: false,
    });
  }

  fetchFollowings() {
    return of<ISocialUser[]>([
      {username: 'Ashley Briggs', avatarUrl: 'assets/img/avatars/avatar-5.jpg', followed: true},
      {username: 'Carl Jenkins', avatarUrl: 'assets/img/avatars/avatar-2.jpg', followed: true},
      {username: 'Stacie Hall', avatarUrl: 'assets/img/avatars/avatar-4.jpg', followed: true},
    ]);
  }

  fetchActivities() {
    return of<ISocialActivity[]>([
      {
        username: 'Ashley Briggs',
        avatarUrl: 'assets/img/avatars/avatar-5.jpg',
        action: 'startFollowing',
        createdAt: new Date(),
        targetUsername: 'Stacie Hall',
      },
      {
        username: 'Chris Wood',
        avatarUrl: 'assets/img/avatars/avatar.jpg',
        action: 'postOnTimeline',
        createdAt: new Date('2021-05-01 12:00:00'),
        targetUsername: 'Stacie Hall',
        postDetails: {
          content: 'Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam..'
        }
      },
      {
        username: 'Stacie Hall',
        avatarUrl: 'assets/img/avatars/avatar-4.jpg',
        action: 'postBlog',
        createdAt: new Date('2021-05-01 12:00:00'),
      },
      {
        username: 'Carl Jenkins',
        avatarUrl: 'assets/img/avatars/avatar-2.jpg',
        action: 'postOnTimeline',
        createdAt: new Date('2021-05-01 12:00:00'),
        targetUsername: 'Stacie Hall',
        postDetails: {
          photos: [
            'assets/img/photos/unsplash-1.jpg',
            'assets/img/photos/unsplash-2.jpg',
          ]
        }
      },
      {
        username: 'Stacie Hall',
        avatarUrl: 'assets/img/avatars/avatar-4.jpg',
        action: 'postBlog',
        createdAt: new Date('2021-05-01 12:00:00'),
      },
      {
        username: 'Chris Wood',
        avatarUrl: 'assets/img/avatars/avatar.jpg',
        action: 'startFollowing',
        createdAt: new Date('2021-05-01 12:00:00'),
        targetUsername: 'Stacie Hall',
      },
    ]);
  }
}
