import {Component} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Action} from '@valor-launchpad/api-interfaces';
import {NavigationService} from '../navigation/navigation.service';

@Component({
  selector: 'valor-launchpad-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
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
      link: '/settings',
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

  constructor(private authService: AuthService, private navigationService: NavigationService) {
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
