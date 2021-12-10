import { test, expect } from '@playwright/test';
// import { LoginPo } from './page-object/login.po';
import { BasePo } from './page-object/base.po';
import { AnalyticsPo } from './page-object/dashboards/analyticsPage.po';
import { SaaSPo } from './page-object/dashboards/saaSPage.po';
import { SocialPo } from './page-object/dashboards/socialPage.po';
import { CryptoPo } from './page-object/dashboards/cryptoPage.po';
import { UsersPo } from './page-object/pages/usersPage.po';
import { ProfilePo } from './page-object/pages/profilePage.po';
import { SettingsPo } from './page-object/pages/settingsPage.po';
import { ClientsPo } from './page-object/pages/clientsPage.po';
import { ProjectsListPo } from './page-object/pages/projectsListPage.po';
import { InvoicePo } from './page-object/pages/invoicePage.po';
import { PricingPo } from './page-object/pages/pricingPage.po';
import { TasksPo } from './page-object/pages/tasksPage.po';
import { ChatPo } from './page-object/pages/chatPage.po';
import { BlankPo } from './page-object/pages/blankPage.po';
import { PaymentsPo } from './page-object/pages/paymentsPage.po';
import { NotificationsPo } from './page-object/pages/notificationsPage.po';

test('Login, opening pages and log out', async ({ page }) => {
  const basePo = new BasePo(page);
  const analyticsPo = new AnalyticsPo(page);
  const saaSPo = new SaaSPo(page);
  const socialPo = new SocialPo(page);
  const cryptoPo = new CryptoPo(page);

  const usersPo = new UsersPo(page);
  const profilePo = new ProfilePo(page);
  const settingsPo = new SettingsPo(page);
  const clientsPo = new ClientsPo(page);
  const projectsListPo = new ProjectsListPo(page);
  const invoicePo = new InvoicePo(page);
  const pricingPo = new PricingPo(page);
  const tasksPo = new TasksPo(page);
  const chatPo = new ChatPo(page);
  const blankPo = new BlankPo(page);
  const paymentsPo = new PaymentsPo(page);
  const notificationsPo = new NotificationsPo(page);

  await basePo.Login();
  await analyticsPo.openingAnalyticsPage();
  await saaSPo.openingSaaSPage();
  await socialPo.openingSocialPage();
  await cryptoPo.openingCryptoPage();

  await usersPo.openingUsersPage();
  await profilePo.openingProfilePage();
  await settingsPo.openingSettingsPage();
  await clientsPo.openingClientsPage();
  await projectsListPo.openingProjectsListPage();
  await invoicePo.openingInvoicePage();
  await pricingPo.openingPricingPage();
  await tasksPo.openingTasksPage();
  await chatPo.openingChatPage();
  await blankPo.openingBlankPage();
  await paymentsPo.openingPaymentsPage();
  await notificationsPo.openingNotificationsPage();

  await basePo.Logout();
});
