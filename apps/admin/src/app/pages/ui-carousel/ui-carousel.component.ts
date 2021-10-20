import { Component } from '@angular/core';

@Component({
  selector: 'valor-launchpad-ui-carousel',
  templateUrl: './ui-carousel.component.html',
  styleUrls: ['./ui-carousel.component.scss'],
})
export class UiCarouselComponent {
  normalList = [
    {
      imgUrl: 'assets/img/photos/unsplash-1.jpg',
    },
    {
      imgUrl: 'assets/img/photos/unsplash-2.jpg',
    },
    {
      imgUrl: 'assets/img/photos/unsplash-3.jpg',
    },
  ];

  captionList = [
    {
      title: 'First slide label',
      content: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
      imgUrl: 'assets/img/photos/unsplash-1.jpg',
    },
    {
      title: 'Second slide label',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imgUrl: 'assets/img/photos/unsplash-2.jpg',
    },
    {
      title: 'First slide label',
      content:
        'Praesent commodo cursus magna, vel scelerisque nisl consectetur.',
      imgUrl: 'assets/img/photos/unsplash-3.jpg',
    },
  ];
}
