import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyUserComponent } from './verify-user.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@valor-launchpad/http';
import { environment } from '../../../environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UiModule } from '@valor-launchpad/ui';

describe('VerifyUserComponent', () => {
  let component: VerifyUserComponent;
  let fixture: ComponentFixture<VerifyUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpModule.forRoot({ environment }),
        HttpClientTestingModule,
        UiModule,
      ],
      declarations: [VerifyUserComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
