import { chromium, Page } from 'playwright';
import { BasePo } from '../base.po';
const { webkit } = require('playwright');
import { expect } from '@playwright/test';

export class SettingsPo extends BasePo {
  constructor(page: Page) {
    super(page);
  }

  pageUrl = '/settings/account';

  private _settingsPageText = 'Settings';

  async titleSettingsPage() {
    return this.page.waitForSelector('[data-qa="titleSettingsPage"]');
  }

  private itemPagesMenu = 'span:has-text("Pages")';
  private itemMenu = 'a:has-text("Settings")';

  async openingSettingsPage() {
    await (await this.page.waitForSelector(this.itemMenu)).click();

    await expect(this.title).toHaveText(this._settingsPageText);
    await (await this.titleSettingsPage()).click();

    await this.page.screenshot({ path: 'settingsPage.png', fullPage: true });
  }
}
