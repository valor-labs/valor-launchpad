import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Action, MegaMenuColumn} from '@valor-launchpad/api-interfaces';
import {Message,Notification} from '@valor-launchpad/api-interfaces';
import {NavigationService} from '../navigation/navigation.service';
import {UserEntity} from '@valor-launchpad/common-api';
import { HeaderService } from './header.service';

@Component({
  selector: 'valor-launchpad-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  //TODO this and the items in navigation.component need to come from a service
  user: UserEntity;
  messages:Message[];
  notifications:Notification[];
  megaMenu: MegaMenuColumn[] = [
    {
      label: 'UI Elements',
      actions: [
        {
          label: 'Alerts',
          routerLink: '/ui-alerts'
        },
        {
          label: 'Chips',
          routerLink: '/ui-chips'
        },
        {
          label: 'Cards',
          routerLink: '/ui-cards'
        },
        {
          label: 'Buttons',
          routerLink: '/ui-buttons'
        }
      ]
    },
    {
      label: 'Pages',
      actions: [
        {
          label: 'Users',
          routerLink: '/users'
        },
        {
          label: 'Profile',
          routerLink: '/profile'
        },
        {
          label: 'Settings',
          routerLink: '/settings'
        },
        {
          label: 'Clients',
          routerLink: '/clients'
        }
      ]
    }
  ];
  languageActions: Action[] = [
    {
      image: {
        src: 'assets/img/flags/us.png',
        alt: 'American Flag'
      },
      label: 'English',
      event: this.setLanguage.bind(this, 'english')
    },
    {
      image: {
        src: 'assets/img/flags/es.png',
        alt: 'Spanish Flag'
      },
      label: 'Spanish',
      event: this.setLanguage.bind(this, 'spanish')
    },
    {
      image: {
        src: 'assets/img/flags/de.png',
        alt: 'German Flag'
      },
      label: 'German',
      event: this.setLanguage.bind(this, 'german')
    },
    {
      image: {
        src: 'assets/img/flags/nl.png',
        alt: 'Dutch Flag'
      },
      label: 'Dutch',
      event: this.setLanguage.bind(this, 'Dutch')
    }
  ]
  currentLanguage: Action = this.languageActions[0]
  profileActions: Action[] = [
    {
      label: 'Profile',
      icon: 'user',
      link: 'pages-profile.html',
    },
    {
      label: 'Analytics',
      icon: 'area-chart',
      link: '#',
      divider: true,
    },
    {
      label: 'Settings & Privacy',
      routerLink: '/settings',
    },
    {
      label: 'Help',
      link: 'pages-settings.html',
    },
    {
      label: 'Sign out',
      event: this.signOut.bind(this),
    },
  ];

  constructor(private authService: AuthService, private headerService:HeaderService,private navigationService: NavigationService) {
  }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.user = user;
    })

    this.headerService.getMessages().subscribe(messages=>{
        this.messages=messages
        console.log('messages',this.messages)
    })

    this.headerService.getNotifications().subscribe(notifications=>{
      this.notifications=notifications
      console.log('notification',this.notifications)
    })
  
  }

  toggleMenu() {
    this.navigationService.toggleCollapse();
  }

  signOut() {
    this.authService.signOut()
  }

  setLanguage(language: string) {
    //TODO Handle langauge switch
    console.log('switching to ' + language);
  }
}
