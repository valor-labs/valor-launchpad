import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsLayoutsComponent } from './forms-layouts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@valor-launchpad/ui';

describe('FormsLayoutsComponent', () => {
  let component: FormsLayoutsComponent;
  let fixture: ComponentFixture<FormsLayoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, UiModule],
      declarations: [FormsLayoutsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
