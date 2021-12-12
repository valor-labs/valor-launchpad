import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { fromEvent } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Component({
  selector: 'valor-launchpad-autocomplete-option',
  templateUrl: './autocomplete-option.component.html',
  styleUrls: ['./autocomplete-option.component.scss']
})
export class AutocompleteOptionComponent implements OnInit {


  @Input() value: string;
  click$: Observable<string>
  constructor(
    private host: ElementRef
  ) { }

  ngOnInit(): void {
    this.click$ = fromEvent(this.element, 'click')
      .pipe(
        mapTo(this.value)
      )
  }

  get element(): HTMLElement {
    return this.host.nativeElement;
  }
}
