import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from "@angular/router";
import {FooterModule} from "./core/footer/footer.module";
import {NavigationModule} from "./core/navigation/navigation.module";
import {HeaderModule} from "./core/header/header.module";
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {DashboardAnalyticsComponent} from './pages/dashboard-analytics/dashboard-analytics.component';
import {CollapseModule} from "ngx-bootstrap/collapse";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {UiModule} from "@valor-launchpad/ui";
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {CookieService} from 'ngx-cookie-service';
import {TokenInterceptor} from "./core/auth/token.interceptor";
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [AppComponent, MainLayoutComponent, DashboardAnalyticsComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, AppRoutingModule,
    RouterModule, FooterModule, NavigationModule, HeaderModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    UiModule, NgxChartsModule
  ],
  providers: [CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
