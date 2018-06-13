import 'hammerjs';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';

import { MangolComponent } from './mangol.component';
import { ControllersModule } from './modules/controllers/controllers.module';
import { MapModule } from './modules/map/map.module';
import { TabsModule } from './modules/tabs/tabs.module';
import { ConfigState } from './store/config.actions';
import { FeatureinfoState } from './store/featureinfo.actions';
import { LayertreeState } from './store/layertree.actions';
import { MapState } from './store/map.actions';
import { MeasureState } from './store/measure.actions';
import { PrintState } from './store/print.actions';
import { SidebarState } from './store/sidebar.actions';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    TabsModule,
    BrowserAnimationsModule,
    MapModule,
    ControllersModule,
    NgxsLoggerPluginModule.forRoot(),
    NgxsModule.forRoot([
      MapState,
      SidebarState,
      ConfigState,
      LayertreeState,
      FeatureinfoState,
      MeasureState,
      PrintState
    ])
  ],
  declarations: [MangolComponent],
  exports: [MangolComponent]
})
export class MangolModule {}
