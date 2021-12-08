import { Component, Inject, LOCALE_ID } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable/lib/types/table-column.type';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { tableData } from './fakeData';

@Component({
  selector: 'valor-launchpad-datatables-ajax',
  templateUrl: './datatables-ajax.component.html',
  styleUrls: ['./datatables-ajax.component.scss'],
})
export class DatatablesAjaxComponent {
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
      this.tableResponsiveData = tableData.filter((rowData) =>
        Object.values(rowData).includes(inputVal)
      );
    }
  }
}
