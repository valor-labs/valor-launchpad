import { Component, Input, OnInit } from '@angular/core';

export type videoAspect = '21:9' | '1:1' | '16:9' | '4:3';

@Component({
  selector: 'valor-launchpad-embed-video',
  templateUrl: './embed-video.component.html',
  styleUrls: ['./embed-video.component.scss']
})
export class EmbedVideoComponent implements OnInit {
  constructor() {
  }


  ngOnInit(): void {
  }

  @Input() videoAspect: videoAspect = '21:9';
  @Input() videoUrl: string;


}
