import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetNewPasswordComponent } from './reset-new-password.component';

describe('ResetNewPasswordComponent', () => {
  let component: ResetNewPasswordComponent;
  let fixture: ComponentFixture<ResetNewPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
