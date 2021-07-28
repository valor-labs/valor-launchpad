import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorSlateComponent } from './editor-slate.component';

describe('EditorSlateComponent', () => {
  let component: EditorSlateComponent;
  let fixture: ComponentFixture<EditorSlateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorSlateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorSlateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
