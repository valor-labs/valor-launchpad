import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardSaasComponent } from './dashboard-saas.component';
import { UiModule } from '@valor-launchpad/ui';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpModule } from '@valor-launchpad/http';
import { environment } from '../../../environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SaasInfoCardComponent } from './saas-info-card/saas-info-card.component';

Object.defineProperty(global.SVGElement.prototype, 'getBBox', {
  writable: true,
  value: jest.fn().mockReturnValue({
    x: 0,
    y: 0,
  }),
});

describe('DashboardSaasComponent', () => {
  let component: DashboardSaasComponent;
  let fixture: ComponentFixture<DashboardSaasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpModule.forRoot({ environment }),
        HttpClientTestingModule,
        UiModule,
        NgxChartsModule,
        NgxDatatableModule,
        RouterTestingModule,
        NoopAnimationsModule,
      ],
      declarations: [DashboardSaasComponent, SaasInfoCardComponent],
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
