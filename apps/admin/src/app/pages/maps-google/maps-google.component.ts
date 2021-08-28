import { Component, OnInit } from '@angular/core';

declare let google;

@Component({
  selector: 'valor-launchpad-maps-google',
  templateUrl: './maps-google.component.html',
  styleUrls: ['./maps-google.component.scss']
})
export class MapsGoogleComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    try {
      this.initDefaultMap();
      this.initHybridMap();
      this.initLightMap();
      this.initDarkMap();
      this.initStreetViewMap();
      this.initMarkersMap();
    } catch (e) {
      console.warn(e.toString());
    }
  }

  initDefaultMap(): void {
    const defaultMap = {
      zoom: 14,
      center: {
        lat: 40.712784,
        lng: -74.005941
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    new google.maps.Map(document.getElementById('default_map'), defaultMap);
  }

  initHybridMap(): void {
    const hybridMap = {
      zoom: 14,
      center: {
        lat: 40.712784,
        lng: -74.005941
      },
      mapTypeId: google.maps.MapTypeId.HYBRID
    };
    new google.maps.Map(document.getElementById("hybrid_map"), hybridMap);
  }

  initLightMap(): void {
    const lightMap = {
      zoom: 14,
      center: {
        lat: 40.712784,
        lng: -74.005941
      },
      styles: [{
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
          "color": "#e9e9e9"
        }, {
          "lightness": 17
        }]
      }, {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{
          "color": "#f5f5f5"
        }, {
          "lightness": 20
        }]
      }, {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#ffffff"
        }, {
          "lightness": 17
        }]
      }, {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#ffffff"
        }, {
          "lightness": 29
        }, {
          "weight": 0.2
        }]
      }, {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{
          "color": "#ffffff"
        }, {
          "lightness": 18
        }]
      }, {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [{
          "color": "#ffffff"
        }, {
          "lightness": 16
        }]
      }, {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
          "color": "#f5f5f5"
        }, {
          "lightness": 21
        }]
      }, {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dedede"
        }, {
          "lightness": 21
        }]
      }, {
        "elementType": "labels.text.stroke",
        "stylers": [{
          "visibility": "on"
        }, {
          "color": "#ffffff"
        }, {
          "lightness": 16
        }]
      }, {
        "elementType": "labels.text.fill",
        "stylers": [{
          "saturation": 36
        }, {
          "color": "#333333"
        }, {
          "lightness": 40
        }]
      }, {
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [{
          "color": "#f2f2f2"
        }, {
          "lightness": 19
        }]
      }, {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#fefefe"
        }, {
          "lightness": 20
        }]
      }, {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#fefefe"
        }, {
          "lightness": 17
        }, {
          "weight": 1.2
        }]
      }]
    };
    new google.maps.Map(document.getElementById("light_map"), lightMap)
  }

  initDarkMap(): void {
    const darkMap = {
      zoom: 14,
      center: {
        lat: 40.712784,
        lng: -74.005941
      },
      styles: [{
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [{
          "saturation": 36
        }, {
          "color": "#000000"
        }, {
          "lightness": 40
        }]
      }, {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "visibility": "on"
        }, {
          "color": "#000000"
        }, {
          "lightness": 16
        }]
      }, {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#000000"
        }, {
          "lightness": 20
        }]
      }, {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#000000"
        }, {
          "lightness": 17
        }, {
          "weight": 1.2
        }]
      }, {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{
          "color": "#000000"
        }, {
          "lightness": 20
        }]
      }, {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
          "color": "#000000"
        }, {
          "lightness": 21
        }]
      }, {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#000000"
        }, {
          "lightness": 17
        }]
      }, {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#000000"
        }, {
          "lightness": 29
        }, {
          "weight": 0.2
        }]
      }, {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{
          "color": "#000000"
        }, {
          "lightness": 18
        }]
      }, {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [{
          "color": "#000000"
        }, {
          "lightness": 16
        }]
      }, {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [{
          "color": "#000000"
        }, {
          "lightness": 19
        }]
      }, {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
          "color": "#000000"
        }, {
          "lightness": 17
        }]
      }]
    };
    new google.maps.Map(document.getElementById("dark_map"), darkMap)
  }

  initStreetViewMap(): void {
    const streetviewMap = {
      position: {
        lat: 42.345573,
        lng: -71.098326
      },
      pov: {
        heading: 160,
        pitch: 0
      }
    };
    new google.maps.StreetViewPanorama(document.getElementById("streetview_map"), streetviewMap);
  }

  initMarkersMap(): void {
    const markersMapConfig = {
      zoom: 14,
      center: {
        lat: 40.712784,
        lng: -74.005941
      },
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    const markersMap = new google.maps.Map(document.getElementById("markers_map"), markersMapConfig)
    const marker = new google.maps.Marker({
      position: {
        lat: 40.712784,
        lng: -74.005941
      },
      map: markersMap,
      title: "Hello World!"
    });
  }

}
