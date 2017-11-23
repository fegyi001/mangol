import { Component, Input, Output, OnInit, HostBinding, EventEmitter } from '@angular/core';

import { MangolMapService } from './../../services/_index';
import MangolReady from '../../interfaces/mangol-ready.interface';
import MangolConfig from '../../interfaces/mangol-config.interface';

import * as ol from 'openlayers';
import { MangolConfigMap } from '../../interfaces/mangol-config-map.interface';

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
  defaultMap: MangolConfigMap;

  constructor(private mapService: MangolMapService) {
    this.service = this.mapService;
    this.defaultMap = {
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
    };
  }

  ngOnInit() {
    // Generate a default config if there is none
    if (typeof this.config === 'undefined') {
      this.config = {
        map: this.defaultMap
      } as MangolConfig;
    } else if (this.config && !this.config.hasOwnProperty('map')) {
      this.config.map = this.defaultMap;
    }
    this.sidebarMode = this.config && this.config.hasOwnProperty('sidebar')
      && this.config.sidebar.hasOwnProperty('mode') ? this.config.sidebar.mode : 'side';
    try {
      this.isOpened = this.config.sidebar.opened;
    } catch (error) {
      this.isOpened = true;
    }
  }

  mapCreated(map: ol.Map) {
    this.map = map;
    this.map.updateSize();
    const ready = {
      mapService: this.service,
      config: this.config
    } as MangolReady;
    this.mapReady.emit(ready);
  }

  sidebarToggled() {
    this.isOpened = !this.isOpened;
  }

  updateMap() {
    setTimeout(() => {
      this.map.updateSize();
    }, 0);
  }

}
