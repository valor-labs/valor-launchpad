import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatablesColumnSearchComponent } from './datatables-column-search.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UiModule } from '@valor-launchpad/ui';
import { FormsModule } from '@angular/forms';

describe('DatatablesColumnSearchComponent', () => {
  let component: DatatablesColumnSearchComponent;
  let fixture: ComponentFixture<DatatablesColumnSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxDatatableModule, UiModule, FormsModule],
      declarations: [DatatablesColumnSearchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatablesColumnSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
