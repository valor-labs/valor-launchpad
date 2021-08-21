import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatablesMultiComponent } from './datatables-multi.component';

describe('DatatablesMultiComponent', () => {
  let component: DatatablesMultiComponent;
  let fixture: ComponentFixture<DatatablesMultiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatatablesMultiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatablesMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
