

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Action, ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';

import { MangolComponent } from './mangol.component';
import { ControllersModule } from './modules/controllers/controllers.module';
import { MapModule } from './modules/map/map.module';
import { MeasureService } from './modules/measure/measure.service';
import { TabsModule } from './modules/tabs/tabs.module';
import {
  clearState,
  mangolReducers,
  MangolState,
} from './store/mangol.reducers';


const mangolMetaReducers: MetaReducer<MangolState>[] = [clearState];

export const metaReducers = [
  ...mangolMetaReducers,
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    TabsModule,
    MapModule,
    ControllersModule,
    StoreModule.forRoot(mangolReducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
        strictStateSerializability: false,
        strictActionSerializability: false,
      },
    }),
  ],
  declarations: [MangolComponent],
  providers: [MeasureService],
  exports: [MangolComponent],
})
export class MangolModule {}
