import { Component, Input, OnInit, HostBinding, NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { MangolToolbarModule } from './toolbar';
// import { Ng2ol3LayertreeModule } from '../layertree/layertree.module';
// import { Ng2ol3MeasureModule } from '../measure/measure.module';
// import { Ng2ol3PrintModule } from '../print/print.module';

import { MangolMap } from '../core/_index';

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
	              <!--<ng2ol3-layertree 
	                  *ngIf="hasLayertree && activeElement.type=='layertree'" 
	                  [map]="map">
	              </ng2ol3-layertree>
	              <ng2ol3-measure
	              	  *ngIf="hasMeasure && activeElement.type=='measure'"
	                  [map]="map">
	              </ng2ol3-measure>
	              <ng2ol3-print 
	              	  *ngIf="hasPrint && activeElement.type=='print'"
	                  [map]="map"></ng2ol3-print>-->
              </div>	
          </div>
      </div>
    `,
})
export class MangolSidebarComponent implements OnInit {
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
        this.hasLayertree = this.hasToolbar && this.options.toolbar.hasOwnProperty('layertree');
        this.hasMeasure = this.hasToolbar && this.options.toolbar.hasOwnProperty('measure');
        this.hasPrint = this.hasToolbar && this.options.toolbar.hasOwnProperty('print');
        this.map.updateSize();
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
        MangolToolbarModule
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
