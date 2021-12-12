import {Component, Input, OnInit} from '@angular/core';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const sizeMap: Record<AvatarSize, number> = {
  xs: 20,
  sm: 28,
  md: 34,
  lg: 40,
  xl: 56,
}
@Component({
    selector: 'valor-launchpad-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

    @Input()
    src: string;

    @Input()
    alt: string;

    @Input()
    classes = '';

    @Input()
    size: AvatarSize = null;


    @Input()
    width: number = null;

    @Input()
    height: number = null;

    @Input()
    firstName: string;

    @Input()
    lastName: string;

    @Input()
    squared = false;

    ngOnInit(): void {
      if (this.size !== null) {
        this.classes = this.classes + ' ' + this.size;
      }
    }

    getInitialChar(name: string): string {
        return name?.charAt(0);
    }

    getFontSize(): number {
        if (this.width !== null && this.height !== null) {
            return this.width / 2;
        } else if (this.size) {
          return sizeMap[this.size] / 2;
        } else {
          return 0;
        }
    }

    onInvalidSrc() {
        this.src = null;
    }

}
