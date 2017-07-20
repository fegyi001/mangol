import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { MangolMapModule } from './../map/_index';
import { MangolSidebarModule } from './../sidebar/_index';

import { MangolContainerComponent } from './container.component';

import * as ol from 'openlayers';

@NgModule({
  declarations: [
    MangolContainerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MangolMapModule,
    MangolSidebarModule
  ],
  exports: [
    MangolContainerComponent
  ]
})
export class MangolContainerModule { }
export * from './container.component';

