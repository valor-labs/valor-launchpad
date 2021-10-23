import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatablesFixedHeaderComponent } from './datatables-fixed-header.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UiModule } from '@valor-launchpad/ui';
import { FormsModule } from '@angular/forms';

describe('DatatablesFixedHeaderComponent', () => {
  let component: DatatablesFixedHeaderComponent;
  let fixture: ComponentFixture<DatatablesFixedHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxDatatableModule, UiModule, FormsModule],
      declarations: [DatatablesFixedHeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatablesFixedHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
