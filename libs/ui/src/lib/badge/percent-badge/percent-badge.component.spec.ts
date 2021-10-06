import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentBadgeComponent } from './percent-badge.component';

describe('PercentBadgeComponent', () => {
  let component: PercentBadgeComponent;
  let fixture: ComponentFixture<PercentBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PercentBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
