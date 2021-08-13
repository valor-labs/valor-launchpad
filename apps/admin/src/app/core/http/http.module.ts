import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {EnvironmentConfig, ENV_CONFIG} from './environment-config.interface';

@NgModule({
  imports: [CommonModule]
})
export class HttpModule {
  static forRoot(config: EnvironmentConfig) {
    return {
      ngModule: HttpModule,
      providers: [
        {
          provide: ENV_CONFIG,
          useValue: config
        }
      ]
    };
  }
}
