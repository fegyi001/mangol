import { Component, Input, OnInit, HostBinding, NgModule, ModuleWithProviders, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { MangolToolbarModule } from './toolbar';
import { MangolLayertreeModule } from './layertree';
import { MangolPrintModule } from './print';
import { MangolMeasureModule } from './measure';

import { MangolMap } from '../core/_index';

import * as ol from 'openlayers';
@Component({
  selector: 'mangol-sidebar',
  template: `
      <div class="sidebar-outer">
          <mangol-toolbar
                  *ngIf="hasToolbar"
                  [options]="options.toolbar"
                  (elementActivated)="onElementActivated($event)">
          </mangol-toolbar>
          <div class="sidebar-main">
          	  <div class="sidebar-title">
	              <md-toolbar>
                    <!--<div class="closediv">X</div>-->
	                <span>{{activeElement.title}}</span>
	              </md-toolbar>
              </div>
              <div class="sidebar-content">
	              <mangol-layertree
	                  *ngIf="hasLayertree && activeElement.type==='layertree'"
	                  [map]="map">
	              </mangol-layertree>
	              <mangol-measure
	              	  *ngIf="hasMeasure && activeElement.type==='measure'"
	                  [map]="map">
	              </mangol-measure>
	              <mangol-print
	              	  *ngIf="hasPrint && activeElement.type==='print'"
	                  [map]="map"></mangol-print>
              </div>
          </div>
      </div>
    `,
})
export class MangolSidebarComponent implements AfterViewInit, OnInit {
  @HostBinding('class') class = 'mangol-sidebar';

  @Input() options: any;
  @Input() map: MangolMap;

  sidebarClosed: boolean;

  hasToolbar: boolean;
  hasLayertree: boolean;
  hasMeasure: boolean;
  hasPrint: boolean;

  activeElement: any;

  constructor() {
    this.activeElement = { type: 'any', title: 'Empty sidebar' };
  }

  public ngOnInit(): any {
    this.sidebarClosed = false;
    this.hasToolbar = this.options.hasOwnProperty('toolbar');
    this.map.updateSize();
  }

  ngAfterViewInit(): any {
    this.hasLayertree = this.hasToolbar && this.options.toolbar.hasOwnProperty('layertree');
    this.hasMeasure = this.hasToolbar && this.options.toolbar.hasOwnProperty('measure');
    this.hasPrint = this.hasToolbar && this.options.toolbar.hasOwnProperty('print');
  }

  public toggleSidebar(): any {
    this.sidebarClosed = !this.sidebarClosed;
  }

  public onElementActivated(element: any): any {
    this.activeElement = element;
  }

}

@NgModule({
  imports: [
    CommonModule,
    MaterialModule.forRoot(),
    MangolToolbarModule.forRoot(),
    MangolLayertreeModule.forRoot(),
    MangolPrintModule.forRoot(),
    MangolMeasureModule.forRoot()
  ],
  exports: [
    MangolSidebarComponent
  ],
  declarations: [
    MangolSidebarComponent
  ]
})
export class MangolSidebarModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MangolSidebarModule,
      providers: []
    };
  }
}
