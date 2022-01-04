import { chromium, Page } from 'playwright';
import { BasePo } from '../base.po';
const { webkit } = require('playwright');
import { expect } from '@playwright/test';

export class SaaSPo extends BasePo {
  constructor(page: Page) {
    super(page);
  }

  pageUrl = '/dashboard-saas';

  private _saaSPageText = 'SaaS';

  async titleSaaSPage() {
    return this.page.waitForSelector('[data-qa="titleSaaSPage"]');
  }

  private itemMenu = 'a:has-text("SaaS")';

  async openingSaaSPage() {
    await (await this.page.waitForSelector(this.itemMenu)).click();

    await expect(this.h3).toHaveText(this._saaSPageText);
    await (await this.titleSaaSPage()).click();

    await this.page.screenshot({ path: 'saaSPage.png', fullPage: true });
  }
}
