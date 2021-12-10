// import { expect, Locator, Page } from '@playwright/test';
// import { BasePo } from './base.po';

// const { BasePo } = require('./base.po');

// export class LoginPo {
//   basePo = new BasePo(page);

//   page = '/';

//   async login(email: string, password: string) {
//     await this.basePo.navigateTo(this.page);
//   }
// }

// export class LoginPo extends BasePo {

// const basePo = new BasePo(page);

// const pageUrl = '/';

// await basePo.navigateTo(this.pageUrl)
// }
// await searchPage.search('search query');
// async login('Login', async ({ page, pageUrl }) => {
//   await page.goto(pageUrl);

// login( async ({ page }) => {
//   await page.goto('http://localhost:4200/');
//   const title = page.locator('h1');

//   await expect(title).toHaveText('Welcome');
//   await page.fill('[name="username"]', 'user1');
//   await page.fill('[name="password"]', '123');
//   await page.click('[data-id="sign-in-button"]');
// });
