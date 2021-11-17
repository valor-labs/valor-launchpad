import { Component, OnInit } from '@angular/core';
import { Action } from '@valor-launchpad/api-interfaces'
import { Subject } from 'rxjs'
import { ThemeService } from '../../core/theme/theme.service';

@Component({
  selector: 'valor-launchpad-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  checked = false

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

  ngOnInit(): void {
    const theme = this.themeService.getStoredConfig('theme', false)
    if (theme === 'dark') {
      this.checked = true
    } else {
      this.checked = false
    }
  }

  themeChange(e: Event) {
    const checked = (e.target as HTMLInputElement).checked
    if (checked) {
      this.themeService.changeTheme('theme', 'dark')
      this.themeService.setStoredConfig('theme', 'dark')
    } else {
      this.themeService.changeTheme('theme', 'light')
      this.themeService.setStoredConfig('theme', 'light')
    }
  }

}
