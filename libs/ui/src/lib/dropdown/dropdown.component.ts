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
  @ViewChild('dropdownTripper', { static: true }) dropdownTripper: ElementRef;

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
    this.show = !this.show;
  }

  ngOnInit() {
    document.addEventListener('click', this.handleClickOutside);
  }

  handleClickOutside(e) {
    if (
      !this.dropdownTripper ||
      this.dropdownTripper.nativeElement.contains(e.target as HTMLElement)
    ) {
      return;
    }
    this.show = false;
  }
}
