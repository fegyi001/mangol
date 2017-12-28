import { AfterViewInit, Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';

import { MangolMap } from '../../classes/map.class';
import { MangolDialogComponent } from '../mangol/mangol-dialog.component';
import { MangolConfig } from './../../interfaces/config.interface';
import { MangolMapService } from './../../services/map.service';

import * as ol from 'openlayers';

@Component({
  selector: 'mangol-map',
  templateUrl: './map.component.html'
})
export class MangolMapComponent implements AfterViewInit, OnInit {
  @HostBinding('class') class = 'mangol-map';

  @Input() config: MangolConfig;
  @Input() mapService: MangolMapService;
  @Output() mapCreated = new EventEmitter<MangolMap>();
  @Output() sidebarToggled = new EventEmitter();

  map: MangolMap;
  view: ol.View;
  renderer: string;
  zoomDuration: number;
  sidebarOpened: boolean;
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
    },
    sidebar: {
      opened: true
    }
  } as MangolConfig;

  constructor(public dialog: MatDialog) {

  }

  ngOnInit() {
    this.sidebarOpened = this.config && this.config.hasOwnProperty('sidebar')
      && this.config.sidebar.hasOwnProperty('opened') ? this.config.sidebar.opened : this.defaultConfig.sidebar.opened;
    this.renderer = this.config && this.config.hasOwnProperty('map')
      && this.config.map.hasOwnProperty('renderer') ? this.config.map.renderer : this.defaultConfig.map.renderer;
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
      // create the MangolMap instance (extends ol.Map)
      this.map = new MangolMap({
        renderer: this.renderer,
        layers: [],
        target: this.config.map.target,
        view: this.view
      });
      // consume layer and layergroup parameters
      if (this.config.map.hasOwnProperty('layertree')) {
        this.map.addLayersAndLayerGroups(this.config.map.layertree, null);
      }
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

  fullScreen(): void {
    // some parameters are needet to override: the map target and the fullScreen controller
    const confOverride = {
      map: {
        ...this.config.map, target: this.config.map.target + '-dialog',
        controllers: { ...this.config.map.controllers, fullScreen: undefined }
      }
    } as MangolConfig;
    const dialogConfig = { ...this.config, ...confOverride };
    const dialogRef = this.dialog.open(MangolDialogComponent, {
      width: '95%',
      height: '95%',
      data: { config: dialogConfig }
    });
  }

  toggleSidebar(): void {
    this.sidebarOpened = !this.sidebarOpened;
    this.sidebarToggled.emit();
  }

}
