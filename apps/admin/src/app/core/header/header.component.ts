import { Component, OnInit } from '@angular/core';
import { Action } from '@valor-launchpad/api-interfaces';

@Component({
  selector: 'valor-launchpad-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  profileDropdownShow=false;
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
      link: 'pages-settings.html',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  toggleProfileDropdown(){
    this.profileDropdownShow=!this.profileDropdownShow;
  }
}
