import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatablesButtonsComponent } from './datatables-buttons.component';

describe('DatatablesButtonsComponent', () => {
  let component: DatatablesButtonsComponent;
  let fixture: ComponentFixture<DatatablesButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatatablesButtonsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatablesButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
