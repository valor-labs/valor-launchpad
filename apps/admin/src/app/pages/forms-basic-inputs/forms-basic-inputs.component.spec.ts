import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsBasicInputsComponent } from './forms-basic-inputs.component';

describe('FormsBasicInputsComponent', () => {
  let component: FormsBasicInputsComponent;
  let fixture: ComponentFixture<FormsBasicInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsBasicInputsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsBasicInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
