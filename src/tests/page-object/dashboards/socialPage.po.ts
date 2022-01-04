import { chromium, Page, TestFixture } from '@playwright/test';
import { BasePo } from '../base.po';
const { webkit } = require('playwright');
import { expect } from '@playwright/test';

export class SocialPo extends BasePo {
  constructor(page: Page) {
    super(page);
  }

  pageUrl = '/dashboard-social';

  private itemMenu = 'a:has-text("Social")';

  async userNameSocialPage() {
    return this.page.waitForSelector('[data-qa="userNameSocialPage"]');
  }

  // async sidebarNavigationMenu(itemMenu: string) {
  //   return this.page.locator(`[data-qa="sidebarNavigationMenu"] ${itemMenu}`);
  // }

  async openingSocialPage() {
    await (await this.page.waitForSelector(this.itemMenu)).click();

    await (await this.userNameSocialPage()).click();

    await this.page.screenshot({ path: 'socialPage.png', fullPage: true });
  }
}
