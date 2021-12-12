import { Component, OnInit, Renderer2 } from '@angular/core';
import { Action } from '@valor-launchpad/api-interfaces'
import { ThemeService } from '../../core/theme/theme.service';

@Component({
  selector: 'valor-launchpad-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  checked = false
  theme: string

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

  constructor( private themeService: ThemeService,
      private renderer2: Renderer2
    ) {}

  ngOnInit(): void {
    const theme = this.themeService.getStoredConfig('theme', false)
    if (theme === 'dark') {
      this.checked = true
    } else {
      this.checked = false
    }
    this.theme = theme
  }

  themeChange(e: Event) {
    const checked = (e.target as HTMLInputElement).checked
    if (checked) {
      this.themeService.changeTheme('theme', 'dark')
      this.themeService.setStoredConfig('theme', 'dark')
      this.theme = 'dark'
    } else {
      this.themeService.changeTheme('theme', 'light')
      this.themeService.setStoredConfig('theme', 'light')
      this.theme = 'light'
    }
  }

  showHeadMenu(e: MouseEvent, isShow) {
    const child = (e.target as HTMLElement).children[1]
    const { width } = (e.target as HTMLElement).getBoundingClientRect()
    
    if (isShow) {
      this.renderer2.addClass(e.target, 'show')
      const { width: childWidth } = child.getBoundingClientRect()
      this.renderer2.setStyle(child, 'left', `-${(childWidth / 2) - (width / 2) }px`)
    } else {
      this.renderer2.removeClass(e.target, 'show')
    }
  }


}
