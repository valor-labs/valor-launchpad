import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTenFourComponent } from './section-ten-four.component';

describe('SectionTenFourComponent', () => {
  let component: SectionTenFourComponent;
  let fixture: ComponentFixture<SectionTenFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionTenFourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionTenFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
