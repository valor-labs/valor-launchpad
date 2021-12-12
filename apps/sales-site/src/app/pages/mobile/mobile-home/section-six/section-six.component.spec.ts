import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionSixComponent } from './section-six.component';

describe('SectionSixComponent', () => {
  let component: SectionSixComponent;
  let fixture: ComponentFixture<SectionSixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionSixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
