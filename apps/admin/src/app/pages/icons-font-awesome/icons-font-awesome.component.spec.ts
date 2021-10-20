import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsFontAwesomeComponent } from './icons-font-awesome.component';

describe('IconsFontAwesomeComponent', () => {
  let component: IconsFontAwesomeComponent;
  let fixture: ComponentFixture<IconsFontAwesomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconsFontAwesomeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconsFontAwesomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
