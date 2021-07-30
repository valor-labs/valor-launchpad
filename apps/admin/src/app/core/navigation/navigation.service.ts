import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  collapseState = new BehaviorSubject(false);
  collapseState$: Observable<boolean>;

  constructor() {
    this.collapseState$ = this.collapseState.asObservable()
  }

  toggleCollapse() {
    this.collapseState.next(!this.collapseState.value)
  }
}
