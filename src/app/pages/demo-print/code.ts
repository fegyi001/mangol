export const code = `

import { Component, OnInit } from '@angular/core';
import { fromLonLat } from 'ol/proj.js';
import View from 'ol/View';

import { MangolLayer, MangolLayerGroup, MangolConfig } from 'mangol';

 @Component({
   selector: 'app-demo-print',
   template: '<mangol [config]="mangolConfig"></mangol>'
 })
 export class DemoPrintComponent implements OnInit {
   mangolConfig: MangolConfig;

   constructor() {}

   ngOnInit() {
    this.mangolConfig = {
      map: {
        renderer: 'canvas',
        target: 'mangol-demo-print',
        view: new View({
          projection: 'EPSG:3857',
          center: fromLonLat([19.3956393810065, 47.168464955013], 'EPSG:3857'),
          zoom: 4
        })
      },
      sidebar: {
        title: 'Print example',
        opened: true,
        toolbar: {
          print: {}
        }
      }
    };
   }
 }`;
