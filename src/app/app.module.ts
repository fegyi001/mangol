import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { routing, appRoutingProviders } from './app.routing';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { MangolModule } from '../lib/index';

import { MangolDemoComponent } from './app.component';

import {
  DemoMapComponent,
  DemoSidebarComponent,
  DemoLayertreeComponent,
  DemoPrintComponent,
  DemoFullComponent,
  DemoMeasureComponent,
  DemoOsmgwcComponent
} from './demos/_index';

@NgModule({
  declarations: [
    MangolDemoComponent,
    DemoMapComponent,
    DemoSidebarComponent,
    DemoLayertreeComponent,
    DemoPrintComponent,
    DemoFullComponent,
    DemoMeasureComponent,
    DemoOsmgwcComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    MangolModule.forRoot(),
    routing
  ],
  providers: [
    appRoutingProviders,
    { provide: Window, useValue: window },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [MangolDemoComponent]
})
export class MangolDemoModule { }
