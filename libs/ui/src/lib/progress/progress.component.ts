import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'valor-launchpad-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {
  @Input()
  value;

  constructor() { }

  ngOnInit(): void {
  }

}
