import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../../../apps/admin/src/app/core/auth/auth.service';

@Component({
  selector: 'valor-launchpad-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  @Input()
  src: string = null;

  @Input()
  alt: string;

  @Input()
  classes;

  @Input()
  size: 'sm' | 'md' | 'lg' | 'xl' = 'md';


  @Input()
  width: number = null;

  @Input()
  height: number = null;

  constructor(
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {
    if (this.width !== null && this.height !== null) {
      if (this.width !== this.height) {
        this.height = this.width;
      }
    } else {
      this.classes = this.classes + ' ' + this.size;
    }
  }

  getInitialChar(name: string): string {
    return name.charAt(0);
  }

  getFontSize(): number {
    if (this.width !== null && this.height !== null) {
      return this.width / 2;
    }
  }

}
