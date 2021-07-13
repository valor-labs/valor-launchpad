import { Component } from '@angular/core';
import { Element } from 'slate';

@Component({
  selector: 'valor-launchpad-forms-editors',
  templateUrl: './forms-editors.component.html',
  styleUrls: ['./forms-editors.component.scss']
})
export class FormsEditorsComponent {
  schema: Element[] = [{ type: 'paragraph', children: [{ text: '' }] }];
}
