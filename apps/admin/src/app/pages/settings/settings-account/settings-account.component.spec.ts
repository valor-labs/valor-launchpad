import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAccountComponent } from './settings-account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { UiModule } from '@valor-launchpad/ui';
import { HttpModule } from '@valor-launchpad/http';
import { environment } from '../../../../environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalModule } from 'ngx-bootstrap/modal';

describe('SettingsAccountComponent', () => {
  let component: SettingsAccountComponent;
  let fixture: ComponentFixture<SettingsAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        UiModule,
        HttpModule.forRoot({ environment }),
        ModalModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      declarations: [SettingsAccountComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
