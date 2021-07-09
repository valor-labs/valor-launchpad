import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MainLayoutComponent} from "./main-layout/main-layout.component";
import {AuthModule} from "./core/auth/auth.module";
import {AuthGuard} from "./core/auth/auth.guard";

const routes: Routes = [
  {
    path: '404', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
  },
  {
    path: '500', loadChildren: () => import('./pages/error/error.module').then(m => m.ErrorModule)
  },
  {
    path: 'sign-in', loadChildren: () => import('./pages/sign-in/sign-in.module').then(m => m.SignInModule)
  },
  {
    path: 'sign-up', loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpModule)
  },
  {
    path: 'verify-user', loadChildren: () => import('./pages/verify-user/verify-user.module').then(m => m.VerifyUserModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
  },
  {
    path: '', component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard-crypto',
        loadChildren: () => import('./pages/dashboard-crypto/dashboard-crypto.module').then(m => m.DashboardCryptoModule)
      },
      {
        path: 'dashboard-analytics',
        loadChildren: () => import('./pages/dashboard-analytics/dashboard-analytics.module').then(m => m.DashboardAnalyticsModule)
      },
      {
        path: 'dashboard-default',
        loadChildren: () => import('./pages/dashboard-default/dashboard-default.module').then(m => m.DashboardDefaultModule)
      },
      {
        path: 'dashboard-saas',
        loadChildren: () => import('./pages/dashboard-saas/dashboard-saas.module').then(m => m.DashboardSaasModule)
      },
      {
        path: 'dashboard-social',
        loadChildren: () => import('./pages/dashboard-social/dashboard-social.module').then(m => m.DashboardSocialModule)
      },
      {
        path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'pricing', loadChildren: () => import('./pages/pricing/pricing.module').then(m => m.PricingModule)
      },
      {
        path: 'invoice', loadChildren: () => import('./pages/invoice/invoice.module').then(m => m.InvoiceModule)
      },
      {
        path: 'blank', loadChildren: () => import('./pages/blank/blank.module').then(m => m.BlankModule)
      },
      {
        path: 'chat', loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatModule)
      },
      {
        path: 'clients', loadChildren: () => import('./pages/clients/clients.module').then(m => m.ClientsModule)
      },
      {
        path: 'forms-layouts', loadChildren: () => import('./pages/forms-layouts/forms-layouts.module').then(m => m.FormsLayoutsModule)
      },
      {
        path: 'forms-basic-inputs', loadChildren: () => import('./pages/forms-basic-inputs/forms-basic-inputs.module').then(m => m.FormsBasicInputsModule)
      },
      {
        path: 'forms-input-groups', loadChildren: () => import('./pages/forms-input-groups/forms-input-groups.module').then(m => m.FormsInputGroupsModule)
      },
      {
        path: 'forms-floating-labels', loadChildren: () => import('./pages/forms-floating-labels/forms-floating-labels.module').then(m => m.FormsFloatingLabelsModule)
      },
      {
        path: 'forms-advanced-inputs', loadChildren: () => import('./pages/forms-advanced-inputs/forms-advanced-inputs.module').then(m => m.FormsAdvancedInputsModule)
      },
      {
        path: 'forms-editors', loadChildren: () => import('./pages/forms-editors/forms-editors.module').then(m => m.FormsEditorsModule)
      },
      {
        path: 'forms-validation', loadChildren: () => import('./pages/forms-validation/forms-validation.module').then(m => m.FormsValidationModule)
      },
      {
        path: 'forms-wizard', loadChildren: () => import('./pages/forms-wizard/forms-wizard.module').then(m => m.FormsWizardModule)
      },
      {
        path: 'font-awesome',
        loadChildren: () => import('./pages/icons-font-awesome/icons-font-awesome.module').then(m => m.IconsFontAwesomeModule)
      },
      {
        path: 'projects-detail',
        loadChildren: () => import('./pages/projects-detail/projects-detail.module').then(m => m.ProjectsDetailModule) // TODO: refactor this to use ID
      },
      {
        path: 'projects-list',
        loadChildren: () => import('./pages/projects-list/projects-list.module').then(m => m.ProjectsListModule)
      },
      {
        path: 'settings', loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: 'tasks', loadChildren: () => import('./pages/tasks/tasks.module').then(m => m.TasksModule)
      },
      {
        path: 'ui-alerts', loadChildren: () => import('./pages/ui-alerts/ui-alerts.module').then(m => m.UiAlertsModule)
      },
      {
        path: 'ui-buttons',
        loadChildren: () => import('./pages/ui-buttons/ui-buttons.module').then(m => m.UiButtonsModule)
      },
      {
        path: 'ui-cards', loadChildren: () => import('./pages/ui-cards/ui-cards.module').then(m => m.UiCardsModule)
      },
      {
        path: 'ui-offcanvas', loadChildren: () => import('./pages/ui-offcanvas/ui-offcanvas.module').then(m => m.UiOffcanvasModule)
      },
      {
        path: 'ui-carousel', loadChildren: () => import('./pages/ui-carousel/ui-carousel.module').then(m => m.UiCarouselModule)
      },
      {
        path: 'ui-embed-video', loadChildren: () => import('./pages/ui-embed-video/ui-embed-video.module').then(m => m.UiEmbedVideoModule)
      },
      {
        path: 'ui-tabs', loadChildren: () => import('./pages/ui-tabs/ui-tabs.module').then(m => m.UiTabsModule)
      },
      {
        path: 'ui-typography',
        loadChildren: () => import('./pages/ui-typography/ui-typography.module').then(m => m.UiTypographyModule)
      },
      {
        path: 'ui-grid',
        loadChildren: () => import('./pages/ui-grid/ui-grid.module').then(m => m.UiGridModule)
      },
      {
        path: 'payments',
        loadChildren: () => import('./pages/payments/payments.module').then(m=> m.PaymentsModule)
      },
      {
        path: '', redirectTo: '/dashboard-default', pathMatch: 'full'
      },
      {
        path: '**', redirectTo: '/404', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    AuthModule,
    CommonModule
  ]
})
export class AppRoutingModule {
}
