import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTenThreeComponent } from './section-ten-three.component';

describe('SectionTenThreeComponent', () => {
  let component: SectionTenThreeComponent;
  let fixture: ComponentFixture<SectionTenThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionTenThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionTenThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
