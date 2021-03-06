import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'valor-launchpad-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit, OnDestroy {
  @ViewChild('dropdownTrigger', { static: true }) dropdownTrigger: ElementRef;

  @Input()
  direction: string = 'end';

  @Input()
  classes: string;

  @Input()
  size: '' | 'lg' = '';

  show = false;

  constructor() {
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  toggleDropdown(e) {
    e.preventDefault();
    this.show = !this.show;
  }

  ngOnInit() {
    document.addEventListener('click', this.handleClickOutside);
  }

  handleClickOutside(e) {
    if (
      !this.dropdownTrigger ||
      this.dropdownTrigger.nativeElement.contains(e.target as HTMLElement)
    ) {
      return;
    }
    this.show = false;
  }
}
