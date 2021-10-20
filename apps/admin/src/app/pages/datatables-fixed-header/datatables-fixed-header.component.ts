import {
  AfterViewInit,
  Component,
  HostListener,
  Inject,
  LOCALE_ID,
  OnInit,
} from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { tableData } from '../datatables-multi/fakeData';

class CustomDatePipe extends DatePipe {
  public transform(value): any {
    return super.transform(value, 'y/MM/dd');
  }
}

@Component({
  selector: 'valor-launchpad-datatables-fixed-header',
  templateUrl: './datatables-fixed-header.component.html',
  styleUrls: ['./datatables-fixed-header.component.scss'],
})
export class DatatablesFixedHeaderComponent implements OnInit, AfterViewInit {
  tableResponsiveData;
  pageNumLimit = 25;
  transformPoint = 385;
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
      pipe: new CustomDatePipe(this.locale),
      cellClass: 'd-flex align-items-center',
    },
    {
      name: 'Salary',
      prop: 'salary',
      pipe: new CurrencyPipe(this.locale),
      cellClass: 'd-flex align-items-center',
    },
  ];

  tableClass = {
    'fix-header': false,
  };

  constructor(@Inject(LOCALE_ID) private locale: string) {}

  ngOnInit(): void {
    this.tableResponsiveData = tableData;
  }

  ngAfterViewInit() {
    this.onScrollEvent();
  }

  @HostListener('window:scroll', ['$event'])
  onScrollEvent() {
    if (window.scrollY >= this.transformPoint) {
      this.tableClass['fix-header'] = true;
    } else {
      this.tableClass['fix-header'] = false;
    }
  }

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
