import { Component } from '@angular/core';

@Component({
  selector: 'valor-launchpad-ui-carousel',
  templateUrl: './ui-carousel.component.html',
  styleUrls: ['./ui-carousel.component.scss']
})
export class UiCarouselComponent {

  controls = false

  handleClick() {
    console.log(123, this.controls);
    this.controls = !this.controls
  }
}
