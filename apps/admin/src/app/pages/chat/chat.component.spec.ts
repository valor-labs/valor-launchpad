import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ChatComponent } from './chat.component';
import { ValorLaunchpadMessengerComponent } from './valor-launchpad-messenger/valor-launchpad-messenger.component';
import { ValorLaunchpadMessageComponent } from './valor-launchpad-message/valor-launchpad-message.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpModule } from '@valor-launchpad/http';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { UiModule } from '@valor-launchpad/ui';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ChatService } from './chat.service';
import { ChatServiceStub } from './chat-service-stub';
import { RouterTestingModule } from '@angular/router/testing';
import { ThreadAvatarComponent } from './thread-avatar/thread-avatar.component';
import { MessageSocketService } from '../../core/message/message-socket.service';
import { MessageSocketServiceStub } from '../../core/message/message-socket-service-stub';
import { OverlayModule } from '@angular/cdk/overlay';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let chatService: ChatServiceStub;
  let messageService: MessageSocketServiceStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        HttpModule.forRoot({ environment }),
        FormsModule,
        UiModule,
        ModalModule.forRoot(),
        OverlayModule,
      ],
      declarations: [
        ChatComponent,
        ValorLaunchpadMessengerComponent,
        ValorLaunchpadMessageComponent,
        ThreadAvatarComponent,
      ],
      providers: [
        { provide: ChatService, useClass: ChatServiceStub },
        { provide: MessageSocketService, useClass: MessageSocketServiceStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    chatService = TestBed.inject(ChatService) as unknown as ChatServiceStub;
    messageService = TestBed.inject(
      MessageSocketService
    ) as unknown as MessageSocketServiceStub;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show typing status', (done) => {
    chatService.mockUserTyping.next({
      userId: 'userid1',
      threadId: 'threadid1',
    });
    component.messengers
      .find((i) => i.id === 'threadid1')
      .isTyping.subscribe((typing) => {
        expect(typing).toEqual(true);
        done();
      });
  });

  it('should keep run when the typing thread does not exist', fakeAsync(() => {
    chatService.mockUserTyping.next({
      userId: 'userid1',
      threadId: 'threadid_not_exist',
    });
    tick(200);
  }));

  it('should success when new message in a exist thread come', () => {
    jest.spyOn(component, 'chatZoneToBottom').mockImplementation(() => 0);
    messageService.mockNewMessage.next({
      id: 'id',
      message: 'this is a mock message',
      createdDate: new Date(),
      isSelf: false,
      threadId: 'threadid1',
      createdUser: {
        id: 'uid',
        username: 'johnsnow',
        firstName: 'John',
        lastName: 'Snow',
        profile: {
          avatar: {
            src: '',
            src_webp: '',
            alt: '',
          },
        },
      },
    });
    fixture.detectChanges();
    expect(component.messages[0].message).toBe('this is a mock message');
    expect(component.chatZoneToBottom).toHaveBeenCalled();
  });

  it('should success when new message in a non-exist thread come', () => {
    jest.spyOn(component, 'chatZoneToBottom').mockImplementation(() => 0);
    messageService.mockNewMessage.next({
      id: '738962dc-3846-419b-956c-3d63c925ede3',
      message: 'mmmm',
      threadId: 'ea8982ef-4697-4a83-be86-9155ea6a53b2',
      createdDate: '2021-11-22T04:29:16.001Z',
      thread: {
        id: 'ea8982ef-4697-4a83-be86-9155ea6a53b2',
        name: '',
        isGroup: true,
        createdDate: '2021-11-22T04:28:47.253Z',
        deletedDate: null,
        lastChatDate: '2021-11-22T04:29:15.988Z',
        chatThreadUsers: [
          {
            id: 'c3187f08-6730-4d1f-95d4-9f001e2831fe',
            username: 'user2',
            firstName: 'Summer',
            lastName: 'Welch',
            profile: {
              avatar: {
                src: 'avatar-2.jpg',
                src_webp: 'avatar-2.webp',
                alt: 'user2 profile avatar picture',
              },
            },
            isConnected: true,
          },
          {
            id: '9378df11-a4e3-48af-aa29-bb84894298e5',
            username: 'user1',
            firstName: 'Gonzalo',
            lastName: 'Morar',
            profile: {
              avatar: {
                src: 'avatar.jpg',
                src_webp: 'avatar.webp',
                alt: 'user1 profile avatar picture',
              },
            },
            isConnected: true,
          },
          {
            id: '89286650-7f09-45cf-a2ce-b0a5f80977cd',
            username: 'user3',
            firstName: 'Brant',
            lastName: 'Rolfson',
            profile: {
              avatar: {
                src: 'avatar-3.jpg',
                src_webp: 'avatar-3.webp',
                alt: 'user3 profile avatar picture',
              },
            },
            isConnected: false,
          },
          {
            id: '9e142cac-ba0a-4a9e-8548-ed4f601cc671',
            username: 'user4',
            firstName: 'aaaa',
            lastName: 'bbbb',
            profile: { avatar: null },
            isConnected: false,
          },
        ],
        avatar: null,
        isConnected: false,
        targetingUser: null,
        unreadMessages: [
          '237c369e-9117-449d-9326-99361e14356d',
          '738962dc-3846-419b-956c-3d63c925ede3',
        ],
      },
      createdUser: {
        id: 'c3187f08-6730-4d1f-95d4-9f001e2831fe',
        username: 'user2',
        firstName: 'Summer',
        lastName: 'Welch',
        profile: {
          avatar: {
            src: 'avatar-2.jpg',
            src_webp: 'avatar-2.webp',
            alt: 'user2 profile avatar picture',
          },
        },
      },
      isSelf: false,
    });
    fixture.detectChanges();
    expect(component.messengers[0].id).toBe(
      'ea8982ef-4697-4a83-be86-9155ea6a53b2'
    );
    expect(component.chatZoneToBottom).not.toHaveBeenCalled();
  });
});
