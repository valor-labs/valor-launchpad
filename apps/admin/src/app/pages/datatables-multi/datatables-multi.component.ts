import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { tableData } from './fakeData';
import { SelectionType, TableColumn } from '@swimlane/ngx-datatable';
import { CurrencyPipe, DatePipe } from '@angular/common';

class CustomDatePipe extends DatePipe {
  public transform(value): any {
    return super.transform(value, 'y/MM/dd');
  }
}


@Component({
  selector: 'valor-launchpad-datatables-multi',
  templateUrl: './datatables-multi.component.html',
  styleUrls: ['./datatables-multi.component.scss']
})
export class DatatablesMultiComponent implements OnInit {

  selected = [];
  SelectionType = SelectionType;

  constructor(
    @Inject(LOCALE_ID) private locale: string
  ) {
  }

  tableResponsiveData;
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
  rowClassFunc = (row) => ({
    'selected': row.selected === true
  });

  ngOnInit(): void {
    this.tableResponsiveData = tableData;
  }

  onChangeSearch(inputVal: string): void {
    if (inputVal === '') {
      this.tableResponsiveData = tableData;
    } else {
      this.tableResponsiveData = tableData.filter(rowData => Object.values(rowData).includes(inputVal));
    }
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }


}
