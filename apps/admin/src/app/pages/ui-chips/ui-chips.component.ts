import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'valor-launchpad-ui-chips',
  templateUrl: './ui-chips.component.html',
  styleUrls: ['./ui-chips.component.scss']
})
export class UiChipsComponent implements OnInit {
  closeEvent($event){
    console.log('A chip was dismissed: ', $event)
  }
  constructor() { }

  ngOnInit(): void {
  }

}
