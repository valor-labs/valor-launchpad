import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsValidationComponent } from './forms-validation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { UiModule } from '@valor-launchpad/ui';

describe('FormsValidationComponent', () => {
  let component: FormsValidationComponent;
  let fixture: ComponentFixture<FormsValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NgSelectModule, UiModule],
      declarations: [FormsValidationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
