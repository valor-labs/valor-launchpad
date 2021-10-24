import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPasswordComponent } from './settings-password.component';
import { HttpModule } from '@valor-launchpad/http';
import { environment } from '../../../../environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { UiModule } from '@valor-launchpad/ui';

describe('SettingsPasswordComponent', () => {
  let component: SettingsPasswordComponent;
  let fixture: ComponentFixture<SettingsPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpModule.forRoot({ environment }),
        HttpClientTestingModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        UiModule,
      ],
      declarations: [SettingsPasswordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
