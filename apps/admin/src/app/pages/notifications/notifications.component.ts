import {
  Component,
  Inject,
  LOCALE_ID,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';
import { NotificationsService } from './notifications.service';
import { DatePipe } from '@angular/common';
import {
  NOTIFICATION_TYPE_MAPPING,
  NotificationVo,
} from '@valor-launchpad/api-interfaces';
import { PaginationVo } from '@valor-launchpad/api-interfaces';

@Component({
  selector: 'valor-launchpad-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  @ViewChild('readField', { static: true }) readField: TemplateRef<any>;
  @ViewChild('contentField', { static: true }) contentField: TemplateRef<any>;
  columns: TableColumn[] = [];
  rows = [];
  pagination: PaginationVo = {
    pageIndex: 1,
    pageSize: 10,
    total: 1,
  };
  selectedRows: NotificationVo[] = [];
  onSelect(row: { selected: NotificationVo[] }) {
    this.selectedRows = row.selected;
  }
  rowClass = (row: NotificationVo) => ({
    active: this.selectedRows.find((sr) => sr.id === row.id),
  });

  constructor(
    private notificationsService: NotificationsService,
    @Inject(LOCALE_ID) private localeId: string
  ) {}

  ngOnInit(): void {
    this.columns = [
      {
        name: '',
        sortable: false,
        cellTemplate: this.readField,
        cellClass: 'd-flex align-items-center justify-content-center',
        width: 30,
        maxWidth: 30,
        resizeable: false,
      },
      {
        name: 'Content',
        sortable: false,
        cellTemplate: this.contentField,
        cellClass: 'd-flex align-items-center',
        resizeable: false,
      },
      {
        name: 'Date',
        prop: 'createdDate',
        sortable: false,
        pipe: new DatePipe(this.localeId),
        cellClass: 'd-flex align-items-center',
        resizeable: false,
        maxWidth: 120,
      },
      {
        name: 'Type',
        prop: 'type',
        sortable: false,
        cellClass: 'd-flex align-items-center',
        resizeable: false,
        maxWidth: 120,
        pipe: { transform: (val) => NOTIFICATION_TYPE_MAPPING[val].title },
      },
    ];
    this.setPage({ limit: 10, offset: 0 });
  }

  setPage(evt: { limit: number; offset: number }) {
    this.notificationsService
      .getNotifications(evt.offset + 1, evt.limit)
      .subscribe((pagedData) => {
        this.pagination = pagedData.page;
        this.rows = pagedData.data;
      });
  }
  markAsRead() {
    const selectIds = this.selectedRows.map((i) => i.id);
    this.notificationsService.markAsRead(selectIds).subscribe(() => {
      this.setPage({ limit: 10, offset: 0 });
    });
  }
}
