import { Component, Input, OnInit } from '@angular/core';
import { IStory } from '../dashboard-social.model';

@Component({
  selector: 'valor-launchpad-social-story',
  templateUrl: './social-story.component.html',
  styleUrls: ['./social-story.component.css']
})
export class SocialStoryComponent implements OnInit {
  @Input() story: IStory;
  constructor() {
  }

  ngOnInit(): void {
  }

}
