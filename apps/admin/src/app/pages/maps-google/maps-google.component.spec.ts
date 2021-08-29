import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsGoogleComponent } from './maps-google.component';

describe('MapsGoogleComponent', () => {
  let component: MapsGoogleComponent;
  let fixture: ComponentFixture<MapsGoogleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapsGoogleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
