import { Inject, Pipe, PipeTransform } from '@angular/core';
import {
  ENV_CONFIG,
  EnvironmentConfig
} from '@valor-launchpad/http';

const defaultSrc = 'assets/img/avatars/avatar.jpg';

interface MediaAsset {
  src_webp: string;
  src: string;
}

@Pipe({
  name: 'valorImage'
})
export class ValorImagePipe implements PipeTransform {

  constructor(@Inject(ENV_CONFIG) private config: EnvironmentConfig) {

  }


  transform(value: string | MediaAsset): unknown {
    if (!value) return;
    if (typeof value === 'string') {
      return value;
    } else {
      if (Object.prototype.hasOwnProperty.call(value, 'src_webp') && !!value.src_webp) {
        if (value.src_webp.startsWith('http')) {
          return value.src_webp;
        }
        return this._getImagePath() + value.src_webp;
      } else if (Object.prototype.hasOwnProperty.call(value, 'src') && !!value.src) {
        if (value.src.startsWith('http')) {
          return value.src;
        }
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
