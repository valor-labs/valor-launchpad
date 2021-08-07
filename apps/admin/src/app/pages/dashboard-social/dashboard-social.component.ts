import { Component, OnInit } from '@angular/core';
import { ISocialActivity, ISocialUser, ISocialUserInfo, IStory } from './dashboard-social.model';

@Component({
  selector: 'valor-launchpad-dashboard-social',
  templateUrl: './dashboard-social.component.html',
  styleUrls: ['./dashboard-social.component.scss']
})
export class DashboardSocialComponent implements OnInit {

  stories: IStory[] = [
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
      createdAt: new Date(),
      content: 'Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante.',
      images: [],
      comments: [],
    },
    {
      avatarUrl: 'assets/img/avatars/avatar-2.jpg',
      username: 'Carl Jenkins',
      createdAt: new Date(),
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
      createdAt: new Date(),
      content: ' Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante.',
      images: [],
      comments: [],
    }
  ];

  userinfo: ISocialUserInfo = {
    username: 'Chris Wood',
    avatarUrl: 'assets/img/avatars/avatar.jpg',
    job: 'UX Engineer',
    followed: false,
  };

  followings: ISocialUser[] = [
    {username: 'Ashley Briggs', avatarUrl: 'assets/img/avatars/avatar-5.jpg', followed: true},
    {username: 'Carl Jenkins', avatarUrl: 'assets/img/avatars/avatar-2.jpg', followed: true},
    {username: 'Stacie Hall', avatarUrl: 'assets/img/avatars/avatar-4.jpg', followed: true},
  ];

  activities: ISocialActivity[] = [
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
      createdAt: new Date(),
      targetUsername: 'Stacie Hall',
      postDetails: {
        content: 'Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam..'
      }
    },
    {
      username: 'Stacie Hall',
      avatarUrl: 'assets/img/avatars/avatar-4.jpg',
      action: 'postBlog',
      createdAt: new Date(),
    },
    {
      username: 'Carl Jenkins',
      avatarUrl: 'assets/img/avatars/avatar-2.jpg',
      action: 'postOnTimeline',
      createdAt: new Date(),
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
      createdAt: new Date(),
    },
    {
      username: 'Chris Wood',
      avatarUrl: 'assets/img/avatars/avatar.jpg',
      action: 'startFollowing',
      createdAt: new Date(),
      targetUsername: 'Stacie Hall',
    },
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
