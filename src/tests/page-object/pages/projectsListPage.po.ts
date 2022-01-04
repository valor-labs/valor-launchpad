import { chromium, Page } from 'playwright';
import { BasePo } from '../base.po';
const { webkit } = require('playwright');
import { expect } from '@playwright/test';

export class ProjectsListPo extends BasePo {
  constructor(page: Page) {
    super(page);
  }

  pageUrl = '/projects-list';

  private _projectsPageText = 'Projects';

  async titleProjectsPage() {
    return this.page.waitForSelector('[data-qa="titleProjectsPage"]');
  }

  private itemPagesMenu = 'span:has-text("Pages")';
  private itemProjectsMenu = 'a:has-text("Projects")';
  private itemMenu = 'a:has-text("List")';

  async openingProjectsListPage() {
    await (await this.page.waitForSelector(this.itemProjectsMenu)).click();
    await (await this.page.waitForSelector(this.itemMenu)).click();

    await expect(this.title).toHaveText(this._projectsPageText);
    // await (await this.titleClientsPage()).click();

    await this.page.screenshot({
      path: 'projectsListPage.png',
      fullPage: true,
    });
  }
}
