import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiGeneralComponent } from './ui-general.component';
import { UiModule } from '@valor-launchpad/ui';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

describe('UiGeneralComponent', () => {
  let component: UiGeneralComponent;
  let fixture: ComponentFixture<UiGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UiModule,
        AccordionModule.forRoot(),
        NoopAnimationsModule,
        PaginationModule.forRoot(),
        ProgressbarModule.forRoot(),
      ],
      declarations: [UiGeneralComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
