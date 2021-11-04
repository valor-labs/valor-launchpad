import { TestBed } from '@angular/core/testing';

import { NotificationsService } from './notifications.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpModule } from '@valor-launchpad/http';
import { environment } from '../../../environments/environment';

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpModule.forRoot({ environment })],
    });
    service = TestBed.inject(NotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
