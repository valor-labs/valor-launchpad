import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatablesMultiComponent } from './datatables-multi.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { UiModule } from '@valor-launchpad/ui';

describe('DatatablesMultiComponent', () => {
  let component: DatatablesMultiComponent;
  let fixture: ComponentFixture<DatatablesMultiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxDatatableModule, FormsModule, UiModule],
      declarations: [DatatablesMultiComponent],
    }).compileComponents();
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
