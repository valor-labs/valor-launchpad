import { chromium, Page } from 'playwright';
import { BasePo } from '../base.po';
const { webkit } = require('playwright');
import { expect } from '@playwright/test';

export class AnalyticsPo extends BasePo {
  constructor(page: Page) {
    super(page);
  }
  pageUrl = '/dashboard-analytics';

  private _analyticsPageText = 'Analytics';

  async titleAnalyticsPage() {
    return this.page.waitForSelector('[data-qa="titleAnalyticsPage"]');
  }

  private itemMenu = 'a:has-text("Analytics")';

  async openingAnalyticsPage() {
    await (await this.page.waitForSelector(this.itemMenu)).click();

    await expect(this.h3).toHaveText(this._analyticsPageText);
    await (await this.titleAnalyticsPage()).click();

    await this.page.screenshot({ path: 'analyticsPage.png', fullPage: true });
  }
}
