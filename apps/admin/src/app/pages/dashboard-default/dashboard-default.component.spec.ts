import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDefaultComponent } from './dashboard-default.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UiModule } from '@valor-launchpad/ui';
import { AuthService } from '../../core/auth/auth.service';
import { AuthServiceStub } from '../../core/auth/auth.service.stub';
import { HttpModule } from '@valor-launchpad/http';
import { environment } from '../../../environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DashboardDefaultComponent', () => {
  let component: DashboardDefaultComponent;
  let fixture: ComponentFixture<DashboardDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgxChartsModule,
        BsDatepickerModule.forRoot(),
        BsDropdownModule.forRoot(),
        NgxDatatableModule,
        UiModule,
        HttpModule.forRoot({ environment }),
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        NoopAnimationsModule,
      ],
      declarations: [DashboardDefaultComponent],
      providers: [{ provide: AuthService, useClass: AuthServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
