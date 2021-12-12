import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorLaunchpadMessengerComponent } from './valor-launchpad-messenger.component';
import { AuthService } from '../../../core/auth/auth.service';
import { AuthServiceStub } from '../../../core/auth/auth.service.stub';

describe('ValorLaunchpadMessengerComponent', () => {
  let component: ValorLaunchpadMessengerComponent;
  let fixture: ComponentFixture<ValorLaunchpadMessengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValorLaunchpadMessengerComponent],
      providers: [{ provide: AuthService, useClass: AuthServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValorLaunchpadMessengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
