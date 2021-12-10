import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have properties initialized', () => {
    expect(component.theme).toBeDefined();
    expect(component.theme).toBe('primary');
    expect(component.outlined).toBeDefined();
    expect(component.outlined).toBeFalsy();
    expect(component.size).toBeDefined();
    expect(component.size).toBe('md');
    expect(component.rounded).toBeDefined();
    expect(component.rounded).toBeFalsy();
    expect(component.squared).toBeDefined();
    expect(component.squared).toBeFalsy();
    expect(component.loading).toBeDefined();
    expect(component.loading).toBeFalsy();
  })

  // TO-DO find a way to test HostBinding for projection content
});
