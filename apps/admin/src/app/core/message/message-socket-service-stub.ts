import { Subject } from 'rxjs';
import { ChatMessageVo } from '@valor-launchpad/api-interfaces';

export class MessageSocketServiceStub {
  mockNewMessage = new Subject<ChatMessageVo>();
  listenNewMessage() {
    return this.mockNewMessage.asObservable();
  }
}
