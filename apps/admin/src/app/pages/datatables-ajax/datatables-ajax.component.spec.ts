import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatablesAjaxComponent } from './datatables-ajax.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { UiModule } from '@valor-launchpad/ui';

describe('DatatablesAjaxComponent', () => {
  let component: DatatablesAjaxComponent;
  let fixture: ComponentFixture<DatatablesAjaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxDatatableModule, FormsModule, UiModule],
      declarations: [DatatablesAjaxComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatablesAjaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
