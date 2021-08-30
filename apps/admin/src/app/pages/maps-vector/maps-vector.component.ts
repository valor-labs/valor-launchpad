import { Component, OnInit } from '@angular/core';
import jsVectorMap from 'jsvectormap'
import 'jsvectormap/dist/maps/world.js'
import 'jsvectormap/dist/maps/world-merc.js'

@Component({
  selector: 'valor-launchpad-maps-vector',
  templateUrl: './maps-vector.component.html',
  styleUrls: ['./maps-vector.component.scss']
})
export class MapsVectorComponent implements OnInit {

lightTheme = {
  "primary": "#3B82EC",
  "primary-dark": "#1659c7",
  "primary-light": "#84aef2",
  "secondary": "#495057",
  "success": "#4BBF73",
  "info": "#1F9BCF",
  "warning": "#f0ad4e",
  "danger": "#d9534f",
  "white": "#fff",
  "gray-100": "#f4f7f9",
  "gray-200": "#e2e8ee",
  "gray-300": "#dee6ed",
  "gray-400": "#ced4da",
  "gray-500": "#adb5bd",
  "gray-600": "#6c757d",
  "gray-700": "#495057",
  "gray-800": "#020202",
  "gray-900": "#212529",
  "black": "#000",
}
darkTheme = {
  ...this.lightTheme,
  "primary-dark": "#84aef2",
  "primary-light": "#1659c7",
  "white": "#293042",
  "gray-100": "#3e4555",
  "gray-200": "#545968",
  "gray-300": "#696e7b",
  "gray-400": "#7f838e",
  "gray-500": "#9498a1",
  "gray-600": "#a9acb3",
  "gray-700": "#bfc1c6",
  "gray-800": "#d4d6d9",
  "gray-900": "#eaeaec",
  "black": "#fff",
}

  map: any

  // constructor() { }

  ngOnInit(): void {
    const worldMap = this.map = new jsVectorMap({
      map: "world_merc",
      // map: "world",
      selector: "#world_map",
      zoomButtons: true,
      selectedMarkers: [0, 2],
      markers: [
        { name: "Palestine", coords: [31.9474,35.2272] },
        { name: "Russia", coords: [61.524,105.3188] },
        { name: "Canada", coords: [56.1304,-106.3468] },
        { name: "Greenland", coords: [71.7069,-42.6043] },
      ],
      markerStyle:{
        initial: { fill: "#5c5cff" },
        selected: { fill: "red" }
      }
      // markerStyle: {
      //   initial: {
      //     r: 9,
      //     stroke: this.lightTheme.white,
      //     strokeWidth: 7,
      //     stokeOpacity: .4,
      //     fill: this.lightTheme.primary
      //   },
      //   // hover: {
      //   //   fill: this.lightTheme.primary,
      //   //   stroke: this.lightTheme.primary
      //   // }
      // },
      // regionStyle: {
      //   initial: {
      //     fill: this.lightTheme["gray-200"]
      //   }
      // },
      // zoomOnScroll: false
    })

    setTimeout(() => {
      worldMap.updateSize()
    }, 300)
  }

  handleClick() {
    console.log(this.map)
  }

}
