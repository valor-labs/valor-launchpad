import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteOptionComponent } from './autocomplete-option.component';
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

describe('AutocompleteOptionComponent', () => {
  let component: AutocompleteOptionComponent;
  let fixture: ComponentFixture<AutocompleteOptionComponent>;
  let scheduler: TestScheduler;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocompleteOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => scheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have properties initialized', () => {
    expect(component.value).toBeUndefined();
    expect(component.click$).toBeDefined();
  })

  it('should have click$ to be value while trigger click event on component', () => {
    const testValue = 'test'
    component.value = testValue;
    const nativeElement = fixture.nativeElement;
    const div = nativeElement.querySelector('div');
    div.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    // FromEvent is a cold Observable, must subscribe before click trigger
    // let click$Result = '';
    // component.click$.subscribe(res => {
    //   click$Result = res;
    // });
    // expect(click$Result).toEqual(testValue);
    // use marble to test
    scheduler.run(({expectObservable}) => {
      const expectedMarble = '(a|)';
      const expectedClick = {a: 'test'};
      expectObservable(component.click$).toBe(expectedMarble, expectedClick);
    })
  })
});
