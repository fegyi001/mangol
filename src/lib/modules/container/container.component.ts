import { Component, Input, Output, OnInit, HostBinding, EventEmitter } from '@angular/core';

import { MangolMapService } from './../../services/_index';

import * as ol from 'openlayers';
import { MangolConfig } from '../../interfaces/mangol-config.interface';
import { MangolReady } from '../../interfaces/mangol-ready.interface';

@Component({
  selector: 'mangol',
  templateUrl: './container.component.html',
  providers: [MangolMapService]
})
export class MangolContainerComponent implements OnInit {
  @HostBinding('class') class = 'mangol';

  @Input() config: MangolConfig;
  @Output() mapReady = new EventEmitter<MangolReady>();
  containerReady = false;
  map: ol.Map;
  isOpened: boolean;
  service: MangolMapService;
  sidebarMode: string;

  constructor(private mapService: MangolMapService) {
    this.service = this.mapService;
  }

  ngOnInit(): any {
    this.sidebarMode = this.config && this.config.hasOwnProperty('sidebar')
      && this.config.sidebar.hasOwnProperty('mode') ? this.config.sidebar.mode : 'side';
    // generate a default config if there is none
    if (typeof this.config === 'undefined') {
      this.config = {
        map: {
          renderer: 'canvas',
          target: 'demo-simple-map',
          view: {
            projection: 'EPSG:900913',
            center: ol.proj.fromLonLat([19.3956393810065, 47.168464955013], 'EPSG:900913'),
            zoom: 7
          },
          layertree: {
            layers: [{
              name: 'OpenStreetMap layer',
              layer: new ol.layer.Tile({
                source: new ol.source.OSM()
              })
            }]
          }
        }
      } as MangolConfig;
    }
    try {
      this.isOpened = this.config.sidebar.opened;
    } catch (error) {
      this.isOpened = true;
    }
  }

  mapCreated(map: ol.Map): void {
    this.map = map;
    this.map.updateSize();
    const ready = {
      mapService: this.service,
      config: this.config
    } as MangolReady;
    this.mapReady.emit(ready);
  }

  sidebarToggled(): void {
    this.isOpened = !this.isOpened;
  }

  updateMap(): void {
    setTimeout(() => {
      this.map.updateSize();
    }, 0);
  }

}
