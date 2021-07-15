/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OffcanvasComponent } from './offcanvas.component';

describe('OffcanvasComponent', () => {
  let component: OffcanvasComponent;
  let fixture: ComponentFixture<OffcanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffcanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffcanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
