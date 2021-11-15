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

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let chatService: ChatServiceStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HttpModule.forRoot({ environment }),
        FormsModule,
        UiModule,
        ModalModule.forRoot(),
      ],
      declarations: [
        ChatComponent,
        ValorLaunchpadMessengerComponent,
        ValorLaunchpadMessageComponent,
      ],
      providers: [{ provide: ChatService, useClass: ChatServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    chatService = TestBed.inject(ChatService) as unknown as ChatServiceStub;
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
});
