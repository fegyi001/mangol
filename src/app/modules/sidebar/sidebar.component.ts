import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  HostBinding,
  Input,
  OnInit
} from '@angular/core';

import { MangolMap } from '../../classes/map.class';
import { MangolConfigSidebar } from '../../interfaces/config-sidebar.interface';

@Component({
  selector: 'mangol-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MangolSidebarComponent implements AfterViewInit, OnInit, DoCheck {
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

  constructor(private cdr: ChangeDetectorRef) {
    this.activeElement = { type: 'any', title: 'Empty sidebar' };
  }

  ngOnInit() {
    this.sidebarClosed = false;
    this.hasToolbar = this.options.hasOwnProperty('toolbar');
    this.map.updateSize();
  }

  ngAfterViewInit() {
    this.hasLayertree =
      this.hasToolbar && this.options.toolbar.hasOwnProperty('layertree');
    this.hasFeatureInfo =
      this.hasToolbar && this.options.toolbar.hasOwnProperty('featureinfo');
    this.hasMeasure =
      this.hasToolbar && this.options.toolbar.hasOwnProperty('measure');
    this.hasPrint =
      this.hasToolbar && this.options.toolbar.hasOwnProperty('print');
  }

  ngDoCheck() {
    this.cdr.detectChanges();
  }

  public toggleSidebar(): any {
    this.sidebarClosed = !this.sidebarClosed;
  }

  public onElementActivated(element: any): any {
    this.activeElement = element;
  }
}
