import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'hammerjs';

import { MangolLayertreeComponent } from './layertree.component';
import { MangolMaterialModule } from '../_shared/mangol-material.module';
import { MangolLayerDetailsComponent } from './layer-details.component';

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
