import { Component, HostBinding, Input, OnInit, TemplateRef } from '@angular/core';

type AllowedPrefixSuffix = string | TemplateRef<void> | (string | TemplateRef<void>)[];

@Component({
  selector: 'valor-launchpad-input-group',
  templateUrl: './input-group.component.html',
  styleUrls: ['./input-group.component.scss']
})
export class InputGroupComponent implements OnInit {
  @HostBinding('class.input-group') private basicClass = true;
  @HostBinding('class.input-group-lg') private get lg() {
    return this.vlSize === 'large';
  }
  @HostBinding('class.input-group-sm') private get sm() {
    return this.vlSize === 'small';
  }

  prefixes: (string | TemplateRef<void>)[]
  suffixes: (string | TemplateRef<void>)[]

  @Input() set vlPrefix(val: AllowedPrefixSuffix) {
    this.prefixes = this.mustArray(val);
  };
  @Input() set vlSuffix(val: AllowedPrefixSuffix) {
    this.suffixes =this.mustArray(val);
  }
  @Input() vlSize: 'large' | 'medium' | 'small' = 'medium';

  constructor() {}

  ngOnInit(): void {}

  isTemplate(val: string | TemplateRef<void>) {
    return val instanceof TemplateRef;
  }

  private mustArray<T>(val: T | T[]) {
    if (val === undefined || val === null) {
      return [] as T[];
    }
    return Array.isArray(val) ? val : [val];
  }

}
