import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component'
import {MobileDetailComponent} from "./pages/mobile-detail/mobile-detail.component";
import {MobilePricingComponent} from "./pages/mobile-pricing/mobile-pricing.component";

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
        path: 'mobile-detail',
        component: MobileDetailComponent
      },
      {
        path: 'mobile-pricing',
        component: MobilePricingComponent
      },
      {
        path: '',
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
