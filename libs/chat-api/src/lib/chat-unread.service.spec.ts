import { TestBed } from '@angular/core/testing';

import { ChatUnreadService } from './chat-unread.service';

describe('ChatUnreadService', () => {
  let service: ChatUnreadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatUnreadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
