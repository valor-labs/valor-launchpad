import { Component, Inject, LOCALE_ID, ViewChild, OnInit } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable/lib/types/table-column.type';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { tableData } from './fakeData';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import {
  dateEqualsQuery,
  equalsQuery,
  likeQuery,
} from '../../../core/utils/search-table';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'valor-launchpad-table-responsive',
  templateUrl: './table-responsive.component.html',
  styleUrls: ['./table-responsive.component.scss'],
})
export class TableResponsiveComponent implements OnInit {
  @ViewChild('myTable') table: DatatableComponent;
  tableResponsiveData = tableData;
  pageNumLimit = 10;
  pageLimitControl = new FormControl(10);
  tableResponsiveColumns: Array<TableColumn> = [
    { name: 'Name', prop: 'name' },
    { name: 'Position', prop: 'position' },
    { name: 'Office', prop: 'office' },
    { name: 'Age', prop: 'age' },
    {
      name: 'Start date',
      prop: 'startDate',
      pipe: {
        transform: (val) => new DatePipe(this.locale).transform(val, 'MM/dd/y'),
      },
    },
    { name: 'Salary', prop: 'salary', pipe: new CurrencyPipe(this.locale) },
  ];

  constructor(@Inject(LOCALE_ID) private locale: string) {}

  ngOnInit(): void {
    this.pageLimitControl.valueChanges.subscribe((limit) => {
      this.pageNumLimit = parseInt(limit, 10);
    });
  }

  onChangeSearch(inputVal: string): void {
    if (inputVal === '') {
      this.tableResponsiveData = tableData;
    } else {
      this.tableResponsiveData = tableData.filter((rowData) => {
        return (
          likeQuery(rowData.name, inputVal) ||
          equalsQuery(rowData.age, inputVal) ||
          likeQuery(rowData.position, inputVal) ||
          likeQuery(rowData.office, inputVal) ||
          equalsQuery(rowData.salary, inputVal) ||
          dateEqualsQuery(rowData.startDate, inputVal)
        );
      });
    }
  }

  toggleExpandRow(row): void {
    this.table.rowDetail.toggleExpandRow(row);
  }
}
