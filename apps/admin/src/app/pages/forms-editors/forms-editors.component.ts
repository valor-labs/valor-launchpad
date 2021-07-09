import { Component, OnInit } from '@angular/core';
import * as Quill from 'quill';

@Component({
  selector: 'valor-launchpad-forms-editors',
  templateUrl: './forms-editors.component.html',
  styleUrls: ['./forms-editors.component.scss']
})
export class FormsEditorsComponent implements OnInit {
  ngOnInit(): void {
    new Quill('#quill-editor', {
      theme: 'snow',
      placeholder: 'Type something',
      modules: {
        toolbar: '#quill-toolbar'
      },
    });

    new Quill('#quill-bubble-editor', {
      theme: 'bubble',
      placeholder: 'Compose an epic',
      modules: {
        toolbar: '#quill-bubble-toolbar'
      },
    });
  }
}
