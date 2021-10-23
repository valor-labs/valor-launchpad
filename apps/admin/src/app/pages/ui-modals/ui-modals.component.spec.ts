import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiModalsComponent } from './ui-modals.component';
import { UiModule } from '@valor-launchpad/ui';
import { ModalModule } from 'ngx-bootstrap/modal';

describe('UiModalsComponent', () => {
  let component: UiModalsComponent;
  let fixture: ComponentFixture<UiModalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiModule, ModalModule.forRoot()],
      declarations: [UiModalsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
