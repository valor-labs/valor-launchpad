import { InjectionToken } from '@angular/core';

export interface EnvironmentConfig {
  environment: {
    production: boolean;
    apiBase: string;
  };
}

export const ENV_CONFIG = new InjectionToken<EnvironmentConfig>(
  'EnvironmentConfig'
);
