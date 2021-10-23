import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaasInfoCardComponent } from './saas-info-card.component';
import { UiModule } from '@valor-launchpad/ui';

describe('SaasInfoCardComponent', () => {
  let component: SaasInfoCardComponent;
  let fixture: ComponentFixture<SaasInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiModule],
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
