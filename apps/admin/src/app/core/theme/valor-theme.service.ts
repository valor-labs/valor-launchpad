import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type themeType = 'default' | 'colored' | 'dark' | 'light';

export type themeConfigKeys =
  | 'theme'
  | 'layout'
  | 'sidebarPosition'
  | 'sidebarBehavior';
export type themeConfig = Record<themeConfigKeys, string>;

export const defaultProps: themeConfig = {
  theme: 'default',
  layout: 'fluid',
  sidebarPosition: 'left',
  sidebarBehavior: 'sticky',
};

const stylesheetClassName = '.js-stylesheet';
const settingsPrefix = 'valor-launchpad-config-';

@Injectable({ providedIn: 'root' })
export class ValorThemeService {
  sidebarBehavior$: Observable<string>;
  private sidebarBehavior = new BehaviorSubject(null);

  constructor() {
    this.sidebarBehavior$ = this.sidebarBehavior.asObservable();
  }

  changeTheme(name: themeConfigKeys, value: string): void {
    // Toggle stylesheet (light/dark)
    if (name === 'theme') {
      const theme = value === 'dark' ? 'dark' : 'light';
      const stylesheet = document.querySelector(stylesheetClassName);
      stylesheet.setAttribute('href', `${theme}.css`);
    }
    if (name === 'sidebarBehavior') {
      this.sidebarBehavior.next(value);
    }

    // Set data attributes on body element
    document.body.dataset[name] = value;
  }

  getStoredConfig(name: themeConfigKeys, isFirstRender: boolean): string {
    const storedConfig = localStorage.getItem(`${settingsPrefix}${name}`);
    if (storedConfig && isFirstRender) {
      this.changeTheme(name, storedConfig);
    }
    return storedConfig || defaultProps[name];
  }

  setStoredConfig(name: themeConfigKeys, value: string): void {
    localStorage.setItem(`${settingsPrefix}${name}`, value);
  }
}
