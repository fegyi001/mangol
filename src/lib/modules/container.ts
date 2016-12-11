import { Component, Input, OnInit, HostBinding, NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { MangolMapModule } from './map';
import { MangolSidebarModule } from './sidebar';

@Component({
  selector: 'mangol-container',
  template: `
        <md-sidenav-layout>
            <md-sidenav #start *ngIf="config.sidebar && map" align="start" 
                  (open)="updateMap()" (close)="isOpened=false" opened="{{isOpened}}" mode="push">
                <mangol-sidebar 
                    [options]="config.sidebar" 
                    [map]="map">
                </mangol-sidebar>
            </md-sidenav>
            <mangol-map 
                *ngIf="config.map" 
                [options]="config"
                (mapCreated)="mapCreated($event)"
                (sidebarToggled)="sidebarToggled($event)">
            </mangol-map>
        </md-sidenav-layout>
  `
})
export class MangolContainerComponent implements OnInit {

  @HostBinding('class') class = 'mangol-container';

  @Input() config: any;
  map: ol.Map;
  isOpened: boolean;

  constructor() {

  }

  ngOnInit(): any {
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
          layers: [
            {
              type: 'layer',
              name: 'OpenStreetMap layer',
              layer: new ol.layer.Tile({
                source: new ol.source.OSM()
              })
            }
          ]
        }
      };
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
  }

  sidebarToggled(): void {
    this.isOpened = !this.isOpened;
  }

  updateMap(): void {
    this.map.updateSize();
  }

}

@NgModule({
  imports: [
    CommonModule,
    MaterialModule.forRoot(),
    MangolMapModule,
    MangolSidebarModule
  ],
  exports: [
    MangolContainerComponent
  ],
  declarations: [
    MangolContainerComponent,
  ]
})
export class MangolContainerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MangolContainerModule,
      providers: []
    };
  }
}

