import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsChartjsComponent } from './charts-chartjs.component';
import { UiModule } from '@valor-launchpad/ui';
import {
  BarChartModule,
  LineChartModule,
  PieChartModule,
  PolarChartModule,
} from '@swimlane/ngx-charts';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ChartsChartjsComponent', () => {
  let component: ChartsChartjsComponent;
  let fixture: ComponentFixture<ChartsChartjsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        UiModule,
        LineChartModule,
        BarChartModule,
        PieChartModule,
        PolarChartModule,
      ],
      declarations: [ChartsChartjsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsChartjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
