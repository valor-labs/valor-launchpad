import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorSlateButtonComponent } from './editor-slate-button.component';

describe('EditorSlateButtonComponent', () => {
  let component: EditorSlateButtonComponent;
  let fixture: ComponentFixture<EditorSlateButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorSlateButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorSlateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
