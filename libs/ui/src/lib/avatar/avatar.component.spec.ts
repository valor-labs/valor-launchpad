import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarComponent } from './avatar.component';

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have properties initialized', () => {
    expect(component.src).toBeUndefined();
    expect(component.alt).toBeUndefined();
    expect(component.classes).toBeUndefined();
    expect(component.size).toBe(null);
    expect(component.width).toBe(null);
    expect(component.height).toBe(null);
    expect(component.firstName).toBeUndefined();
    expect(component.lastName).toBeUndefined();
    expect(component.squared).toBeDefined();
    expect(component.squared).toBeFalsy();
  })

  it('should get first character of string by using getInitialChar function', () => {
    const testString = 'Hello, world';
    expect(component.getInitialChar(testString)).toBe('H');
  });

  it('should return 0 while call getFontSize function with arguments width or height as null', () => {
    expect(component.getFontSize()).toBe(0);
  });

  // TO-DO test feature with nested stub component
  it('should display div with first character connection between first name & last name while src is null', () => {
    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    component.src = null;
    component.firstName = 'test';
    component.lastName = 'test';
    component.classes = 'test-class';
    fixture.detectChanges();
    const nativeElement = fixture.debugElement.nativeElement;
    const div = nativeElement.querySelector('div');
    expect(div.textContent).toBe( ' tt ');
  })

  // TO-DO test feature with nested stub component
  it('should give src property null value while image error occurred, when img has a invalid value', () => {
    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    component.src = 'www.img.com';
    component.alt = 'test image';
    component.classes= 'test-class';
    component.size = 'sm';
    component.height = 50;
    component.width = 50;
    component.firstName = 'te';
    component.lastName = 'st';
    fixture.detectChanges();
    const nativeElement = fixture.debugElement.nativeElement;
    const img = nativeElement.querySelector('img');
    const spyError = jest.spyOn(component, 'onInvalidSrc' );
    img.dispatchEvent(new Event('error'));
    fixture.detectChanges();
    expect(spyError).toHaveBeenCalled();
    expect(component.src).toBe(null);
  })
});
