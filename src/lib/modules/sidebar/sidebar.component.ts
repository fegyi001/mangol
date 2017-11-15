import { Component, Input, OnInit, HostBinding, AfterViewInit } from '@angular/core';

import { MangolMap } from './../../core/_index';

import * as ol from 'openlayers';
import { MangolConfigSidebar } from '../../interfaces/mangol-config-sidebar.interface';

@Component({
  selector: 'mangol-sidebar',
  templateUrl: './sidebar.component.html'
})
export class MangolSidebarComponent implements AfterViewInit, OnInit {
  @HostBinding('class') class = 'mangol-sidebar';

  @Input() options: MangolConfigSidebar;
  @Input() map: MangolMap;

  sidebarClosed: boolean;

  hasToolbar: boolean;
  hasLayertree: boolean;
  hasMeasure: boolean;
  hasPrint: boolean;
  hasFeatureInfo: boolean;

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
    this.hasFeatureInfo = this.hasToolbar && this.options.toolbar.hasOwnProperty('featureinfo');
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
