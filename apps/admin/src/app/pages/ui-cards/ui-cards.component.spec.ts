import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCardsComponent } from './ui-cards.component';

describe('UiCardsComponent', () => {
  let component: UiCardsComponent;
  let fixture: ComponentFixture<UiCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
