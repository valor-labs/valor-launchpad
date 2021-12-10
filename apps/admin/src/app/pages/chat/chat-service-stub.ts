import { Observable, of, Subject } from 'rxjs';
import {
  ChatMessageVo,
  ChatThreadVo,
  ChatUserVo,
} from '@valor-launchpad/api-interfaces';
import { delay } from 'rxjs/operators';
import { IChatService } from './chat.service';

export class ChatServiceStub implements IChatService {
  mockUserTyping = new Subject<{ userId: string; threadId: string }>();

  listenTyping() {
    return this.mockUserTyping.asObservable();
  }

  sendMessage(): Observable<ChatMessageVo> {
    return of({} as ChatMessageVo);
  }

  fetchThreadMessages() {
    return of([]);
  }

  sendTypingStatus() {
    // pass
  }

  markThreadAsRead(): Observable<void> {
    return of(undefined);
  }

  searchUser(): Observable<ChatUserVo[]> {
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
    return of({} as ChatThreadVo).pipe(delay(200));
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
        targetingUser: {
          id: 'string',
          firstName: '',
          lastName: '',
          username: '',
        },
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
