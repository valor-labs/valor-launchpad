import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthModule } from './core/auth/auth.module';
import { AuthGuard } from './core/auth/auth.guard';
// import { MapsGoogleModule } from './pages/maps-google/maps-google.module';

const routes: Routes = [
  {
    path: '404',
    loadChildren: () =>
      import('./pages/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
  {
    path: '500',
    loadChildren: () =>
      import('./pages/error/error.module').then((m) => m.ErrorModule),
  },
  {
    path: 'sign-in',
    loadChildren: () =>
      import('./pages/sign-in/sign-in.module').then((m) => m.SignInModule),
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./pages/sign-up/sign-up.module').then((m) => m.SignUpModule),
  },
  {
    path: 'verify-user',
    loadChildren: () =>
      import('./pages/verify-user/verify-user.module').then(
        (m) => m.VerifyUserModule
      ),
  },
  {
    path: 'reset-password',
    loadChildren: () =>
      import('./pages/reset-password/reset-password.module').then(
        (m) => m.ResetPasswordModule
      ),
  },
  {
    path: 'reset-new-password',
    loadChildren: () =>
      import('./pages/reset-new-password/reset-new-password.module').then(
        (m) => m.ResetNewPasswordModule
      ),
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'users',
        loadChildren: () =>
          import('@valor-launchpad/users-ui').then((m) => m.UsersUiModule),
      },
      {
        path: 'dashboard-crypto',
        loadChildren: () =>
          import('./pages/dashboard-crypto/dashboard-crypto.module').then(
            (m) => m.DashboardCryptoModule
          ),
      },
      {
        path: 'dashboard-analytics',
        loadChildren: () =>
          import('./pages/dashboard-analytics/dashboard-analytics.module').then(
            (m) => m.DashboardAnalyticsModule
          ),
      },
      {
        path: 'dashboard-default',
        loadChildren: () =>
          import('./pages/dashboard-default/dashboard-default.module').then(
            (m) => m.DashboardDefaultModule
          ),
      },
      {
        path: 'dashboard-saas',
        loadChildren: () =>
          import('./pages/dashboard-saas/dashboard-saas.module').then(
            (m) => m.DashboardSaasModule
          ),
      },
      {
        path: 'dashboard-social',
        loadChildren: () =>
          import('./pages/dashboard-social/dashboard-social.module').then(
            (m) => m.DashboardSocialModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./pages/profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'pricing',
        loadChildren: () =>
          import('./pages/pricing/pricing.module').then((m) => m.PricingModule),
      },
      {
        path: 'invoice',
        loadChildren: () =>
          import('./pages/invoice/invoice.module').then((m) => m.InvoiceModule),
      },
      {
        path: 'blank',
        loadChildren: () =>
          import('./pages/blank/blank.module').then((m) => m.BlankModule),
      },
      {
        path: 'responsive-table',
        loadChildren: () =>
          import(
            './pages/datatables-responsive/datatables-responsive.module'
          ).then((m) => m.DatatablesResponsiveModule),
      },
      {
        path: 'buttons-table',
        loadChildren: () =>
          import('./pages/datatables-buttons/datatables-buttons.module').then(
            (m) => m.DatatablesButtonsModule
          ),
      },
      {
        path: 'column-search-table',
        loadChildren: () =>
          import(
            './pages/datatables-column-search/datatables-column-search.module'
          ).then((m) => m.DatatablesColumnSearchModule),
      },
      {
        path: 'fixed-header-table',
        loadChildren: () =>
          import(
            './pages/datatables-fixed-header/datatables-fixed-header.module'
          ).then((m) => m.DatatablesFixedHeaderModule),
      },
      {
        path: 'multi-select-table',
        loadChildren: () =>
          import('./pages/datatables-multi/datatables-multi.module').then(
            (m) => m.DatatablesMultiModule
          ),
      },

      {
        path: 'ajax-sourced-table',
        loadChildren: () =>
          import('./pages/datatables-ajax/datatables-ajax.module').then(
            (m) => m.DatatablesAjaxModule
          ),
      },

      {
        path: 'chat',
        loadChildren: () =>
          import('./pages/chat/chat.module').then((m) => m.ChatModule),
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./pages/charts-chartjs/charts-chartjs.module').then(
            (m) => m.ChartsChartjsModule
          ),
      },
      {
        path: 'apexcharts',
        loadChildren: () =>
          import('./pages/charts-apexcharts/charts-apexcharts.module').then(
            (m) => m.ChartsApexchartsModule
          ),
      },
      {
        path: 'clients',
        loadChildren: () =>
          import('./pages/clients/clients.module').then((m) => m.ClientsModule),
      },
      {
        path: 'forms-layouts',
        loadChildren: () =>
          import('./pages/forms-layouts/forms-layouts.module').then(
            (m) => m.FormsLayoutsModule
          ),
      },
      {
        path: 'forms-basic-inputs',
        loadChildren: () =>
          import('./pages/forms-basic-inputs/forms-basic-inputs.module').then(
            (m) => m.FormsBasicInputsModule
          ),
      },
      {
        path: 'forms-input-groups',
        loadChildren: () =>
          import('./pages/forms-input-groups/forms-input-groups.module').then(
            (m) => m.FormsInputGroupsModule
          ),
      },
      {
        path: 'forms-floating-labels',
        loadChildren: () =>
          import(
            './pages/forms-floating-labels/forms-floating-labels.module'
          ).then((m) => m.FormsFloatingLabelsModule),
      },
      {
        path: 'forms-advanced-inputs',
        loadChildren: () =>
          import(
            './pages/forms-advanced-inputs/forms-advanced-inputs.module'
          ).then((m) => m.FormsAdvancedInputsModule),
      },
      {
        path: 'forms-editors',
        loadChildren: () =>
          import('./pages/forms-editors/forms-editors.module').then(
            (m) => m.FormsEditorsModule
          ),
      },
      {
        path: 'forms-validation',
        loadChildren: () =>
          import('./pages/forms-validation/forms-validation.module').then(
            (m) => m.FormsValidationModule
          ),
      },
      {
        path: 'forms-wizard',
        loadChildren: () =>
          import('./pages/forms-wizard/forms-wizard.module').then(
            (m) => m.FormsWizardModule
          ),
      },
      {
        path: 'font-awesome',
        loadChildren: () =>
          import('./pages/icons-font-awesome/icons-font-awesome.module').then(
            (m) => m.IconsFontAwesomeModule
          ),
      },
      {
        path: 'tables',
        loadChildren: () =>
          import('./pages/tables-bootstrap/tables-bootstrap.module').then(
            (m) => m.TablesBootstrapModule
          ),
      },
      {
        path: 'projects-detail',
        loadChildren: () =>
          import('./pages/projects-detail/projects-detail.module').then(
            (m) => m.ProjectsDetailModule
          ), // TODO: refactor this to use ID
      },
      {
        path: 'projects-list',
        loadChildren: () =>
          import('./pages/projects-list/projects-list.module').then(
            (m) => m.ProjectsListModule
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./pages/settings/settings.module').then(
            (m) => m.SettingsModule
          ),
      },
      {
        path: 'docs',
        loadChildren: () =>
          import('./pages/documentation/documentation.module').then(
            (m) => m.DocumentationModule
          ),
      },
      {
        path: 'tasks',
        loadChildren: () =>
          import('./pages/tasks/tasks.module').then((m) => m.TasksModule),
      },
      {
        path: 'ui-alerts',
        loadChildren: () =>
          import('./pages/ui-alerts/ui-alerts.module').then(
            (m) => m.UiAlertsModule
          ),
      },
      {
        path: 'ui-buttons',
        loadChildren: () =>
          import('./pages/ui-buttons/ui-buttons.module').then(
            (m) => m.UiButtonsModule
          ),
      },
      {
        path: 'ui-cards',
        loadChildren: () =>
          import('./pages/ui-cards/ui-cards.module').then(
            (m) => m.UiCardsModule
          ),
      },
      {
        path: 'ui-notification',
        loadChildren: () =>
          import('./pages/ui-notifications/ui-notifications.module').then(
            (m) => m.UiNotificationsModule
          ),
      },
      {
        path: 'ui-chips',
        loadChildren: () =>
          import('./pages/ui-chips/ui-chips.module').then(
            (m) => m.UiChipsModule
          ),
      },
      {
        path: 'ui-offcanvas',
        loadChildren: () =>
          import('./pages/ui-offcanvas/ui-offcanvas.module').then(
            (m) => m.UiOffcanvasModule
          ),
      },
      {
        path: 'ui-carousel',
        loadChildren: () =>
          import('./pages/ui-carousel/ui-carousel.module').then(
            (m) => m.UiCarouselModule
          ),
      },
      {
        path: 'ui-embed-video',
        loadChildren: () =>
          import('./pages/ui-embed-video/ui-embed-video.module').then(
            (m) => m.UiEmbedVideoModule
          ),
      },
      {
        path: 'ui-general',
        loadChildren: () =>
          import('./pages/ui-general/ui-general.module').then(
            (m) => m.UiGeneralModule
          ),
      },
      {
        path: 'ui-tabs',
        loadChildren: () =>
          import('./pages/ui-tabs/ui-tabs.module').then((m) => m.UiTabsModule),
      },
      {
        path: 'maps-vector',
        loadChildren: () =>
          import('./pages/maps-vector/maps-vector.module').then(
            (m) => m.MapsVectorModule
          ),
      },
      {
        path: 'ui-maps-google',
        loadChildren: () =>
          import('./pages/maps-google/maps-google.module').then(
            (m) => m.MapsGoogleModule
          ),
      },
      {
        path: 'ui-typography',
        loadChildren: () =>
          import('./pages/ui-typography/ui-typography.module').then(
            (m) => m.UiTypographyModule
          ),
      },
      {
        path: 'ui-color-palette',
        loadChildren: () =>
          import('./pages/color-palette/color-palette.module').then(
            (m) => m.ColorPaletteModule
          ),
      },
      {
        path: 'ui-grid',
        loadChildren: () =>
          import('./pages/ui-grid/ui-grid.module').then((m) => m.UiGridModule),
      },
      {
        path: 'ui-modals',
        loadChildren: () =>
          import('./pages/ui-modals/ui-modals.module').then(
            (m) => m.UiModalsModule
          ),
      },
      {
        path: 'payments',
        loadChildren: () =>
          import('./pages/payments/payments.module').then(
            (m) => m.PaymentsModule
          ),
      },
      {
        path: 'calendar',
        loadChildren: () =>
          import('./pages/calendar/calendar.module').then(
            (m) => m.CalendarModule
          ),
      },
      {
        path: '',
        redirectTo: '/dashboard-default',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: '/404',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), AuthModule, CommonModule],
})
export class AppRoutingModule {}
