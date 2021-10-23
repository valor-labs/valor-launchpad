import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsAdvancedInputsComponent } from './forms-advanced-inputs.component';
import { UiModule } from '@valor-launchpad/ui';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxMaskModule } from 'ngx-mask';

describe('FormsAdvancedInputsComponent', () => {
  let component: FormsAdvancedInputsComponent;
  let fixture: ComponentFixture<FormsAdvancedInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UiModule,
        NgSelectModule,
        BsDatepickerModule.forRoot(),
        NgxMaskModule.forRoot(),
      ],
      declarations: [FormsAdvancedInputsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsAdvancedInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
