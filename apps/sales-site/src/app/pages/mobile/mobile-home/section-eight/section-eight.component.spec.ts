import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionEightComponent } from './section-eight.component';

describe('SectionEightComponent', () => {
  let component: SectionEightComponent;
  let fixture: ComponentFixture<SectionEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionEightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
