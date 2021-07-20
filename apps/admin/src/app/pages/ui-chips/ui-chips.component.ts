import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'valor-launchpad-ui-chips',
  templateUrl: './ui-chips.component.html',
  styleUrls: ['./ui-chips.component.scss']
})
export class UiChipsComponent implements OnInit {
  closeEvent($event){
    alert('omg' + $event)
  }
  constructor() { }

  ngOnInit(): void {
  }

}
