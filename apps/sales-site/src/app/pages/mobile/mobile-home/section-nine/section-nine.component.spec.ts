import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionNineComponent } from './section-nine.component';

describe('SectionNineComponent', () => {
  let component: SectionNineComponent;
  let fixture: ComponentFixture<SectionNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionNineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
