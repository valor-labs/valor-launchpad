import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable/lib/types/table-column.type';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { tableData } from './fakeData';

class CustomDatePipe extends DatePipe {
  public transform(value): any {
    return super.transform(value, 'y/MM/dd');
  }
}


@Component({
  selector: 'valor-launchpad-table-responsive',
  templateUrl: './table-responsive.component.html',
  styleUrls: ['./table-responsive.component.scss']
})
export class TableResponsiveComponent implements OnInit {

  @ViewChild('myTable') table: any;
  tableResponsiveData = tableData;
  pageNumLimit = 10;
  tableResponsiveColumns: Array<TableColumn> = [
    { name: 'Name', prop: 'name' },
    { name: 'Position', prop: 'position' },
    { name: 'Office', prop: 'office' },
    { name: 'Age', prop: 'age' },
    {
      name: 'Start date', prop: 'startDate', pipe: new CustomDatePipe(this.locale)
    },
    { name: 'Salary', prop: 'salary', pipe: new CurrencyPipe(this.locale) }
  ];

  constructor(
    @Inject(LOCALE_ID) private locale: string
  ) {
  }

  ngOnInit(): void {

  }

  onChangeSearch(inputVal: string): void {
    if (inputVal === '') {
      this.tableResponsiveData = tableData;
    } else {
      this.tableResponsiveData = tableData.filter(rowData => Object.values(rowData).includes(inputVal));
    }
  }

  toggleExpandRow(row): void {
    this.table.rowDetail.toggleExpandRow(row);
  }

}