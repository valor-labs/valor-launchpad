import { chromium, Page } from 'playwright';
import { BasePo } from '../base.po';
const { webkit } = require('playwright');
import { expect } from '@playwright/test';

export class BlankPo extends BasePo {
  constructor(page: Page) {
    super(page);
  }

  pageUrl = '/blank';

  private _blankPageText = 'Blank Page';

  // async titleTasksPage() {
  //   return this.page.locator('[data-qa="titleTasksPage"]');
  // }

  private itemMenu = 'a:has-text("Blank")';

  async openingBlankPage() {
    await (await this.page.waitForSelector(this.itemMenu)).click();

    await expect(this.title).toHaveText(this._blankPageText);
    // await this.page.screenshot({ path: 'plansAndPricingsPage.png', fullPage: true });
  }
}
