import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesBootstrapComponent } from './tables-bootstrap.component';

describe('TablesBootstrapComponent', () => {
  let component: TablesBootstrapComponent;
  let fixture: ComponentFixture<TablesBootstrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablesBootstrapComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesBootstrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
