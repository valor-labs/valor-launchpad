import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneValidationComponent } from './phone-validation.component';

describe('PhoneValidationComponent', () => {
  let component: PhoneValidationComponent;
  let fixture: ComponentFixture<PhoneValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
