import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  LOCALE_ID,
  OnInit,
  ViewChild,
} from '@angular/core';
import { tableData } from './fakeData';
import { TableColumn } from '@swimlane/ngx-datatable';
import { CurrencyPipe, DatePipe } from '@angular/common';

class CustomDatePipe extends DatePipe {
  public transform(value): any {
    return super.transform(value, 'y/MM/dd');
  }
}

@Component({
  selector: 'valor-launchpad-datatables-multi',
  templateUrl: './datatables-multi.component.html',
  styleUrls: ['./datatables-multi.component.scss'],
})
export class DatatablesMultiComponent implements OnInit, AfterViewInit {
  @ViewChild('myTable', { static: false }) datatable: any;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private cd: ChangeDetectorRef
  ) {}

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
  rowClassFunc = (row) => ({
    active: row.selected === true,
  });

  ngOnInit(): void {
    this.tableResponsiveData = tableData.map((item) =>
      Object.assign({}, item, {
        selected: false,
      })
    );
  }

  ngAfterViewInit() {
    this.datatable.bodyComponent.toggleAllRows(true);
    this.datatable.bodyComponent.rows;
  }

  onSelectRow(detail) {
    if (!detail || detail.length === 0) {
      return;
    }
    setTimeout(() => {
      detail.forEach((item) => {
        item.selected = true;
        this.tableResponsiveData = [...this.tableResponsiveData];
        this.cd.detectChanges();
      });
    }, 200);
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

  onClickTable($ev: {
    type: 'keydown' | 'click' | 'dblclick';
    row: { [key: string]: any };
  }) {
    if ($ev.type === 'click') {
      $ev.row.selected = !$ev.row.selected;
    }
  }
}
