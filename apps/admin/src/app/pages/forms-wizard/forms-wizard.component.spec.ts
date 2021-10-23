import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsWizardComponent } from './forms-wizard.component';
import { UiModule } from '@valor-launchpad/ui';
import { ReactiveFormsModule } from '@angular/forms';

describe('FormsWizardComponent', () => {
  let component: FormsWizardComponent;
  let fixture: ComponentFixture<FormsWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiModule, ReactiveFormsModule],
      declarations: [FormsWizardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
