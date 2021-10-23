import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class UtilitiesService {
  documentClickedTarget: Subject<HTMLElement> = new Subject<HTMLElement>();
  constructor() { }

  
}
