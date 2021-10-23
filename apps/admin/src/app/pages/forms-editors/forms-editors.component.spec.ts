import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsEditorsComponent } from './forms-editors.component';
import { UiModule } from '@valor-launchpad/ui';
import { SlateModule } from 'slate-angular';

describe('FormsEditorsComponent', () => {
  let component: FormsEditorsComponent;
  let fixture: ComponentFixture<FormsEditorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiModule, SlateModule],
      declarations: [FormsEditorsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsEditorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
