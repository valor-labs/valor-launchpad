import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from "./auth.service";
import {TokenInterceptor} from "./token.interceptor";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [AuthService, TokenInterceptor]
})
export class AuthModule { }
