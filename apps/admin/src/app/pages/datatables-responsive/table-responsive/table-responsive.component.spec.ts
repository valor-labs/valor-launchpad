import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableResponsiveComponent } from './table-responsive.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UiModule } from '@valor-launchpad/ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('TableResponsiveComponent', () => {
  let component: TableResponsiveComponent;
  let fixture: ComponentFixture<TableResponsiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxDatatableModule, UiModule, FormsModule, ReactiveFormsModule],
      declarations: [TableResponsiveComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableResponsiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
