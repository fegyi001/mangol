import { Component, OnInit } from '@angular/core';
import MangolConfig from 'mangol/src/lib/interfaces/mangol-config.interface';
import MangolReady from 'mangol/src/lib/interfaces/mangol-ready.interface';

@Component({
  selector: 'app-root',
  template: `
    <mangol [config]="mangolConfig" (mapReady)="onMapReady($event)"></mangol>
  `
})
export class AppComponent implements OnInit {

  // This is the config of your app
  mangolConfig: MangolConfig;

  ngOnInit() {
    this.mangolConfig = {
      sidebar: {
        collapsible: true,
        opened: true,
        toolbar: {
          layertree: {},
          measure: {
            fillColor: [255, 255, 0, 0.2]
          },
          print: {}
        }
      }
    };
  }

  onMapReady(event: MangolReady) {
    console.log('My Mangol app is up and running!');
    console.log(event);
    // You can do anything from here, e.g. set the first layer's opacity
    // event.mapService.getMaps()[0].getLayers().getArray()[0].setOpacity(0.2);
  }
}

