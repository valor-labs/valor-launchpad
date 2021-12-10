import { chromium, Page } from 'playwright';
import { BasePo } from '../base.po';
const { webkit } = require('playwright');
import { expect } from '@playwright/test';

export class TasksPo extends BasePo {
  constructor(page: Page) {
    super(page);
  }

  pageUrl = '/tasks';

  private _tasksPageText = 'Tasks';

  private itemMenu = 'a:has-text("Tasks")';

  async openingTasksPage() {
    await (await this.page.waitForSelector(this.itemMenu)).click();

    await expect(this.title).toHaveText(this._tasksPageText);
    // await this.page.screenshot({ path: 'plansAndPricingsPage.png', fullPage: true });
  }
}
