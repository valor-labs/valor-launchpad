import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbeddedPayComponent } from './embedded-pay.component';

describe('EmbeddedPayComponent', () => {
  let component: EmbeddedPayComponent;
  let fixture: ComponentFixture<EmbeddedPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbeddedPayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbeddedPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
