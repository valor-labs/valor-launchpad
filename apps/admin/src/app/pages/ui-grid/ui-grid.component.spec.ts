import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiGridComponent } from './ui-grid.component';

describe('UiGridComponent', () => {
  let component: UiGridComponent;
  let fixture: ComponentFixture<UiGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
