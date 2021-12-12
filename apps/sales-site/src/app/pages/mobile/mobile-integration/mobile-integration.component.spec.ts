import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileIntegrationComponent } from './mobile-integration.component';

describe('MobileIntegrationComponent', () => {
  let component: MobileIntegrationComponent;
  let fixture: ComponentFixture<MobileIntegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileIntegrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
