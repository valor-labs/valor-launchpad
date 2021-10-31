import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Media } from '@api/projects';
import { ProfileService } from '../../profile/profile.service';

// const defaultSrc = 'assets/img/avatars/avatar.jpg';

@Component({
  selector: 'valor-launchpad-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent implements OnInit {
  previewSrc = null;
  $profile = this.profileService.getProfile();

  constructor(private profileService: ProfileService) {}

  ngOnInit() {}

  @Output() selectImage = new EventEmitter<File>();

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
