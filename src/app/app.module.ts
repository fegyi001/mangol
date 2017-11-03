import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import 'hammerjs';

import { MangolModule } from './../lib/modules/_index';

import { MangolDemoComponent } from './app.component';
import { MangolMaterialModule } from '../lib/modules/_shared/mangol-material.module';

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
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MangolMaterialModule,
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
