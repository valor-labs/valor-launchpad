import { Injectable } from '@angular/core';

export type themeType =  'dark' | 'light';

export type themeConfigKeys =  'theme' | 'layout'
export type themeConfig = Record<themeConfigKeys, string>;

export const defaultProps: themeConfig = {
  theme: 'light',
  layout: 'fluid',
};

const stylesheetClassName = '.js-stylesheet';
const settingsPrefix = 'valor-launchpad-config-';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  changeTheme(name: themeConfigKeys, value: themeType): void {
    // Toggle stylesheet (light/dark)
    if (name === 'theme') {
      const theme = value === 'dark' ? 'dark' : 'light';
      const stylesheet = document.querySelector(stylesheetClassName);
      
      stylesheet?.setAttribute('href', `${theme}.css`);
    }

    // Set data attributes on body element
    document.body.dataset[name] = value;
  }

  getStoredConfig(name: themeConfigKeys, isFirstRender: boolean): string {
    
    const storedConfig = localStorage.getItem(`${settingsPrefix}${name}`);

    if (storedConfig === null && isFirstRender && name === 'theme') {
      this.changeTheme(name, 'light')
      this.setStoredConfig(name, 'light')
      return defaultProps[name]
    }
    
    if (storedConfig && isFirstRender) {
      this.changeTheme(name, storedConfig as themeType);
    }
    return storedConfig || defaultProps[name];
  }

  setStoredConfig(name: themeConfigKeys, value: string): void {
    localStorage.setItem(`${settingsPrefix}${name}`, value);
  }
}
