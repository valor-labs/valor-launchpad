import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayoutComponent } from './main-layout.component';
import { HttpModule } from '@valor-launchpad/http';
import { environment } from '../../environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationModule } from '../core/navigation/navigation.module';
import { HeaderModule } from '../core/header/header.module';
import { FooterModule } from '../core/footer/footer.module';
import { ThemeBuilderComponent } from '../core/theme-builder/theme-builder.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationSocketService } from '../core/notification/notification-socket.service';
import { NotificationSocketServiceStub } from '../core/notification/notification-socket-service.stub';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpModule.forRoot({ environment }),
        HttpClientTestingModule,
        RouterTestingModule,
        NavigationModule,
        HeaderModule,
        FooterModule,
        ReactiveFormsModule,
      ],
      declarations: [MainLayoutComponent, ThemeBuilderComponent],
      providers: [
        {
          provide: NotificationSocketService,
          useClass: NotificationSocketServiceStub,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
