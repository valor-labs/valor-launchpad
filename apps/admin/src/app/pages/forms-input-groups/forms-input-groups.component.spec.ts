import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsInputGroupsComponent } from './forms-input-groups.component';
import { UiModule } from '@valor-launchpad/ui';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FormsInputGroupsComponent', () => {
  let component: FormsInputGroupsComponent;
  let fixture: ComponentFixture<FormsInputGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiModule, BsDropdownModule.forRoot(), NoopAnimationsModule],
      declarations: [FormsInputGroupsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsInputGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
