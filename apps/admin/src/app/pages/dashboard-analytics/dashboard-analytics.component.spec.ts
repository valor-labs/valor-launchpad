import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiModule } from '@valor-launchpad/ui';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DashboardAnalyticsService } from './dashboard-analytics.service';
import { AuthService } from '../../core/auth/auth.service';
import { AuthServiceStub } from '../../core/auth/auth.service.stub';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardAnalyticsComponent } from './dashboard-analytics.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpModule } from '@valor-launchpad/http';
import { environment } from '../../../environments/environment';

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
        HttpClientTestingModule,
        HttpModule.forRoot({ environment }),
      ],
      declarations: [DashboardAnalyticsComponent],
      providers: [
        ToastrService,
        { provide: AuthService, useClass: AuthServiceStub },
        DashboardAnalyticsService,
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
