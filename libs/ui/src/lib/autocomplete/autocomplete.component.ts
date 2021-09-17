import { Component, ContentChild, ContentChildren, OnInit, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { AutocompleteOptionComponent } from './autocomplete-option/autocomplete-option.component';
import { switchMap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { AutocompleteContentDirective } from './autocomplete-content.directive';

@Component({
  selector: 'valor-launchpad-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  exportAs: 'valorLaunchpadAutoComplete'
})
export class AutocompleteComponent implements OnInit {
  @ViewChild('root') rootTemplate: TemplateRef<any>;
  @ContentChild(AutocompleteContentDirective) content: AutocompleteContentDirective;

  @ContentChildren(AutocompleteOptionComponent) options: QueryList<AutocompleteOptionComponent>
  optionsClick() {
    return this.options.changes.pipe(
      switchMap(options => {
        const click$ = options.map(option => option.click$);
        return merge(...click$);
      })
    )
  }

  constructor() { }

  ngOnInit(): void {
  }

}
