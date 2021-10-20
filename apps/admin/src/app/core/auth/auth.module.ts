import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenInterceptor } from './token.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [TokenInterceptor],
})
export class AuthModule {}
