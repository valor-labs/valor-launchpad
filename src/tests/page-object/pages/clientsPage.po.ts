import { chromium, Page } from 'playwright';
import { BasePo } from '../base.po';
const { webkit } = require('playwright');
import { expect } from '@playwright/test';

export class ClientsPo extends BasePo {
  constructor(page: Page) {
    super(page);
  }

  pageUrl = '/clients';

  private _clientsPageText = 'Clients';

  async titleClientsPage() {
    return this.page.waitForSelector('[data-qa="titleClientsPage"]');
  }

  private itemPagesMenu = 'span:has-text("Pages")';
  private itemMenu = 'a:has-text("Clients")';

  async openingClientsPage() {
    await (await this.page.waitForSelector(this.itemMenu)).click();

    await expect(this.title).toHaveText(this._clientsPageText);
    await (await this.titleClientsPage()).click();

    await this.page.screenshot({ path: 'clientsPage.png', fullPage: true });
  }
}
