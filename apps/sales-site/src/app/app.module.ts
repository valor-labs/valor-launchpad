import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { themeInitializer } from './core/theme/theme-initializer';
import { ThemeService } from './core/theme/theme.service';
import { HeaderModule } from "./core/header/header.module";
import { FooterModule } from "./core/footer/footer.module";
import { UiModule } from '@valor-launchpad/ui';
import { MobileDetailComponent } from './pages/mobile-detail/mobile-detail.component';
import { MobilePricingComponent } from './pages/mobile-pricing/mobile-pricing.component';

@NgModule({
  declarations: [AppComponent, MainLayoutComponent, MobileDetailComponent, MobilePricingComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    UiModule,
    HeaderModule,
    FooterModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: themeInitializer,
      deps: [ThemeService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
