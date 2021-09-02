import {
  Component,
  ElementRef,
  EventEmitter, HostBinding,
  Input,
  OnInit, Output,
  QueryList,
  Renderer2, ViewChildren
} from '@angular/core';
import { VLWizardTheme } from './wizard.model';
import { StepComponent } from './step/step.component';
import { from, Observable, of } from 'rxjs';

interface VLWizardStep {
  mainTitle: string;
  description: string;
}

@Component({
  selector: 'valor-launchpad-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
})
export class WizardComponent implements OnInit {
  @HostBinding('class.wizard')
  @HostBinding('class.mb-4')
  @HostBinding('class.sw')
  @HostBinding('class.sw-justified')
  basicClass = true;

  @Input() currentIndex = 0;
  @Output() currentIndexChange = new EventEmitter<number>();

  @Input() steps: VLWizardStep[];

  @Input() colorTheme: VLWizardTheme = 'primary';
  @Input() styleTheme: 'default' | 'arrows' = 'default';

  /**
   * Must be arrow function
   * only when returning true / true-observable / true-promise, the wizard will go to next
   */
  @Input() onBeforeNext: () => boolean | Observable<boolean> | Promise<boolean>;

  @ViewChildren(StepComponent) private stepComponents: QueryList<StepComponent>;

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.addClass(this.el.nativeElement, `wizard-${this.colorTheme}`);
    this.renderer.addClass(this.el.nativeElement, `sw-theme-${this.styleTheme}`);
  }

  prev() {
    this.currentIndex -= 1;
    this.currentIndexChange.emit(this.currentIndex);
  }

  next() {
    let goOrNoGo: Observable<boolean>;
    const res = this.onBeforeNext && this.onBeforeNext();
    if (typeof res === 'boolean') {
      goOrNoGo = of(res);
    } else if (res instanceof Observable) {
      goOrNoGo = res;
    } else if (res instanceof Promise) {
      goOrNoGo = from(res);
    } else {
      goOrNoGo = new Observable(ob => {
        ob.next(true);
        ob.complete();
      })
    }
    goOrNoGo.subscribe(canGoNext => {
      if (canGoNext) {
        this.currentIndex += 1;
        this.currentIndexChange.emit(this.currentIndex);
      }
    })
  }

  jumpTo(index: number) {
    if (this.stepComponents.get(index).status === 'done') {
      this.currentIndex = index;
      this.currentIndexChange.emit(this.currentIndex);
    }
  }
}
