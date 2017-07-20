import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { MangolLayertreeComponent } from './layertree.component';
import { MangolLayergroupComponent } from './layergroup.component';
import { MangolLayertreeDetailsComponent } from './layertree-details.component';
import { MangolLayerComponent } from './layer.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MangolLayertreeComponent
  ],
  declarations: [
    MangolLayertreeComponent,
    MangolLayergroupComponent,
    MangolLayertreeDetailsComponent,
    MangolLayerComponent
  ]
})
export class MangolLayertreeModule { }
