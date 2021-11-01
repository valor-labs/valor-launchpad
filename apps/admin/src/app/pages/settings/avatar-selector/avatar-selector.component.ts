import { Component, EventEmitter, Output } from '@angular/core';
import { ProfileService } from '../../profile/profile.service';

@Component({
  selector: 'valor-launchpad-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent {
  previewSrc = null;
  $profile = this.profileService.getProfile();
  @Output() selectImage = new EventEmitter<File>();

  constructor(private profileService: ProfileService) {}

  triggerFilePicker(input: HTMLInputElement) {
    input.click();
  }

  onPick(fileInput: HTMLInputElement) {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = (result) => {
      const src = result.target.result as string;
      this.previewSrc = src;
      this.selectImage.emit(file);
    };
    reader.readAsDataURL(file);
  }
}
