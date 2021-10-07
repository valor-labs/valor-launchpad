import { Inject, Pipe, PipeTransform } from '@angular/core';
import { Media } from '@api/projects';
import {
  ENV_CONFIG,
  EnvironmentConfig
} from '../../../../../apps/admin/src/app/core/http/environment-config.interface';

const defaultSrc = 'assets/img/avatars/avatar.jpg';

@Pipe({
  name: 'valorImage'
})
export class ValorImagePipe implements PipeTransform {

  constructor(@Inject(ENV_CONFIG) private config: EnvironmentConfig) {

  }


  transform(value: string | Media): unknown {
    if (typeof value === 'string') {
      return value;
    } else {
      if (value.src_webp !== '') {
        return this._getImagePath() + value.src_webp;
      } else if (value.src !== '') {
        return this._getImagePath() + value.src;
      } else {
        return defaultSrc;
      }
    }
  }

  private _getImagePath() {
    return this.config.environment.apiBase;
  }

}
