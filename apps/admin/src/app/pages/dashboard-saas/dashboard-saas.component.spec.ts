import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSaasComponent } from './dashboard-saas.component';

describe('DashboardSaasComponent', () => {
  let component: DashboardSaasComponent;
  let fixture: ComponentFixture<DashboardSaasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardSaasComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSaasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
