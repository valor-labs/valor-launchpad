import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'crease'
})
export class CreasePipe implements PipeTransform {

  transform(value: string, prefix?: string): string {
    return `${prefix || ''}${value}%`;
  }

}
