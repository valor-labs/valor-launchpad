import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsAdvancedInputsComponent } from './forms-advanced-inputs.component';

describe('FormsAdvancedInputsComponent', () => {
  let component: FormsAdvancedInputsComponent;
  let fixture: ComponentFixture<FormsAdvancedInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormsAdvancedInputsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsAdvancedInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
