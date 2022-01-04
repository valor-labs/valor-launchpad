import { chromium, Page } from 'playwright';
import { BasePo } from '../base.po';
const { webkit } = require('playwright');
import { expect } from '@playwright/test';

export class ProfilePo extends BasePo {
  constructor(page: Page) {
    super(page);
  }

  pageUrl = '/profile';

  private _profilePageText = 'Profile';

  async titleProfilePage() {
    return this.page.waitForSelector('[data-qa="titleProfilePage"]');
  }

  private itemPagesMenu = 'span:has-text("Profile")';
  private itemMenu = 'a:has-text("Profile")';

  async openingProfilePage() {
    await (await this.page.waitForSelector(this.itemMenu)).click();

    await expect(this.title).toHaveText(this._profilePageText);
    await (await this.titleProfilePage()).click();

    await this.page.screenshot({ path: 'profilePage.png', fullPage: true });
  }
}
