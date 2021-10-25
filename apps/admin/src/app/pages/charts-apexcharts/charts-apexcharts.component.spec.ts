import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsApexchartsComponent } from './charts-apexcharts.component';
import { UiModule } from '@valor-launchpad/ui';
import { NgApexchartsModule } from 'ng-apexcharts';

describe('ChartsApexchartsComponent', () => {
  let component: ChartsApexchartsComponent;
  let fixture: ComponentFixture<ChartsApexchartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiModule, NgApexchartsModule],
      declarations: [ChartsApexchartsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsApexchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
