import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatablesFixedHeaderComponent } from './datatables-fixed-header.component';

describe('DatatablesFixedHeaderComponent', () => {
  let component: DatatablesFixedHeaderComponent;
  let fixture: ComponentFixture<DatatablesFixedHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatatablesFixedHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatablesFixedHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
