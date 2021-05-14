import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'valor-launchpad-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  @Input()
  classes;

  @Input()
  size: "sm" | "md" | "lg" | "xl" = "md";

  @Input()
  src;

  @Input()
  alt;

  constructor() {
  }

  ngOnInit(): void {
    this.classes = this.classes + " "+this.size;
  }

}
