import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EnvironmentConfig, ENV_CONFIG } from './environment-config.interface';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from './http-header.interceptor';

@NgModule({
  imports: [CommonModule],
})
export class HttpModule {
  static forRoot(config: EnvironmentConfig) {
    return {
      ngModule: HttpModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HeaderInterceptor,
          multi: true,
        },
        {
          provide: ENV_CONFIG,
          useValue: config,
        },
      ],
    };
  }
}
