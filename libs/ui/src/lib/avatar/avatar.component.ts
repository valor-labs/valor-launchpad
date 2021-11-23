import {Component, Input, OnInit} from '@angular/core';

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
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = null;


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
        } else {
          return 0;
        }
    }

    onInvalidSrc() {
        this.src = null;
    }

}
