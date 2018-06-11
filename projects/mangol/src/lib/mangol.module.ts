import { MapState } from './store/map/map.actions';
import 'hammerjs';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { MangolComponent } from './mangol.component';
import { MapModule } from './modules/map/map.module';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MapModule,
    NgxsModule.forRoot([MapState]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  declarations: [MangolComponent],
  exports: [MangolComponent]
})
export class MangolModule {}
