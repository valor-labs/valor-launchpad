import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HttpModule } from '@valor-launchpad/http';
import { environment } from '../../../environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AutocompleteModule, UiModule } from '@valor-launchpad/ui';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NotificationModule } from '../notification/notification.module';
import { NotificationSocketService } from '../notification/notification-socket.service';
import { NotificationSocketServiceStub } from '../notification/notification-socket-service.stub';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpModule.forRoot({ environment }),
        HttpClientTestingModule,
        UiModule,
        RouterTestingModule,
        AutocompleteModule,
        ReactiveFormsModule,
        ModalModule.forRoot(),
        NotificationModule,
      ],
      declarations: [HeaderComponent],
      providers: [
        {
          provide: NotificationSocketService,
          useClass: NotificationSocketServiceStub,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
