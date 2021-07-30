import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownMegaMenuComponent } from './dropdown-mega-menu.component';

describe('DropdownMegaMenuComponent', () => {
  let component: DropdownMegaMenuComponent;
  let fixture: ComponentFixture<DropdownMegaMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownMegaMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownMegaMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
