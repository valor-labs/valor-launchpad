import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiOffCanvasComponent } from './ui-offcanvas.component';

describe('UiOffCanvasComponent', () => {
  let component: UiOffCanvasComponent;
  let fixture: ComponentFixture<UiOffCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiOffCanvasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiOffCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
