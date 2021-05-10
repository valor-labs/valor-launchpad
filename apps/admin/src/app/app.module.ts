import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from "@angular/router";
import {FooterModule} from "./core/footer/footer.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, RouterModule, FooterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
