import { chromium, Page } from 'playwright';
import { BasePo } from '../base.po';
const { webkit } = require('playwright');
import { expect } from '@playwright/test';

export class InvoicePo extends BasePo {
  constructor(page: Page) {
    super(page);
  }

  pageUrl = '/invoice';

  private _invoicePageText = 'Invoice';

  async titleInvoicePage() {
    return this.page.waitForSelector('[data-qa="titleInvoicePage"]');
  }

  // private itemPagesMenu = 'span:has-text("Profile")';
  private itemMenu = 'a:has-text("Invoice")';

  async openingInvoicePage() {
    await (await this.page.waitForSelector(this.itemMenu)).click();

    await expect(this.title).toHaveText(this._invoicePageText);
    await (await this.titleInvoicePage()).click();

    await this.page.screenshot({ path: 'invoicePage.png', fullPage: true });
  }
}
