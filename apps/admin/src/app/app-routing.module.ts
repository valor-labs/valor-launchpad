import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MainLayoutComponent} from "./main-layout/main-layout.component";


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
    path: 'reset-password', loadChildren: () => import('./pages/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
  },
  {
    path: '', component: MainLayoutComponent, children: [
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
        path: 'projects-detail', loadChildren: () => import('./pages/projects-detail/projects-detail.module').then(m => m.ProjectsDetailModule) // TODO: refactor this to use ID
      },
      {
        path: 'projects-list', loadChildren: () => import('./pages/projects-list/projects-list.module').then(m => m.ProjectsListModule)
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
        path: 'ui-buttons', loadChildren: () => import('./pages/ui-buttons/ui-buttons.module').then(m => m.UiButtonsModule)
      },
      {
        path: 'ui-cards', loadChildren: () => import('./pages/ui-cards/ui-cards.module').then(m => m.UiCardsModule)
      },
      {
        path: 'ui-tabs', loadChildren: () => import('./pages/ui-tabs/ui-tabs.module').then(m => m.UiTabsModule)
      },
      {
        path: 'ui-typography', loadChildren: () => import('./pages/ui-typography/ui-typography.module').then(m => m.UiTypographyModule)
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class AppRoutingModule {
}
