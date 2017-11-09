import {
  Component, OnInit, Input, Output, EventEmitter,
  HostBinding, AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MangolMapService } from './../../services/_index';
import { MangolMap } from './../../core/_index';
import { MangolConfig } from '../../interfaces/mangol-config.interface';

import * as ol from 'openlayers';

@Component({
  selector: 'mangol-map',
  templateUrl: './map.component.html'
})
export class MangolMapComponent implements AfterViewInit, OnInit {
  @HostBinding('class') class = 'mangol-map';

  @Input() config: MangolConfig;
  @Input() mapService: MangolMapService;
  @Output() mapCreated = new EventEmitter<ol.Map>();
  @Output() sidebarToggled = new EventEmitter();

  map: MangolMap;
  view: ol.View;
  renderer: string;
  zoomDuration: number;
  defaultConfig = {
    map: {
      target: null,
      renderer: 'canvas',
      view: {
        projection: 'EPSG:900913',
        center: ol.proj.fromLonLat([19.39563, 47.16846], 'EPSG:900913'),
        zoom: 7,
        resolutions: undefined,
        zoomDuration: 500
      }
    }
  } as MangolConfig;

  ngOnInit() {
    this.renderer = this.config.map.renderer || this.defaultConfig.map.renderer;
    this.zoomDuration = this.config.map.view.zoomDuration || this.defaultConfig.map.view.zoomDuration;
    this.view = new ol.View({
      projection: this.config.map.view.projection,
      center: this.config.map.view.center,
      zoom: this.config.map.view.zoom,
      resolutions: (this.config.map.view && this.config.map.view.resolutions)
        ? this.config.map.view.resolutions : this.defaultConfig.map.view.resolutions
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.map = new MangolMap({
        renderer: this.renderer,
        layers: [],
        target: this.config.map.target,
        view: this.view
      });
      // consume layer and layergroup parameters
      this.map.addLayersAndLayerGroups(this.config.map.layertree, null);
      // register the map in the injectable mapService
      this.mapService.addMap(this.map);
      this.mapCreated.emit(this.map);
    }, 0);
  }

  zoomIn(): void {
    this.view.animate({ zoom: this.view.getZoom() + 1, duration: this.zoomDuration });
  }

  zoomOut(): void {
    this.view.animate({ zoom: this.view.getZoom() - 1, duration: this.zoomDuration });
  }

  toggleSidebar(): void {
    this.sidebarToggled.emit();
  }

}
