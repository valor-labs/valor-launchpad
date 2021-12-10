import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Action, STATUS_MAPPING } from '@valor-launchpad/api-interfaces';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';

export enum SortRange {
  TITLES = 'Title',
  DESCRIPTION = 'Description',
  BODY = 'Body',
  STATUS = 'Status',
  PROGRESS = 'Progress',
}

export class status {
  label: string;
  value: string;
}
@Component({
  selector: 'valor-launchpad-project-list-filter',
  templateUrl: './project-list-filter.component.html',
  styleUrls: ['./project-list-filter.component.scss'],
})
export class ProjectListFilterComponent implements OnInit {
  @ViewChild('dropdown') dropdown: BsDropdownDirective;
  keywordControl = new FormControl('');
  progressFg = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  sort = 'Sort By';
  allStatusOptions: status[] = [];

  statusFilter = new Set<string>();
  @Output()
  sortRange = new EventEmitter();

  @Output()
  statusSelected = new EventEmitter();

  @Output()
  progress = new EventEmitter();

  @Output()
  searchKeyWord = new EventEmitter();

  sortRangeActions: Action[] = [
    {
      label: SortRange.TITLES,
      event: () => {
        this.sort = SortRange.TITLES;
        this.sortRange.emit(this.sort.toLowerCase());
      },
    },
    {
      label: SortRange.DESCRIPTION,
      event: () => {
        this.sort = SortRange.BODY;
        this.sortRange.emit(this.sort.toLowerCase());
      },
    },
    {
      label: SortRange.STATUS,
      event: () => {
        this.sort = SortRange.STATUS;
        this.sortRange.emit(this.sort.toLowerCase());
      },
    },
    {
      label: SortRange.PROGRESS,
      event: () => {
        this.sort = SortRange.PROGRESS;
        this.sortRange.emit(this.sort.toLowerCase());
      },
    },
  ];

  ngOnInit() {
    this.initFilter();
  }

  initFilter() {
    Object.keys(STATUS_MAPPING).forEach((item) => {
      this.allStatusOptions.push({
        label: STATUS_MAPPING[item].label,
        value: item,
      });
    });

    this.keywordControl.valueChanges.subscribe((res) => {
      this.searchKeyWord.emit(res);
    });
  }

  onFilterStatus(status) {
    if (this.statusFilter.has(status)) {
      this.statusFilter.delete(status);
    } else {
      this.statusFilter.add(status);
    }
    this.statusSelected.emit(this.statusFilter);
  }

  handleSaveProgress() {
    this.progress.emit(this.progressFg.value);
    this.dropdown.hide();
  }
}
