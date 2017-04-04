import { Component, OnInit, Input, Output, EventEmitter, HostBinding, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { MangolMapService } from './../../../services/_index';

import { MangolMap } from './../../../core/_index';

import * as ol from 'openlayers';

@Component({
  selector: 'mangol-map',
  templateUrl: './map.component.html'
})
export class MangolMapComponent implements AfterViewInit, OnInit {
  @HostBinding('class') class = 'mangol-map';

  @Input() options: any;
  @Input() mapService: MangolMapService;
  @Output() mapCreated = new EventEmitter();
  @Output() sidebarToggled = new EventEmitter();

  map: MangolMap;
  view: ol.View;
  target: string;
  hasSidebar: boolean;
  zoomDuration = 500;
  sidebarCollapsible = false;

  constructor() {

  }

  ngOnInit() {
    this.hasSidebar = this.options.hasOwnProperty('sidebar');
    this.sidebarCollapsible = (this.hasSidebar && this.options.sidebar.hasOwnProperty('collapsible'))
      ? this.options.sidebar.collapsible : false;
    this.target = this.options.map.target;
    this.view = new ol.View({
      projection: this.options.map.hasOwnProperty('view') && this.options.map.view.hasOwnProperty('projection')
        ? this.options.map.view.projection : 'EPSG:900913',
      center: this.options.map.hasOwnProperty('view') && this.options.map.view.hasOwnProperty('center')
        ? this.options.map.view.center : ol.proj.fromLonLat([19.39563, 47.16846], 'EPSG:900913'),
      zoom: this.options.map.hasOwnProperty('view') && this.options.map.view.hasOwnProperty('zoom')
        ? this.options.map.view.zoom : 7,
      resolutions: this.options.map.hasOwnProperty('view') && this.options.map.view.hasOwnProperty('resolutions')
        ? this.options.map.view.resolutions : undefined
    });
  }

  ngAfterViewInit(): any {
    this.map = new MangolMap({
      layers: [],
      target: this.target,
      view: this.view
    });

    // register the map in the injectable mapService
    this.mapService.addMap(this.map);

    this.map.addLayersAndLayerGroups(this.options.map.layers);
    this.mapCreated.emit(this.map);
    this.map.updateSize();
  }

  public zoomIn(): void {
    const view = this.map.getView();
    view.animate({ zoom: view.getZoom() + 1, duration: this.zoomDuration });
  }

  public zoomOut(): void {
    const view = this.map.getView();
    view.animate({ zoom: view.getZoom() - 1, duration: this.zoomDuration });
  }

  public toggleSidebar(): void {
    this.sidebarToggled.emit();
  }

}