import 'hammerjs';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MangolMaterialModule } from '../_shared/material.module';
import { MangolLayerDetailsComponent } from './layer-details.component';
import { MangolLayertreeComponent } from './layertree.component';

@NgModule({
  imports: [
    CommonModule,
    MangolMaterialModule
  ],
  exports: [
    MangolLayertreeComponent,
    MangolLayerDetailsComponent
  ],
  declarations: [
    MangolLayertreeComponent,
    MangolLayerDetailsComponent
  ]
})
export class MangolLayertreeModule { }
