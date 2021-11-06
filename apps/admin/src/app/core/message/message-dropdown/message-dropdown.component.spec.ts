import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageDropdownComponent } from './message-dropdown.component';
import { UiModule } from '@valor-launchpad/ui';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpModule } from '@valor-launchpad/http';
import { environment } from '../../../../environments/environment';

describe('MessageDropdownComponent', () => {
  let component: MessageDropdownComponent;
  let fixture: ComponentFixture<MessageDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UiModule,
        HttpClientTestingModule,
        HttpModule.forRoot({ environment }),
      ],
      declarations: [MessageDropdownComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
