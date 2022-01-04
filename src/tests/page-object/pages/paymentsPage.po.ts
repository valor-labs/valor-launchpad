import { chromium, Page } from 'playwright';
import { BasePo } from '../base.po';
const { webkit } = require('playwright');
import { expect } from '@playwright/test';

export class PaymentsPo extends BasePo {
  constructor(page: Page) {
    super(page);
  }

  pageUrl = '/payments';

  private _paymentsPageText = 'Payment Integrations';

  // async titleTasksPage() {
  //   return this.page.locator('[data-qa="titleTasksPage"]');
  // }

  private itemMenu = 'a:has-text("Payments")';

  async openingPaymentsPage() {
    await (await this.page.waitForSelector(this.itemMenu)).click();

    await expect(this.title).toHaveText(this._paymentsPageText);
    // await this.page.screenshot({ path: 'plansAndPricingsPage.png', fullPage: true });
  }
}
