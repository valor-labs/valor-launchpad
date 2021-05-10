import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
  {
    path: '404', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
  },
  {
    path: '500', loadChildren: () => import('./pages/error/error.module').then(m => m.ErrorModule)
  },
  {
    path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'pricing', loadChildren: () => import('./pages/pricing/pricing.module').then(m => m.PricingModule)
  },
  {
    path: 'invoice', loadChildren: () => import('./pages/invoice/invoice.module').then(m => m.InvoiceModule)
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
