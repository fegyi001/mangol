import { ConfigState } from './store/config.actions';
import 'hammerjs';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';

import { MangolComponent } from './mangol.component';
import { ControllersModule } from './modules/controllers/controllers.module';
import { MapModule } from './modules/map/map.module';
import { TabsModule } from './modules/tabs/tabs.module';
import { MapState } from './store/map.actions';
import { SidebarState } from './store/sidebar.actions';
import { LayertreeState } from './store/layertree.actions';

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
    NgxsModule.forRoot([MapState, SidebarState, ConfigState, LayertreeState]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  declarations: [MangolComponent],
  exports: [MangolComponent]
})
export class MangolModule {}
