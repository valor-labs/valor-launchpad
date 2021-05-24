import {
  Component,
  HostBinding,
  OnInit,
  QueryList,
  ContentChildren,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { StepComponent } from '../step/step.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[valor-launchpad-steps]',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnChanges, OnInit {
  @Input() currentIndex = 0;
  @Output() currentIndexChange = new EventEmitter<number>();

  @ContentChildren(StepComponent, {descendants: true}) stepComponents: QueryList<StepComponent>;
  @HostBinding('class.nav') h = true;

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.currentIndex && !changes.currentIndex.firstChange) {
      this.stepComponents.forEach((cpn, index) => {
        if (this.currentIndex === index) {
          cpn.status = 'active';
        } else if (index < this.currentIndex) {
          cpn.status = 'done';
        } else {
          cpn.status = 'inactive';
        }
      });
    }
  }

  ngOnInit(): void {
    Promise.resolve().then(() => {
      this.stepComponents.forEach((cpn, index) => {
        if (this.currentIndex === index) {
          cpn.status = 'active';
        } else if (index < this.currentIndex) {
          cpn.status = 'done';
        } else {
          cpn.status = 'inactive';
        }
      });
    })
  }
}
