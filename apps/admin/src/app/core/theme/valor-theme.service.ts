import { Injectable } from '@angular/core';

export type themeType = "default" | "colored" | "dark" | "light"

export type themeConfigKeys = 'theme' | 'layout' | 'sidebarPosition' | 'sidebarBehavior';
export type themeConfig = Record<themeConfigKeys, string>;

export const defaultProps= {
  theme: "default",
  layout: "fluid",
  sidebarPosition: "left",
  sidebarBehavior: "sticky"
}

const stylesheetClassName = ".js-stylesheet";
const settingsPrefix = "valor-launchpad-config-";
@Injectable()
export class ValorThemeService {

  constructor() { }

  changeTheme(name, value): void {

    // Toggle stylesheet (light/dark)
    if(name === "theme"){
      const theme = value === "dark" ? "dark" : "light";
      const stylesheet = document.querySelector(stylesheetClassName);
      stylesheet.setAttribute("href", `${theme}.css`);
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
