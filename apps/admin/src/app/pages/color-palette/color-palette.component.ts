import { Component } from '@angular/core';

@Component({
  selector: 'valor-launchpad-color-palette',
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.scss'],
})
export class ColorPaletteComponent {
  themeColors = [
    'Primary',
    'Secondary',
    'Success',
    'Info',
    'Warning',
    'Danger',
    'Light',
    'Dark',
  ];
  socialColors = [
    'Facebook',
    'Twitter',
    'Google',
    'YouTube',
    'Vimeo',
    'Dribbble',
    'GitHub',
    'Instagram',
    'Pinterest',
    'Flickr',
    'BitBucket',
    'WeChat',
    'Alibaba',
  ];
}
