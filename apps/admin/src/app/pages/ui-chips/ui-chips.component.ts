import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'valor-launchpad-ui-chips',
  templateUrl: './ui-chips.component.html',
  styleUrls: ['./ui-chips.component.scss'],
})
export class UiChipsComponent {
  tags = ['Unremovable', 'Tag 2', 'Tag 3'];
  inputVisible = false;
  inputValue = '';
  items = ['Javascript', 'Typescript'];
  itemsAsObjects = [
    { id: 0, name: 'Angular', readonly: true },
    { id: 1, name: 'React' },
  ];
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;

  handleClose(removedTag: string): void {
    this.tags = this.tags.filter((tag) => tag !== removedTag);
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement?.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(): void {
    if (this.inputValue && this.tags.indexOf(this.inputValue) === -1) {
      this.tags = [...this.tags, this.inputValue];
    }
    this.inputValue = '';
    this.inputVisible = false;
  }

  public onSelect(item) {
    console.log('tag selected: value is ' + item);
  }
}
