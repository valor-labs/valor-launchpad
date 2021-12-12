import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTenOneComponent } from './section-ten-one.component';

describe('SectionTenOneComponent', () => {
  let component: SectionTenOneComponent;
  let fixture: ComponentFixture<SectionTenOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionTenOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionTenOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
