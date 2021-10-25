import { Component } from '@angular/core';

interface ChangeLog {
  version: string;
  date: string;
  changes: string[];
}

@Component({
  selector: 'valor-launchpad-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss'],
})
export class ChangelogComponent {
  changelogs: ChangeLog[] = [
    {
      version: 'v0.0.1-alpha1',
      date: 'October 29, 2021',
      changes: ['Initial Release'],
    },
  ];
}
