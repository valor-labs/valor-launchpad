import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import { AlertModule } from 'ngx-bootstrap/alert';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertComponent],
      imports: [AlertModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have properties initialized', () => {
    expect(component.icon).toBeUndefined();
    expect(component.outline).toBeDefined();
    expect(component.colored).toBeDefined();
    expect(component.type).toBeDefined();
    expect(component.dismissible).toBeDefined();
    expect(component.isOpen).toBeDefined();
    expect(component.outline).toBeFalsy();
    expect(component.colored).toBeFalsy();
    expect(component.type).toBe('warning');
    expect(component.dismissible).toBeFalsy();
    expect(component.isOpen).toBeTruthy();
  });

  it('should have close emit false while alert trigger onClose', () => {
    jest.spyOn(component.close, 'emit');
    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('alert');
    button.dispatchEvent(new Event('onClosed'));
    fixture.detectChanges();
    expect(component.close.emit).toHaveBeenCalledWith(false);
  });
});
