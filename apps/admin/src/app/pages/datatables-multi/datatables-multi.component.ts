import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { tableData } from './fakeData';
import { SelectionType, TableColumn } from '@swimlane/ngx-datatable';
import { CurrencyPipe, DatePipe } from '@angular/common';
import {
  dateEqualsQuery,
  equalsQuery,
  likeQuery,
} from '../../core/utils/search-table';

@Component({
  selector: 'valor-launchpad-datatables-multi',
  templateUrl: './datatables-multi.component.html',
  styleUrls: ['./datatables-multi.component.scss'],
})
export class DatatablesMultiComponent implements OnInit {
  selected = [];
  SelectionType = SelectionType;

  constructor(@Inject(LOCALE_ID) private locale: string) {}

  tableResponsiveData;
  pageNumLimit = 10;
  tableResponsiveColumns: Array<TableColumn> = [
    { name: 'Name', prop: 'name', cellClass: 'd-flex align-items-center' },
    {
      name: 'Position',
      prop: 'position',
      cellClass: 'd-flex align-items-center',
    },
    { name: 'Office', prop: 'office', cellClass: 'd-flex align-items-center' },
    { name: 'Age', prop: 'age', cellClass: 'd-flex align-items-center' },
    {
      name: 'Start date',
      prop: 'startDate',
      pipe: {
        transform: (val) => new DatePipe(this.locale).transform(val, 'MM/dd/y'),
      },
      cellClass: 'd-flex align-items-center',
    },
    {
      name: 'Salary',
      prop: 'salary',
      pipe: new CurrencyPipe(this.locale),
      cellClass: 'd-flex align-items-center',
    },
  ];
  rowClassFunc = (row) => ({
    selected: row.selected === true,
  });

  ngOnInit(): void {
    this.tableResponsiveData = tableData;
  }

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

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
}
