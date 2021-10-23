import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatablesButtonsComponent } from './datatables-buttons.component';
import { UiModule } from '@valor-launchpad/ui';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

describe('DatatablesButtonsComponent', () => {
  let component: DatatablesButtonsComponent;
  let fixture: ComponentFixture<DatatablesButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiModule, NgxDatatableModule],
      declarations: [DatatablesButtonsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatablesButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
