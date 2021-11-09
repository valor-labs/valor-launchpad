import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorLaunchpadMessageComponent } from './valor-launchpad-message.component';
import { UiModule } from '@valor-launchpad/ui';
import { HttpModule } from '@valor-launchpad/http';
import { environment } from '../../../../environments/environment';

describe('ValorLaunchpadMessageComponent', () => {
  let component: ValorLaunchpadMessageComponent;
  let fixture: ComponentFixture<ValorLaunchpadMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiModule, HttpModule.forRoot({ environment })],
      declarations: [ValorLaunchpadMessageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValorLaunchpadMessageComponent);
    component = fixture.componentInstance;
    component.message = {
      id: 'id',
      message: 'message',
      createdDate: new Date(),
      isSelf: true,
      threadId: 'threadId',
      createdUser: {
        id: '',
        username: '',
        firstName: '',
        lastName: '',
        profile: {
          avatar: {
            src: '',
            src_webp: '',
            alt: '',
          },
        },
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
