import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {FooterModule} from './core/footer/footer.module';
import {NavigationModule} from './core/navigation/navigation.module';
import {HeaderModule} from './core/header/header.module';
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {DashboardAnalyticsComponent} from './pages/dashboard-analytics/dashboard-analytics.component';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UiModule} from '@valor-launchpad/ui';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {CookieService} from 'ngx-cookie-service';
import {TokenInterceptor} from './core/auth/token.interceptor';
import {ToastrModule} from 'ngx-toastr';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ModalModule} from 'ngx-bootstrap/modal';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import {HttpModule} from './core/http/http.module';
import {environment} from '../environments/environment';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {NgxMaskModule} from 'ngx-mask';
// TODO: remove if find new method for dateRangePicker with timepicker
// for ng-zorro's datepicker
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {NZ_I18N, en_US} from 'ng-zorro-antd/i18n';
registerLocaleData(en);

@NgModule({
  declarations: [AppComponent, MainLayoutComponent, DashboardAnalyticsComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, AppRoutingModule,
    RouterModule, FooterModule, NavigationModule, HeaderModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    UiModule, NgxChartsModule, ToastrModule.forRoot(),
    HttpModule.forRoot({ environment }),
    BsDatepickerModule.forRoot(),
    NgxMaskModule.forRoot(),
  ],
  providers: [CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
