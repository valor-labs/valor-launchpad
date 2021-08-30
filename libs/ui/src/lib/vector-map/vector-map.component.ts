import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'valor-launchpad-vector-map',
  templateUrl: './vector-map.component.html',
  styleUrls: ['./vector-map.component.scss']
})
export class VectorMapComponent implements OnInit {

  static ID_SEED = 0
  id: string
  constructor() {
    this.id = 'vm' + VectorMapComponent.ID_SEED++;
  }

  ngOnInit(): void {
    console.log(this.id)
  }

}
