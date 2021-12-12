import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTenSixComponent } from './section-ten-six.component';

describe('SectionTenSixComponent', () => {
  let component: SectionTenSixComponent;
  let fixture: ComponentFixture<SectionTenSixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionTenSixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionTenSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
