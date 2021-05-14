import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RebootComponent } from './reboot.component';

describe('RebootComponent', () => {
  let component: RebootComponent;
  let fixture: ComponentFixture<RebootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RebootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RebootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
