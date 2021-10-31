import { TimeAgoPipe } from './time-ago.pipe';
import { NgZone } from '@angular/core';

class NgZoneStub {
  runOutsideAngular(fn: () => unknown) {
    return fn();
  }
  run(fn: () => unknown) {
    return fn();
  }
}

describe('TimeAgoPipe', () => {
  it('create an instance', () => {
    const pipe = new TimeAgoPipe(null, new NgZoneStub() as NgZone);
    expect(pipe).toBeTruthy();
  });
});
