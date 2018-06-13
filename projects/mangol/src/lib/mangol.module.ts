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
import { ConfigState } from './store/config.state';
import { FeatureinfoState } from './store/featureinfo.state';
import { LayertreeState } from './store/layertree.state';
import { MapState } from './store/map.state';
import { MeasureState } from './store/measure.state';
import { PrintState } from './store/print.state';
import { SidebarState } from './store/sidebar.state';

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
