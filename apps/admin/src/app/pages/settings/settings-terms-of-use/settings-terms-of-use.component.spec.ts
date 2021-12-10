import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsTermsOfUseComponent } from './settings-terms-of-use.component';
import { UiModule } from '@valor-launchpad/ui';
import { HttpModule } from '@valor-launchpad/http';
import { environment } from '../../../../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
describe('SettingsTermsOfUseComponent', () => {
  let component: SettingsTermsOfUseComponent;
  let fixture: ComponentFixture<SettingsTermsOfUseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UiModule,
        HttpClientTestingModule,
        HttpModule.forRoot({ environment }),
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        ModalModule,
      ],
      declarations: [SettingsTermsOfUseComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsTermsOfUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
