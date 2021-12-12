import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTenTwoComponent } from './section-ten-two.component';

describe('SectionTenTwoComponent', () => {
  let component: SectionTenTwoComponent;
  let fixture: ComponentFixture<SectionTenTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionTenTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionTenTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
