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
        target: 'mangol-demo-sidebar',
        view: new View({
          projection: 'EPSG:900913',
          center: fromLonLat(
            [19.3956393810065, 47.168464955013],
            'EPSG:900913'
          ),
          zoom: 4
        })
      },
      sidebar: {
        collapsible: true,
        opened: true,
        title: 'Sidebar example',
        mode: 'side'
      }
    };
  }
}
`;
