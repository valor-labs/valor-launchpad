import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsComponent } from './clients.component';
import { UiModule } from '@valor-launchpad/ui';
import { FormsModule } from '@angular/forms';
import { ENV_CONFIG } from '@valor-launchpad/http';

describe('ClientsComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiModule, FormsModule],
      declarations: [ClientsComponent],
      providers: [{ provide: ENV_CONFIG, useValue: 'ENV_CONFIG' }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
