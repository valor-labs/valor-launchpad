import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorLaunchpadMessageComponent } from './valor-launchpad-message.component';

describe('ValorLaunchpadMessageComponent', () => {
  let component: ValorLaunchpadMessageComponent;
  let fixture: ComponentFixture<ValorLaunchpadMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValorLaunchpadMessageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValorLaunchpadMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
