import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from "@angular/router";
import {FooterModule} from "./core/footer/footer.module";
import {NavigationModule} from "./core/navigation/navigation.module";
import {HeaderModule} from "./core/header/header.module";
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { DashboardAnalyticsComponent } from './pages/dashboard-analytics/dashboard-analytics.component';

@NgModule({
  declarations: [AppComponent, MainLayoutComponent, DashboardAnalyticsComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule,
    RouterModule, FooterModule, NavigationModule, HeaderModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
