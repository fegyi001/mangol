import { Component, OnInit, Input, Output, EventEmitter, HostBinding, AfterViewInit, NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { MangolMapService } from '../services/_index';
import { MangolMap } from '../core/_index';

@Component({
  selector: 'mangol-map',
  template: `
      <div>
          <div class="custom-buttons">
              <div class="zoom-in" (click)="zoomIn()">
                  <button md-mini-fab>
                      <md-icon class="md-12">add</md-icon>
                  </button>
              </div>
              <div class="zoom-out" (click)="zoomOut()">
                  <button md-mini-fab>
                      <md-icon class="md-24">remove</md-icon>
                  </button>
              </div>
              <div class="sidebar" *ngIf="hasSidebar && sidebarCollapsible" (click)="toggleSidebar()">
                  <button md-mini-fab>
                      <md-icon class="md-24">reorder</md-icon>
                  </button>
              </div>
          </div>
          <div [attr.id]="target" class="mangol-map-div"></div>
      </div>
  `,
  providers: [MangolMapService]
})
export class MangolMapComponent implements AfterViewInit, OnInit {
  @HostBinding('class') class = 'mangol-map';

  @Input() options: any;
  @Output() mapCreated = new EventEmitter();
  @Output() sidebarToggled = new EventEmitter();

  map: MangolMap;
  view: ol.View;
  target: string;
  hasSidebar: boolean;
  zoomDuration: number = 500;
  sidebarCollapsible: boolean = false;

  constructor(private mapService: MangolMapService) {

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
        ? this.options.map.view.center : ol.proj.fromLonLat([19.3956393810065, 47.168464955013], 'EPSG:900913'),
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
    let zoom = ol.animation.zoom({
      duration: this.zoomDuration,
      resolution: this.map.getView().getResolution(),
      easing: ol.easing.inAndOut
    });
    this.map.beforeRender(zoom);
    this.map.getView().setResolution(this.map.getView().getResolution() * 0.5);
  }

  public zoomOut(): void {
    let zoom = ol.animation.zoom({
      duration: this.zoomDuration,
      resolution: this.map.getView().getResolution(),
      easing: ol.easing.inAndOut
    });
    this.map.beforeRender(zoom);
    this.map.getView().setResolution(this.map.getView().getResolution() * 2);
  }

  public toggleSidebar(): void {
    this.sidebarToggled.emit();
  }

}

@NgModule({
  imports: [
    CommonModule,
    MaterialModule.forRoot()
  ],
  exports: [
    MangolMapComponent
  ],
  declarations: [
    MangolMapComponent
  ]
})
export class MangolMapModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MangolMapModule,
      providers: []
    };
  }
}

