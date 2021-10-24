import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsVectorComponent } from './maps-vector.component';
import { UiModule } from '@valor-launchpad/ui';

Object.defineProperty(global.SVGElement.prototype, 'getBBox', {
  writable: true,
  value: jest.fn().mockReturnValue({
    x: 0,
    y: 0,
  }),
});

describe('MapsVectorComponent', () => {
  let component: MapsVectorComponent;
  let fixture: ComponentFixture<MapsVectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiModule],
      declarations: [MapsVectorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsVectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
