import 'hammerjs';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Action, ActionReducer, StoreModule } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';

import { MangolComponent } from './mangol.component';
import { ControllersModule } from './modules/controllers/controllers.module';
import { MapModule } from './modules/map/map.module';
import { MeasureService } from './modules/measure/measure.service';
import { TabsModule } from './modules/tabs/tabs.module';
import { mangolReducers, MangolState } from './store/mangol.reducers';

export function logger(reducer: ActionReducer<MangolState, Action>): any {
  return storeLogger({
    collapsed: true,
    filter: {
      // whitelist: environment.production ? [''] : []
      blacklist: [
        '[Controllers] Set Position Coordinates',
        '[Controllers] Set Rotation Value',
        '[Cursor] Set Mode',
        '[Cursor] Set Visible'
      ]
    }
  })(reducer);
}

export const metaReducers = [logger];

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
    StoreModule.forRoot(mangolReducers, { metaReducers })
    // EffectsModule.forRoot([NavigationEffects, EditEffects])
  ],
  declarations: [MangolComponent],
  providers: [MeasureService],
  exports: [MangolComponent]
})
export class MangolModule {}
