import { Component, OnDestroy, OnInit } from '@angular/core';
import { Action } from '@valor-launchpad/api-interfaces'
import { Subscription } from 'rxjs'
import { ThemeService, themeType } from '../../core/theme/theme.service';

@Component({
  selector: 'valor-launchpad-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{

  theme: themeType
  private theme$: Subscription
  CorporateMenu: Action[] = [
    {
      label: 'Profile',
      icon: 'user',
      routerLink: '/profile',
    },
    {
      label: 'Analytics',
      icon: 'chart-pie',
      link: '/dashboard-analytics',
      divider: true,
    },
    {
      label: 'Settings & Privacy',
      routerLink: '/settings',
    },
    {
      label: 'Help',
      link: 'pages-settings.html',
    }
  ];

  constructor( private themeService: ThemeService ) {}

  ngOnInit() {
    this.theme$ = this.themeService.getTheme().subscribe(theme => {
      this.theme = theme
    })
  }

  ngOnDestroy(): void {
    this.theme$.unsubscribe()
  }
}
