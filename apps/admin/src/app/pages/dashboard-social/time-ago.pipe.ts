import {
  ChangeDetectorRef,
  NgZone,
  OnDestroy,
  Pipe,
  PipeTransform,
} from '@angular/core';

@Pipe({ name: 'timeAgo', pure: false })
export class TimeAgoPipe implements PipeTransform, OnDestroy {
  private timer: number;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  transform(val: Date | string) {
    let d: Date;
    if (typeof val === 'string') {
      d = new Date(val);
    } else if (val instanceof Date) {
      d = val;
    }
    if (!(d instanceof Date)) {
      throw Error('The date is invalid');
    }
    this.removeTimerIfExists();
    const now = new Date();
    const seconds = Math.round(Math.abs((now.getTime() - d.getTime()) / 1000));
    const timeToUpdate = Number.isNaN(seconds)
      ? 1000
      : this.getInterval(seconds) * 1000;
    this.timer = this.ngZone.runOutsideAngular(() => {
      return window.setTimeout(() => {
        this.ngZone.run(() => this.changeDetectorRef.markForCheck());
      }, timeToUpdate);
    });
    const minutes = Math.round(Math.abs(seconds / 60));
    const hours = Math.round(Math.abs(minutes / 60));
    const days = Math.round(Math.abs(hours / 24));
    const months = Math.round(Math.abs(days / 30.416));
    const years = Math.round(Math.abs(days / 365));
    if (Number.isNaN(seconds)) {
      return '';
    } else if (seconds <= 45) {
      return seconds + 's ago';
    } else if (seconds <= 90) {
      return '1m ago';
    } else if (minutes <= 45) {
      return minutes + 'm ago';
    } else if (minutes <= 90) {
      return '1h ago';
    } else if (hours <= 22) {
      return hours + 'h ago';
    } else if (hours <= 36) {
      return '1d ago';
    } else if (days <= 25) {
      return days + 'd ago';
    } else if (days <= 45) {
      return 'a month ago';
    } else if (days <= 345) {
      return months + ' months ago';
    } else if (days <= 545) {
      return 'a year ago';
    } else {
      return years + ' years ago';
    }
  }

  ngOnDestroy(): void {
    this.removeTimerIfExists();
  }

  private removeTimerIfExists() {
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private getInterval(seconds: number) {
    const min = 60;
    const hr = min * 60;
    const day = hr * 24;
    if (seconds < min) {
      // less than 1 min, update every 2 secs
      return 2;
    } else if (seconds < hr) {
      // less than an hour, update every 30 secs
      return 30;
    } else if (seconds < day) {
      // less then a day, update every 5 mins
      return 300;
    } else {
      // update every hour
      return 3600;
    }
  }
}
