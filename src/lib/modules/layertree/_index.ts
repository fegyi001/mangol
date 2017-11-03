import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'hammerjs';

import { MangolLayertreeComponent } from './layertree.component';
import { MangolLayergroupComponent } from './layergroup.component';
import { MangolLayertreeDetailsComponent } from './layertree-details.component';
import { MangolLayerComponent } from './layer.component';
import { MangolMaterialModule } from '../_shared/mangol-material.module';

@NgModule({
  imports: [
    CommonModule,
    MangolMaterialModule
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
