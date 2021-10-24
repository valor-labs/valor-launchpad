import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiModule } from '@valor-launchpad/ui';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DashboardAnalyticsService } from './dashboard-analytics.service';
import { DashboardAnalyticsServiceStub } from './dashboard-analytics.service.stub';
import { AuthService } from '../../core/auth/auth.service';
import { AuthServiceStub } from '../../core/auth/auth.service.stub';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardAnalyticsComponent } from './dashboard-analytics.component';

Object.defineProperty(global.SVGElement.prototype, 'getBBox', {
  writable: true,
  value: jest.fn().mockReturnValue({
    x: 0,
    y: 0,
  }),
});

describe('DashboardAnalyticsComponent', () => {
  let component: DashboardAnalyticsComponent;
  let fixture: ComponentFixture<DashboardAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        UiModule,
        NgApexchartsModule,
        ToastrModule.forRoot(),
        NgxDatatableModule,
        NgxChartsModule,
      ],
      declarations: [DashboardAnalyticsComponent],
      providers: [
        ToastrService,
        { provide: AuthService, useClass: AuthServiceStub },
        {
          provide: DashboardAnalyticsService,
          useClass: DashboardAnalyticsServiceStub,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
