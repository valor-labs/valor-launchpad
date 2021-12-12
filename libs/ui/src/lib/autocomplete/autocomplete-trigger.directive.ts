import { Directive, ElementRef, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import {AbstractControl, NgControl} from '@angular/forms';
import {ConnectionPositionPair, Overlay, OverlayConfig, OverlayRef, PositionStrategy} from '@angular/cdk/overlay';
import {AutocompleteComponent} from './autocomplete.component';
import {fromEvent} from 'rxjs/internal/observable/fromEvent';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {TemplatePortal} from '@angular/cdk/portal';
import {filter, takeUntil} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Directive({
  selector: 'input[valorLaunchpadAutocompleteTrigger]'
})
export class AutocompleteTriggerDirective implements OnInit, OnDestroy {

  @Input() appAutocomplete: AutocompleteComponent;

  private _overlayRef: OverlayRef;

  constructor(
    private host: ElementRef<HTMLInputElement>,
    private ngControl: NgControl,
    private vcr: ViewContainerRef,
    private overlay: Overlay
  ) {
  }

  get origin(): HTMLElement {
    return this.host.nativeElement;
  }

  get control(): AbstractControl {
    return this.ngControl.control;
  }

  ngOnInit() {
    fromEvent(this.origin, 'focus')
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        if (this._overlayRef) {
          return;
        }
        this._openDropdown();

        this.appAutocomplete
          .optionsClick()
          .pipe(takeUntil(this._overlayRef.detachments()))
          .subscribe((value: string) => {
            this.control.setValue(value);
            this._close();
          });
      });
  }

  private _openDropdown(): void {
    this._overlayRef = this.overlay.create(this._getOverlayConfig());
    const template = new TemplatePortal(this.appAutocomplete.rootTemplate, this.vcr);
    this._overlayRef.attach(template);
    this._overlayClickOutside()
      .subscribe(() => this._close());
    // @todo: add keyboard event
  }

  private _getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      width: this.origin.offsetWidth + 40,
      maxHeight: 40 * 3,
      positionStrategy: this._getOverlayPosition(),
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      backdropClass: ''
    });
  }

  private _getOverlayPosition(): PositionStrategy {
    const positions = [
      new ConnectionPositionPair(
        {originX: 'start', originY: 'bottom'},
        {overlayX: 'start', overlayY: 'top'}
      )
    ];
    const strategy = this.overlay
      .position()
      .flexibleConnectedTo(this.origin)
      .withPositions(positions)
      .withFlexibleDimensions(false)
      .withPush(false);
    return strategy;
  }

  private _close() {
    this._overlayRef.detach();
    this._overlayRef = null;
  }

  private _overlayClickOutside(): Observable<any> {
    return fromEvent<MouseEvent>(document, 'click', {capture: true}).pipe(
      filter(event => {
        const clickTarget = event.target as HTMLElement;
        const notOrigin = clickTarget !== this.origin;
        const notOverlay = !!this._overlayRef && !this._overlayRef.overlayElement.contains(clickTarget);
        if (notOrigin && notOverlay) {
          this.host.nativeElement.blur();
        }
        return notOrigin && notOverlay;
      }),
      takeUntil(this._overlayRef.detachments())
    );
  }

  ngOnDestroy() {
    console.log('directive Destroyed');
  }
}
