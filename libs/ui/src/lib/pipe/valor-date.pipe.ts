import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';

@Pipe({ name: 'valorDate' })
export class ValorDatePipe implements PipeTransform {
  transform(value: Date | string | number): string {
    const d = new Date(value);
    if (dayjs().isSame(d, 'day')) {
      return `${dayjs(d).format('hh:mm a')}`;
    } else if (dayjs().diff(d) === 1) {
      return `Yesterday ${dayjs(d).format('hh:mm a')}`;
    } else {
      return dayjs(d).format('MM/DD hh:mm a');
    }
  }
}
