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
    this.currentIndex += 1;
    this.currentIndexChange.emit(this.currentIndex);
  }

  jumpTo(index: number) {
    if (this.stepComponents.get(index).status === 'done') {
      this.currentIndex = index;
      this.currentIndexChange.emit(this.currentIndex);
    }
  }
}
