import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';

import { ConfigState } from '../../projects/mangol/src/lib/store/config.state';
import { FeatureinfoState } from '../../projects/mangol/src/lib/store/featureinfo.state';
import { LayertreeState } from '../../projects/mangol/src/lib/store/layertree.state';
import { MapState } from '../../projects/mangol/src/lib/store/map.state';
import { MeasureState } from '../../projects/mangol/src/lib/store/measure.state';
import { PrintState } from '../../projects/mangol/src/lib/store/print.state';
import { SidebarState } from '../../projects/mangol/src/lib/store/sidebar.state';
import { MangolModule } from './../../projects/mangol/src/lib/mangol.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { mangolStates } from './../../projects/mangol/src/lib/mangol.state';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MangolModule,
    NgxsLoggerPluginModule.forRoot({ logger: console, collapsed: true }),
    NgxsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
