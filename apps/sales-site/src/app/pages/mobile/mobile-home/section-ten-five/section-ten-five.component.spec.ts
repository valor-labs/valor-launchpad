import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTenFiveComponent } from './section-ten-five.component';

describe('SectionTenFiveComponent', () => {
  let component: SectionTenFiveComponent;
  let fixture: ComponentFixture<SectionTenFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionTenFiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionTenFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
