import { AutocompleteContentDirective } from './autocomplete-content.directive';
import { Component } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';

@Component({
  template: `
  <template valorLaunchpadAutocompleteContent></template>
  `
})
class TestComponent { }

describe('AutocompleteContentDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ AutocompleteContentDirective, TestComponent ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
      ],
    }).createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



