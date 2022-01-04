import { chromium, Page } from 'playwright';
import { BasePo } from '../base.po';
const { webkit } = require('playwright');
import { expect } from '@playwright/test';

export class ChatPo extends BasePo {
  constructor(page: Page) {
    super(page);
  }

  pageUrl = '/chat';

  private _messagesPageText = 'Messages';

  private itemMenu = 'a:has-text("Chat")';

  async openingChatPage() {
    await (await this.page.waitForSelector(this.itemMenu)).click();

    await expect(this.title).toHaveText(this._messagesPageText);
    // await this.page.screenshot({ path: 'plansAndPricingsPage.png', fullPage: true });
  }
}
