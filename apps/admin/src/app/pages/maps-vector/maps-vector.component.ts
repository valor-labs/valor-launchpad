import { AfterViewInit, Component, HostListener } from '@angular/core';

import "jsvectormap/dist/js/jsvectormap.js"
import 'jsvectormap/dist/maps/us-aea-en.js';
import 'jsvectormap/dist/maps/world.js';

declare const jsVectorMap: any;

const world_markes = [{
  coords: [31.230391, 121.473701],
  name: "Shanghai"
},
{
  coords: [39.904202, 116.407394],
  name: "Beijing"
},
{
  coords: [28.704060, 77.102493],
  name: "Delhi"
},
{
  coords: [6.524379, 3.379206],
  name: "Lagos"
},
{
  coords: [39.343357, 117.361649],
  name: "Tianjin"
},
{
  coords: [24.860735, 67.001137],
  name: "Karachi"
},
{
  coords: [41.008240, 28.978359],
  name: "Istanbul"
},
{
  coords: [35.689487, 139.691711],
  name: "Tokyo"
},
{
  coords: [23.129110, 113.264381],
  name: "Guangzhou"
},
{
  coords: [19.075983, 72.877655],
  name: "Mumbai"
},
{
  coords: [40.7127837, -74.0059413],
  name: "New York"
},
{
  coords: [34.052235, -118.243683],
  name: "Los Angeles"
},
{
  coords: [41.878113, -87.629799],
  name: "Chicago"
},
{
  coords: [29.760427, -95.369804],
  name: "Houston"
},
{
  coords: [33.448376, -112.074036],
  name: "Phoenix"
},
{
  coords: [51.507351, -0.127758],
  name: "London"
},
{
  coords: [48.856613, 2.352222],
  name: "Paris"
},
{
  coords: [55.755825, 37.617298],
  name: "Moscow"
},
{
  coords: [40.416775, -3.703790],
  name: "Madrid"
}
]

const useMapMarkers = [{
  coords: [37.77, -122.41],
  name: "San Francisco: 375"
},
{
  coords: [40.71, -74.00],
  name: "New York: 350"
},
{
  coords: [39.09, -94.57],
  name: "Kansas City: 250"
},
{
  coords: [36.16, -115.13],
  name: "Las Vegas: 275"
},
{
  coords: [32.77, -96.79],
  name: "Dallas: 225"
}
]

@Component({
  selector: 'valor-launchpad-maps-vector',
  templateUrl: './maps-vector.component.html',
  styleUrls: ['./maps-vector.component.scss']
})

export class MapsVectorComponent implements AfterViewInit {

  private worldMap;
  private usaMap;

  @HostListener('window:resize')
  onWindowResize() {
    this.worldMap?.updateSize();
    this.usaMap?.updateSize();
  }

  constructor() {
    //
  }
  ngAfterViewInit(): void {
    this.worldMap = new jsVectorMap({
      map: "world",
      selector: "#world_map",
      zoomButtons: true,
      zoomOnScroll: false,
      markers: world_markes,
      markerStyle:{
        initial: {
          r: 9,
          stroke: '#fff',
          strokeWidth: 7,
          stokeOpacity: .4,
          fill: '#3B82EC'
         },
        hover: {
          fill: '#3B82EC',
          stroke: '#3B82EC',
        },
      },
      regionStyle: {
        initial: {
          fill: '#e2e8ee',
        }
      }
    })

    this.usaMap = new jsVectorMap({
      map: "us_aea_en",
      selector: "#usa_map",
      zoomButtons: true,
      markers: useMapMarkers,
      markerStyle: {
        initial: {
          r: 9,
          stroke: '#fff',
          strokeWidth: 7,
          stokeOpacity: .4,
          fill: '#3B82EC'
        },
        hover: {
          fill: '#3B82EC',
          stroke: '#3B82EC'
        }
      },
      regionStyle: {
        initial: {
          fill: '#e2e8ee',
        }
      },
      zoomOnScroll: false
    })
  }

}
