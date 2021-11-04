import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsComponent } from './notifications.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpModule } from '@valor-launchpad/http';
import { environment } from '../../../environments/environment';
import { UiModule } from '@valor-launchpad/ui';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HttpModule.forRoot({ environment }),
        UiModule,
        NgxDatatableModule,
      ],
      declarations: [NotificationsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
