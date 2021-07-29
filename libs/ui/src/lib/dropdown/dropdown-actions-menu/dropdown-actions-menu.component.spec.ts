import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownActionsMenuComponent } from './dropdown-actions-menu.component';

describe('DropdownActionsMenuComponent', () => {
  let component: DropdownActionsMenuComponent;
  let fixture: ComponentFixture<DropdownActionsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownActionsMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownActionsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
