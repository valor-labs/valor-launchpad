import { Component, OnInit } from '@angular/core';
import {
  Action,
  TableColumns,
  ClientVo,
} from '@valor-launchpad/api-interfaces';
import { map } from 'rxjs/operators';

import { ClientsService } from './clients-service';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { likeQuery } from '../../core/utils/search-table';

const DEFAULT_SELECTED = 'Choose...';

export enum StatusType {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  DELETED = 'Deleted',
}

export enum StatusColor {
  SUCCESS = 'success',
  WARNING = 'warning',
  DANGER = 'danger',
}

@Component({
  selector: 'valor-launchpad-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  itemsPerPage: number;
  paginationTableData = [];
  currentPage: number;
  clientName: string;

  searchTableData = [];
  isShow: boolean;
  selectData: ClientVo;
  isLoading: boolean;

  entries = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  tableColumns: TableColumns = [
    { title: '#', key: 'id' },
    { title: 'Name', key: 'name' },
    { title: 'Company', key: 'company' },
    { title: 'Email', key: 'email' },
    { title: 'Status', key: 'status' },
  ];

  tableData: ClientVo[];

  profileKeys = ['name', 'company', 'email', 'phone', 'status'];

  actions1: Action[] = [
    {
      label: 'Action',
      link: '#',
    },
    { label: 'Another action', link: '#' },
    { label: 'Something else here', link: '#' },
  ];

  actions2: Action[] = [
    {
      label: 'Action',
      link: '#',
    },
    { label: 'Another action', link: '#' },
    { label: 'Something else here', link: '#' },
  ];

  constructor(private clientsService: ClientsService) {}

  ngOnInit(): void {
    dayjs.extend(relativeTime);
    this.isLoading = true;
    this.initTable();
  }

  initTable() {
    this.clientsService
      .getClients()
      .pipe(
        map((data) => {
          data.forEach((item) => {
            item[
              'id'
            ] = `<img src=${item.avatar} width="32" height="32" class="rounded-circle my-n1" alt="Avatar">`;
            item.status = `<span class="badge bg-${this.statusColor(
              item.status
            )}">${item.status}</span>`;
            item.timeline.forEach((el) => {
              el.time = dayjs(el.time).fromNow();
            });
          });
          return data;
        })
      )
      .subscribe((res) => {
        this.isLoading = false;
        this.tableData = res;
        this.searchTableData = this.tableData;
        this.currentPage = 1;
        this.paginationTableData = this.searchTableData.slice(
          0,
          this.itemsPerPage
        );
        this.itemsPerPage = this.paginationTableData.length;
        this.isShow = true;
        this.selectData = res[0];
      });
  }

  statusColor(status) {
    if (status === StatusType.ACTIVE) {
      return StatusColor.SUCCESS;
    } else if (status === StatusType.INACTIVE) {
      return StatusColor.WARNING;
    } else if (status === StatusType.DELETED) {
      return StatusColor.DANGER;
    }
  }

  onPageChanged(event) {
    this.currentPage = event.page;
    this.paginationTableData = this.getPaginationTableData(
      this.searchTableData,
      event.page,
      event.itemsPerPage
    );
  }

  handleRowSelected(event) {
    this.selectData = event;
  }

  onSelectChange(event) {
    this.itemsPerPage = event;
    if (event === DEFAULT_SELECTED) {
      this.itemsPerPage = this.entries[this.entries.length - 1];
    }
    if (
      this.currentPage >
      Math.ceil(this.searchTableData.length / this.itemsPerPage)
    ) {
      this.currentPage = Math.ceil(
        this.searchTableData.length / this.itemsPerPage
      );
    }
    this.paginationTableData = this.getPaginationTableData(
      this.searchTableData,
      this.currentPage,
      this.itemsPerPage
    );
  }

  searchClient(event) {
    if (this.clientName === '') {
      this.searchTableData = this.tableData;
    } else {
      this.searchTableData = this.tableData.filter((item) => {
        return (
          likeQuery(item.name, event) ||
          likeQuery(item.company, event) ||
          likeQuery(item.email, event) ||
          likeQuery(item.status, event)
        );
      });
    }

    this.paginationTableData = this.getPaginationTableData(
      this.searchTableData,
      this.currentPage,
      this.itemsPerPage
    );
  }

  getPaginationTableData(data, currentPage, perPage) {
    return data.slice((currentPage - 1) * perPage, currentPage * perPage);
  }
}
