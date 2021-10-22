import { Component, Input } from '@angular/core';
import { IStory } from '../dashboard-social.model';
import { DashboardSocialService } from '../dashboard-social.service';

@Component({
  selector: 'valor-launchpad-social-story',
  templateUrl: './social-story.component.html',
  styleUrls: ['./social-story.component.css'],
})
export class SocialStoryComponent {
  @Input() story: IStory;

  constructor(private dashboardSocialService: DashboardSocialService) {}

  likeStory() {
    this.dashboardSocialService.likeStory(this.story.id).subscribe(() => {
      this.story.likedByYou = true;
    });
  }

  unlikeStory() {
    this.dashboardSocialService.unlikeStory(this.story.id).subscribe(() => {
      this.story.likedByYou = false;
    });
  }
}
