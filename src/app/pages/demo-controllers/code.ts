export const code = `
import { Component, OnInit } from '@angular/core';
import { fromLonLat } from 'ol/proj.js';
import View from 'ol/View';

import { MangolConfig } from 'mangol';

@Component({
  selector: 'app-demo-sidebar',
  template: '<mangol [config]="mangolConfig"></mangol>',
  styles: []
})
export class DemoLayertreeComponent implements OnInit {
  mangolConfig: MangolConfig;

  constructor() {}

  ngOnInit() {
    this.mangolConfig = {
      map: {
        renderer: 'canvas',
        target: 'my-map',
        view: new View({
          projection: 'EPSG:900913',
          center: fromLonLat([0, 0], 'EPSG:900913'),
          zoom: 3
        })
      },
      sidebar: {
        collapsible: true,
        opened: true,
        title: 'Sidebar example',
        mode: 'side'
      }
    } as MangolConfig;
  }
}
`;
