import {APP_INITIALIZER, NgModule} from '@angular/core';
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
import { ThemeBuilderComponent } from './core/theme-builder/theme-builder.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ValorThemeService } from './core/theme/valor-theme.service';
import { themeInitializer } from './core/theme/theme-initializer';

@NgModule({
  declarations: [AppComponent, MainLayoutComponent, DashboardAnalyticsComponent, ThemeBuilderComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, AppRoutingModule,
    RouterModule, FooterModule, NavigationModule, HeaderModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    UiModule, NgxChartsModule, ToastrModule.forRoot(),
    HttpModule.forRoot({ environment }),
    BsDatepickerModule.forRoot(),
    NgxMaskModule.forRoot(), ReactiveFormsModule
  ],
  providers: [CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: themeInitializer,
      deps: [ValorThemeService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
