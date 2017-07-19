import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { routing, appRoutingProviders } from './app.routing';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import 'hammerjs';

import { MangolModule } from './../../index';

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
    MaterialModule,
    MangolModule,
    routing
  ],
  providers: [
    appRoutingProviders,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [MangolDemoComponent]
})
export class MangolDemoModule { }
