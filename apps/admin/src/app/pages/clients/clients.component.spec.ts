import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsComponent } from './clients.component';
import { UiModule } from '@valor-launchpad/ui';
import { ENV_CONFIG } from '@valor-launchpad/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClientsComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, UiModule],
      declarations: [ClientsComponent],
      providers: [{ provide: ENV_CONFIG, useValue: 'ENV_CONFIG' }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
