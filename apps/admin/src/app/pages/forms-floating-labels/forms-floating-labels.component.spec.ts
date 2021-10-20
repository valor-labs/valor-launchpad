import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsFloatingLabelsComponent } from './forms-floating-labels.component';

describe('FormsFloatingLabelsComponent', () => {
  let component: FormsFloatingLabelsComponent;
  let fixture: ComponentFixture<FormsFloatingLabelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormsFloatingLabelsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsFloatingLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
