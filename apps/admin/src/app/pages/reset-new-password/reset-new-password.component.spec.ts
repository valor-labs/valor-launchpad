import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetNewPasswordComponent } from './reset-new-password.component';
import { UiModule } from '@valor-launchpad/ui';
import { HttpModule } from '@valor-launchpad/http';
import { environment } from '../../../environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';

describe('ResetNewPasswordComponent', () => {
  let component: ResetNewPasswordComponent;
  let fixture: ComponentFixture<ResetNewPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UiModule,
        HttpModule.forRoot({ environment }),
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
      ],
      declarations: [ResetNewPasswordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetNewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
