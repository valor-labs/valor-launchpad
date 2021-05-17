import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'valor-launchpad-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile = {
    name: 'Stacie Hall',
    avatar: 'assets/img/avatars/avatar-4.jpg',
    username: 'stacie_hall',
    title: 'Lead Developer',
    following: false,
    location: 'San Francisco, CA',
    from: 'Boston',
    employer: {
      name: 'GitHub',
      url: 'https://github.com'
    },
    activity: [
      {
        timestamp: 1,
        type: 'follower',
        name: 'Ashley Briggs',
        avatar: 'assets/img/avatars/avatar-5.jpg',
        url: '/profile/ashley_briggs'
      },
      {
        timestamp: 2,
        type: 'wall',
        name: 'Chris Wood',
        avatar: 'assets/img/avatars/avatar-4.jpg',
        body: '<span>Wow rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante.</span>',
        reactions: [
          {
            likes: 2
          }
        ]
      },
      {
        timestamp: 3,
        type: 'blog',
        link: '/post/12345',
        avatar: 'assets/img/avatars/avatar-5.jpg',
      },
      {
        timestamp: 4,
        type: 'follower_with_comments',
        name: 'Carl Jenkins',
        url: '/profile/ashley_briggs',
        avatar: 'assets/img/avatars/avatar-5.jpg',
        children: [
          {
            timestamp: 7,
            name: 'Chris Wood',
            avatar: 'assets/img/avatars/avatar-4.jpg',
            body: '<span>You\'re amazing. Thank you for the follow!</span>',
            reactions: [
              {
                love: 2
              }
            ]
          },
          {
            timestamp: 8,
            name: 'Someone Else',
            avatar: 'assets/img/avatars/avatar-3.jpg',
            body: '<span>No you are amazing!</span>',
            reactions: [
              {
                love: 2
              }
            ]
          }
        ]
      },
      {
        timestamp: 5,
        type: 'post',
        link: '/post/12345',
        description: 'two pictures',
        body: '  <div class="col-6 col-md-4 col-lg-4 col-xl-3">\n' +
          '                    <img src="assets/img/photos/unsplash-1.jpg" class="img-fluid pe-2" alt="Unsplash">\n' +
          '                  </div>\n' +
          '                  <div class="col-6 col-md-4 col-lg-4 col-xl-3">\n' +
          '                    <img src="assets/img/photos/unsplash-2.jpg" class="img-fluid pe-2" alt="Unsplash">\n' +
          '                  </div>',
        avatar: 'assets/img/avatars/avatar-5.jpg',
      },
      {
        timestamp: 6,
        type: 'follower',
        name: 'Chris Wood',
        avatar: 'assets/img/avatars/avatar-2.jpg',
        url: '/profile/ashley_briggs'
      },
      {
        timestamp: 7,
        type:'blog',
        avatar: 'assets/img/avatars/avatar-5.jpg',
        url: ''
      }
    ],
    social_media: [
      {
        type: 'staciehall.co',
        icon: 'fas fa-globe fa-fw',
        url: 'https://stacihall.co',
      },
      {
        type: 'Twitter',
        icon: 'fab fa-twitter fa-fw',
        url: 'https://stacihall.co',
      },
      {
        type: 'Facebook',
        icon: 'fab fa-facebook fa-fw',
        url: 'https://stacihall.co',
      },
      {
        type: 'Instagram',
        icon: 'fab fa-instagram fa-fw',
        url: 'https://stacihall.co',
      },
      {
        type: 'LinkedIn',
        icon: 'fab fa-linkedin fa-fw',
        url: 'https://stacihall.co',
      },
    ],
    skills: [
      {
        name: 'HTML',
        description: 'something about this skill to be enriched later'
      },
      {
        name: 'JavaScript',
        description: 'something about this skill to be enriched later'
      },
      {
        name: 'Sass',
        description: 'something about this skill to be enriched later'
      },
      {
        name: 'ANgular',
        description: 'something about this skill to be enriched later'
      },
      {
        name: 'Vue',
        description: 'something about this skill to be enriched later'
      },
      {
        name: 'React',
        description: 'something about this skill to be enriched later'
      },
      {
        name: 'UI',
        description: 'something about this skill to be enriched later'
      },
      {
        name: 'UX',
        description: 'something about this skill to be enriched later'
      }
    ]
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
