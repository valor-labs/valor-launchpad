import { Component, EventEmitter, OnInit, Output } from '@angular/core';

const defaultSrc = 'assets/img/avatars/avatar.jpg';

@Component({
  selector: 'valor-launchpad-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent {
  @Output() selectImage = new EventEmitter<string>();

  previewSrc = defaultSrc;

  triggerFilePicker(input: HTMLInputElement) {
    input.click();
  }

  onPick(fileInput: HTMLInputElement) {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = (result) => {
      const src = result.target.result as string;
      this.previewSrc = src;
      this.selectImage.emit(src);
    };
    reader.readAsDataURL(file);
  }
}
