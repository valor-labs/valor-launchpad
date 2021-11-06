import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatComponent } from './chat.component';
import { ValorLaunchpadMessengerComponent } from './valor-launchpad-messenger/valor-launchpad-messenger.component';
import { ValorLaunchpadMessageComponent } from './valor-launchpad-message/valor-launchpad-message.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpModule } from '@valor-launchpad/http';
import { environment } from '../../../environments/environment';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpModule.forRoot({ environment })],
      declarations: [
        ChatComponent,
        ValorLaunchpadMessengerComponent,
        ValorLaunchpadMessageComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
