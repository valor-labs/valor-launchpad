import { Pipe, PipeTransform } from '@angular/core';

interface NamedUser {
  firstName: string;
  lastName: string;
  fullName?: string;
}

@Pipe({
  name: 'fullName',
})
export class FullNamePipe implements PipeTransform {
  transform(value: NamedUser | null | undefined): unknown {
    if (!value) {
      console.error(
        'accept NamedUser only, be sure you are passing firstName and lastName into this'
      );
      return '';
    }
    if (value.fullName) {
      return value.fullName;
    } else {
      return `${value.firstName} ${value.lastName}`;
    }
  }
}
