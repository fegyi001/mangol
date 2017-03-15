import { Component, OnInit, Input, HostBinding, NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { MangolLayertreeDetailsModule } from './layertree-details';

import { MangolLayer } from '../core/_index';


@Component({
  selector: 'mangol-layer',
  template: `
      <div>
        	<md-sidenav-container (mouseover)="showDetails()" (mouseout)="hideDetails()">
	            <md-sidenav #end align="end" opened="{{detailsVisible}}" mode="over">
	                <mangol-layertree-details type="layer" [element]="layer"
                    [class.detailsVisible]="detailsVisible" [detailsHeight]="detailsHeight"
                    (elementClicked)="onDetailsElementClicked($event)"></mangol-layertree-details>
	            </md-sidenav>
		    	<div class="element-header">
	                <div class="element-content">
	                    <div class="element-name">{{layer.name}}</div>
	                </div>
			    </div>
	        </md-sidenav-container>
	    </div>
    `
})
export class MangolLayerComponent implements OnInit {
  @HostBinding('class') class = 'mangol-layer';

  @Input() layer: MangolLayer;

  fontIcon: string;
  detailsVisible: boolean;
  detailsHeight: string;

  constructor() {
    this.detailsVisible = false;
    this.detailsHeight = '100%';
  }

  public ngOnInit(): any {
    this.fontIcon = this.layer.getVisible() ? 'ms-tiles' : 'ms-tiles-o';
  }

  public toggleVisibility(): any {
    this.layer.setVisible(!this.layer.getVisible());
    this.fontIcon = this.layer.getVisible() ? 'ms-tiles' : 'ms-tiles-o';
  }

  public showDetails(): void {
    this.detailsVisible = true;
  }

  public hideDetails(): void {
    this.detailsVisible = false;
  }

  public onDetailsElementClicked(obj: any) {
    switch (obj.type) {
      case 'visibility':
        this.toggleVisibility();
        break;
    }
  }

}

@NgModule({
  imports: [
    CommonModule,
    MaterialModule.forRoot(),
    MangolLayertreeDetailsModule.forRoot()
  ],
  exports: [
    MangolLayerComponent
  ],
  declarations: [
    MangolLayerComponent
  ]
})
export class MangolLayerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MangolLayerModule,
      providers: []
    };
  }
}

