import { chromium, Page } from 'playwright';
import { BasePo } from '../base.po';
const { webkit } = require('playwright');
import { expect } from '@playwright/test';

export class UsersPo extends BasePo {
  constructor(page: Page) {
    super(page);
  }

  pageUrl = '/users/listing';

  private _usersPageText = 'All Users';

  async titleUsersPage() {
    return this.page.waitForSelector('[data-qa="titleUsersPage"]');
  }

  private itemPagesMenu = 'span:has-text("Pages")';
  private itemMenu = 'a:has-text("Users")';

  async openingUsersPage() {
    await (await this.page.waitForSelector(this.itemPagesMenu)).click();
    await (await this.page.waitForSelector(this.itemMenu)).click();

    await expect(this.page.locator('h2')).toHaveText(this._usersPageText);

    await this.page.screenshot({ path: 'usersPage.png', fullPage: true });
  }
}
