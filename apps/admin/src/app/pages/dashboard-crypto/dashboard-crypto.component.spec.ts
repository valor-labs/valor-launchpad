import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCryptoComponent } from './dashboard-crypto.component';
import { UiModule } from '@valor-launchpad/ui';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AuthService } from '../../core/auth/auth.service';
import { AuthServiceStub } from '../../core/auth/auth.service.stub';
import { HttpModule } from '@valor-launchpad/http';
import { environment } from '../../../environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DashboardCryptoComponent', () => {
  let component: DashboardCryptoComponent;
  let fixture: ComponentFixture<DashboardCryptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UiModule,
        NgxDatatableModule,
        NgApexchartsModule,
        HttpModule.forRoot({ environment }),
        HttpClientTestingModule,
      ],
      declarations: [DashboardCryptoComponent],
      providers: [{ provide: AuthService, useClass: AuthServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCryptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
