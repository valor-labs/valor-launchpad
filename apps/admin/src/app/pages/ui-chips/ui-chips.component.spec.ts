import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiChipsComponent } from './ui-chips.component';
import { UiModule } from '@valor-launchpad/ui';
import { TagInputModule } from 'ngx-chips';
import { FormsModule } from '@angular/forms';

describe('UiChipsComponent', () => {
  let component: UiChipsComponent;
  let fixture: ComponentFixture<UiChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiModule, TagInputModule, FormsModule],
      declarations: [UiChipsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
