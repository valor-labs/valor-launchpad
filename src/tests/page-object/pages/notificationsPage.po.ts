import { chromium, Page } from 'playwright';
import { BasePo } from '../base.po';
const { webkit } = require('playwright');
import { expect } from '@playwright/test';

export class NotificationsPo extends BasePo {
  constructor(page: Page) {
    super(page);
  }

  pageUrl = '/notifications';

  private _notificationsPageText = 'Notifications';

  // async titleTasksPage() {
  //   return this.page.locator('[data-qa="titleTasksPage"]');
  // }

  private itemMenu = 'a:has-text("Notifications")';

  async openingNotificationsPage() {
    await (await this.page.waitForSelector(this.itemMenu)).click();

    await expect(this.title).toHaveText(this._notificationsPageText);
    // await this.page.screenshot({ path: 'plansAndPricingsPage.png', fullPage: true });
  }
}
