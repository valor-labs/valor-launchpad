import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import { Action } from '@valor-launchpad/api-interfaces';

@Component({
  selector: 'valor-launchpad-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  profileDropdownShow = false;
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
      link: 'pages-settings.html',
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

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  signOut() {
    this.authService.signOut()
  }

  toggleProfileDropdown() {
    this.profileDropdownShow = !this.profileDropdownShow;
  }
}
