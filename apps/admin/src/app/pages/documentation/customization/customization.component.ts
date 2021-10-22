import { Component } from '@angular/core';

@Component({
  selector: 'valor-launchpad-customization',
  templateUrl: './customization.component.html',
  styleUrls: ['./customization.component.css'],
})
export class CustomizationComponent {
  lightMode = `<link href="{PATH}/dist/css/light.css" rel="stylesheet">`;
  darkMode = `<link href="{PATH}/dist/css/dark.css" rel="stylesheet">`;
  options = `<body data-theme="default" data-layout="fluid" data-sidebar-position="left" data-sidebar-behavior="sticky">`;
}
