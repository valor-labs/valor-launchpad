import { chromium, Page } from 'playwright';
const { webkit } = require('playwright');
import { expect } from '@playwright/test';

export class BasePo {
  constructor(public page: Page) {}

  pageUrl = 'http://localhost:4200/';
  _itemMenu: string;

  private _title = 'h1';
  private _titleText = 'Welcome';
  get title() {
    return this.page.locator(this._title);
  }

  private _userName = 'user1';
  private _password = '123';

  private _h3 = 'h3';
  get h3() {
    return this.page.locator(this._h3);
  }

  private _dashboard = '[help-anchor="dashboardTitle"]';
  private _dashboardText = 'Dashboard';
  get dashboard() {
    return this.page.locator(this._dashboard);
  }

  async navigateTo(pageUrl: string) {
    return this.page.goto(`${pageUrl}`);
  }

  async Login() {
    await this.navigateTo(this.pageUrl);

    await expect(this.title).toHaveText(this._titleText);
    await this.page.fill('[name="username"]', this._userName);
    await this.page.fill('[name="password"]', this._password);
    await this.page.click('[data-id="sign-in-button"]');

    await expect(this.dashboard).toHaveText(this._dashboardText);

    await this.page.screenshot({ path: 'defaultPage.png', fullPage: true });
  }

  async sidebarNavigationMenu(itemMenu: string) {
    return this.page.locator(`[data-qa="sidebarNavigationMenu"] ${itemMenu}`);
  }

  async Logout() {
    await this.page.click('valor-launchpad-avatar');
    await this.page.click('text=Sign out');
  }
}
