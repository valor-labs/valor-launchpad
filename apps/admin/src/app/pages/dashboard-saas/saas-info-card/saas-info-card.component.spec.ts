import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaasInfoCardComponent } from './saas-info-card.component';

describe('SaasInfoCardComponent', () => {
  let component: SaasInfoCardComponent;
  let fixture: ComponentFixture<SaasInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaasInfoCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaasInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
