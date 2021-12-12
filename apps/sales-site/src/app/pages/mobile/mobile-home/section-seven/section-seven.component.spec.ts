import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionSevenComponent } from './section-seven.component';

describe('SectionSevenComponent', () => {
  let component: SectionSevenComponent;
  let fixture: ComponentFixture<SectionSevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionSevenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionSevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
