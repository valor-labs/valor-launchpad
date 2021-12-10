import { chromium, Page } from 'playwright';
import { BasePo } from '../base.po';
const { webkit } = require('playwright');
import { expect } from '@playwright/test';

export class PricingPo extends BasePo {
  constructor(page: Page) {
    super(page);
  }

  pageUrl = '/pricing';

  private _plansAndPricingPageText = 'Plans & Pricing';

  // async titlePlanAndPricingPage() {
  //   return this.page.locator('[data-qa="titlePlanAndPricingPage"]');
  // }

  private itemPagesMenu = 'span:has-text("Pages")';
  private itemMenu = 'a:has-text("Pricing")';

  async openingPricingPage() {
    await (await this.page.waitForSelector(this.itemMenu)).click();

    await expect(
      this.page.locator('[data-qa="titlePlanAndPricingPage"]')
    ).toHaveText(this._plansAndPricingPageText);

    // await expect(this.title).toHaveText(this._invoicePageText);
    // await (await this.titlePlanAndPricingPage()).click();

    // await this.page.screenshot({ path: 'plansAndPricingsPage.png', fullPage: true });
  }
}
