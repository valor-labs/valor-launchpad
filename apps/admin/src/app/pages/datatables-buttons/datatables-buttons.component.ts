import { Component, Inject, LOCALE_ID } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable/lib/types/table-column.type';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { tableData } from './fakeData';
import {
  dateEqualsQuery,
  equalsQuery,
  likeQuery,
} from '../../core/utils/search-table';

@Component({
  selector: 'valor-launchpad-datatables-buttons',
  templateUrl: './datatables-buttons.component.html',
  styleUrls: ['./datatables-buttons.component.scss'],
})
export class DatatablesButtonsComponent {
  tableResponsiveData = tableData;

  pageNumLimit = 10;
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

  onChangeSearch(inputVal: string): void {
    if (inputVal === '') {
      this.tableResponsiveData = tableData;
    } else {
      this.tableResponsiveData = tableData.filter(
        (rowData) =>
          likeQuery(rowData.name, inputVal) ||
          equalsQuery(rowData.age, inputVal) ||
          likeQuery(rowData.position, inputVal) ||
          likeQuery(rowData.office, inputVal) ||
          equalsQuery(rowData.salary, inputVal) ||
          dateEqualsQuery(rowData.startDate, inputVal)
      );
    }
  }
}
