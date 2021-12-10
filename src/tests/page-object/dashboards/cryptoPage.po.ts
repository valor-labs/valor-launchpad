import { chromium, Page } from 'playwright';
import { BasePo } from '../base.po';
const { webkit } = require('playwright');
import { expect } from '@playwright/test';

export class CryptoPo extends BasePo {
  constructor(page: Page) {
    super(page);
  }

  pageUrl = '/dashboard-crypto';

  private _cryptoPageText = 'Crypto';

  async titleCryptoPage() {
    return this.page.waitForSelector('[data-qa="titleCryptoPage"]');
  }

  private itemMenu = 'a:has-text("Crypto")';

  async openingCryptoPage() {
    await (await this.page.waitForSelector(this.itemMenu)).click();

    await expect(this.h3).toHaveText(this._cryptoPageText);
    await (await this.titleCryptoPage()).click();

    await this.page.screenshot({ path: 'cryptoPage.png', fullPage: true });
  }
}
