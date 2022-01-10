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
        target: 'mangol-demo-controllers',
        view: new View({
          projection: 'EPSG:3857',
          center: fromLonLat([19.3956393810065, 47.168464955013], 'EPSG:3857'),
          zoom: 4,
          enableRotation: true,
          rotation: 45
        }),
        controllers: {
          zoom: {
            show: true
          },
          position: {
            show: true,
            precision: 2,
            dictionary: {
              copyCoordinates: 'Copy coordinates',
              textCopied: 'Copied',
              closeSnackbar: 'Close'
            }
          },
          rotation: {
            show: true,
            dictionary: {
              rotateToNorth: 'Rotate to North'
            },
            showTooltip: true
          }
        }
      }
    } as MangolConfig;
  }
}
`
