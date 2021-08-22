import { AfterViewInit, Component, HostListener, Inject, LOCALE_ID, OnInit } from '@angular/core';
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
  styleUrls: ['./datatables-fixed-header.component.scss']
})
export class DatatablesFixedHeaderComponent implements OnInit, AfterViewInit {

  tableResponsiveData;
  pageNumLimit = 25;
  transformPoint: number;
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

  tableClass = {
    'fix-header': false
  };

  constructor(
    @Inject(LOCALE_ID) private locale: string
  ) {
  }

  ngOnInit(): void {
    this.tableResponsiveData = tableData;
  }

  ngAfterViewInit(): void {
    const headerDom: HTMLElement = document.querySelector('.datatable-header');
    this.transformPoint = headerDom
      .getBoundingClientRect()
      .top - headerDom.offsetHeight;
  }

  @HostListener('window:scroll', ['$event'])
  onScrollEvent($event) {
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
      this.tableResponsiveData = tableData.filter(rowData => Object.values(rowData).includes(inputVal));
    }
  }

}
