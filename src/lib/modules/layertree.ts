import { Component, OnInit, Input, HostBinding, NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { MangolLayer, MangolLayergroup, MangolMap } from '../core/_index';
import { MangolLayergroupModule } from './layergroup';
import { MangolLayerModule } from './layer';


@Component({
  selector: 'mangol-layertree',
  template: `
      <mangol-layergroup *ngFor="let lg of layerGroups" [layerGroup]="lg"></mangol-layergroup>
      <mangol-layer *ngFor="let l of layers" [layer]="l"></mangol-layer>
    `
})
export class MangolLayertreeComponent implements OnInit {
  @HostBinding('class') class = 'mangol-layertree';

  @Input() map: MangolMap;
  layerGroups: MangolLayergroup[];
  layers: MangolLayer[];

  public ngOnInit(): any {
    this.layerGroups = this.map.getMangolLayerGroups();
    this.layers = this.map.getMangolLayers();
  }

}

@NgModule({
  imports: [
    CommonModule,
    MaterialModule.forRoot(),
    MangolLayergroupModule.forRoot(),
    MangolLayerModule.forRoot()
  ],
  exports: [
    MangolLayertreeComponent
  ],
  declarations: [
    MangolLayertreeComponent
  ]
})
export class MangolLayertreeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MangolLayertreeModule,
      providers: []
    };
  }
}

