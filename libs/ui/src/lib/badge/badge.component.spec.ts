import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { BadgeTheme } from './badge.component';
import { BadgeComponent } from './badge.component';

describe('BadgeComponent', () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have properties initialized', () => {
    expect(component.rounded).toBeDefined();
    expect(component.rounded).toBeFalsy();
    expect(component.theme).toBeDefined();
    expect(component.theme).toBe('primary');
  })
});
