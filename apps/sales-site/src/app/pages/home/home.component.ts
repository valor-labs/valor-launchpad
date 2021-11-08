import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../core/theme/theme.service';

@Component({
  selector: 'valor-launchpad-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  checked = false
  CorporateMenu = [
    {
      label: 'CorporateMenu1'
    },
    {
      label: 'CorporateMenu2'
    }
  ]

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
