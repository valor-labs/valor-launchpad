import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'valor-launchpad-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges{
    @Input() totalItems:number = 5;

    @Input() disabled:boolean = false;
  
    @Input() itemPage:number = 5;

    @Input() isEntriesShow:boolean = false;

    @Output() 
    public pageChanged =  new EventEmitter();

    public currentPage: number;

    constructor() {
    }

    ngOnInit(): void {
        this.currentPage = 1;
    }

    ngOnChanges() {
    }

    onPageChanged(event: PageChangedEvent): void {
        this.pageChanged.emit(event);
        this.currentPage = event.page;
    }
}
