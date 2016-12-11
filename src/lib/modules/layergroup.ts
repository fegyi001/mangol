import { Component, OnInit, Input, HostBinding, NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { MangolLayertreeDetailsModule } from './layertree-details';
import { MangolLayerModule } from './layer';

import { MangolLayer, MangolLayergroup } from '../core/_index';


@Component({
  selector: 'mangol-layergroup',
  template: `
      <div>
	        <md-sidenav-layout (mouseover)="showDetails()" (mouseout)="hideDetails()">
	            <md-sidenav #start align="start" opened="{{detailsVisible}}" mode="over">
	                <mangol-layertree-details type="layergroup" [element]="layerGroup"
                  [class.detailsVisible]="detailsVisible" [detailsHeight]="detailsHeight"
                  (elementClicked)="onDetailsElementClicked($event)"></mangol-layertree-details>
	            </md-sidenav>
		    	<div class="element-header" [class.expanded]="expanded">
	                <div class="element-content">
	                    <div class="element-name">{{layerGroup.name | uppercase}}</div>
	                    <div class="element-details">{{nestedLayerGroups.length}} layer group(s), {{nestedLayers.length}} layer(s)</div>
	                </div>
			    </div>
	        </md-sidenav-layout>
            <div class="children" *ngIf="expanded">
                <mangol-layer *ngFor="let l of nestedLayers" [layer]="l"></mangol-layer>
            </div>
	    </div>
    `
})
export class MangolLayergroupComponent implements OnInit {
  @HostBinding('class') class = 'mangol-layergroup';

  @Input() layerGroup: MangolLayergroup;

  expanded: boolean;
  children: any[];
  nestedLayers: MangolLayer[];
  nestedLayerGroups: MangolLayergroup[];
  fontIcon: string;
  detailsVisible: boolean;
  detailsHeight: string;
  childrenVisible: boolean;

  constructor() {
    this.children = [];
    this.nestedLayers = [];
    this.nestedLayerGroups = [];
    this.detailsVisible = false;
    this.detailsHeight = '100%';
  }

  public ngOnInit(): any {
    this.expanded = this.layerGroup.getExpanded();
    this.fontIcon = this.expanded ? 'ms-directory-open' : 'ms-directory';
    this.children = this.layerGroup.getChildren();
    this.childrenVisible = true;
    for (let i = 0; i < this.children.length; i++) {
      let children = this.children[i];
      if (children instanceof MangolLayer) {
        this.nestedLayers.push(children);
      } else if (children instanceof MangolLayergroup) {
        this.nestedLayerGroups.push(children);
      }
    }
  }

  /**Expands or closes the layergroup */
  public toggleExpanded(): void {
    this.expanded = !this.expanded;
    this.fontIcon = this.expanded ? 'ms-directory-open' : 'ms-directory';
  }

  public showDetails(): void {
    this.detailsVisible = true;
  }

  public hideDetails(): void {
    this.detailsVisible = false;
  }

  public onDetailsElementClicked(obj: any) {
    switch (obj.type) {
      case 'expand':
        this.toggleExpanded();
        break;
      case 'visibility':
        this.childrenVisible = !this.childrenVisible;
        for (let i = 0; i < this.nestedLayers.length; i++) {
          this.nestedLayers[i].setVisible(this.childrenVisible);
        }
        for (let i = 0; i < this.nestedLayerGroups.length; i++) {
          // TODO
        }
        break;
    }
  }

}

@NgModule({
  imports: [
    CommonModule,
    MaterialModule.forRoot(),
    MangolLayertreeDetailsModule.forRoot(),
    MangolLayerModule.forRoot()
  ],
  exports: [
    MangolLayergroupComponent
  ],
  declarations: [
    MangolLayergroupComponent
  ]
})
export class MangolLayergroupModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MangolLayergroupModule,
      providers: []
    };
  }
}

