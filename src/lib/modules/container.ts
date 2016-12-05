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

  public ngOnInit(): any {
    try {
      this.isOpened = this.config.sidebar.opened;
    } catch (error) {
      this.isOpened = true;
    }
  }

  public mapCreated(map: ol.Map): void {
    this.map = map;
    this.map.updateSize();
  }

  public sidebarToggled(): void {
    this.isOpened = !this.isOpened;
  }

  public updateMap(): void {
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

