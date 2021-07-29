import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownActionComponent } from './dropdown-action.component';

describe('DropdownActionComponent', () => {
  let component: DropdownActionComponent;
  let fixture: ComponentFixture<DropdownActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
