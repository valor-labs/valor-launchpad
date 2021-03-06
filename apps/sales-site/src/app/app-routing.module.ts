import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component'

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./pages/home/home.module').then(
            (m) => m.HomeModule
          ),
      },
      {
        path: 'pricing',
        loadChildren: () =>
          import('./pages/pricing/pricing.module').then(
            (m) => m.PricingModule
          ),
      },
      {
        path: 'integrations',
        loadChildren: () =>
          import('./pages/integrations/integrations.module').then(
            (m) => m.IntegrationsModule
          ),
      },
      {
        path: 'mobile',
        loadChildren: () =>
          import('./pages/mobile/mobile.module').then(
            (m) => m.MobileModule
          ),
      },
      {
        path: '**',
        redirectTo: '/home',
        pathMatch: 'full',
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule]
})
export class AppRoutingModule { }
