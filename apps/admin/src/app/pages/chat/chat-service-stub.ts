import { Observable, of, Subject } from 'rxjs';
import {
  ChatMessageVo,
  ChatThreadVo,
  ChatUserVo,
} from '@valor-launchpad/api-interfaces';
import { delay } from 'rxjs/operators';
import { IChatService } from './chat.service';

export class ChatServiceStub implements IChatService {
  mockNewMessage = new Subject<ChatMessageVo>();
  mockUserTyping = new Subject<{ userId: string; threadId: string }>();
  listenNewMessage() {
    return this.mockNewMessage.asObservable();
  }

  listenTyping() {
    return this.mockUserTyping.asObservable();
  }

  sendMessage(threadId: string, message: string, socketId: string): any {
    // pass
  }

  fetchThreadMessages(threadId: string): any {
    // pass
  }

  sendTypingStatus(threadId: string) {
    // pass
  }

  markThreadAsRead(threadId: string): any {
    // pass
  }

  searchUser(keyword: string): Observable<ChatUserVo[]> {
    return of([
      {
        id: 'id',
        firstName: 'John',
        lastName: 'Snow',
        username: 'johnsnow',
        profile: {
          avatar: {
            src: '',
            src_webp: '',
            alt: 'avatar',
          },
        },
      },
    ]);
  }

  createThread() {
    return of({}).pipe(delay(200));
  }

  fetchThreads(): Observable<ChatThreadVo[]> {
    return of([
      {
        id: 'threadid1',
        name: 'string',
        isGroup: false,
        avatar: {
          src: 'string',
          src_webp: 'string',
          alt: 'string',
        },
        isConnected: true,
        targetingUser: { id: 'string' },
        chatThreadUsers: [
          {
            id: 'string2',
            username: 'string',
            firstName: 'string',
            lastName: 'string',
            isConnected: true,
            profile: {
              avatar: {
                src: 'string',
                src_webp: 'string',
                alt: 'string',
              },
            },
          },
        ],
        unreadMessages: ['1', '2'],
      },
    ]);
  }
}
