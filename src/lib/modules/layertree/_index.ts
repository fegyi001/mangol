import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'hammerjs';

import { MangolLayertreeComponent } from './layertree.component';
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
    MangolLayertreeComponent
  ]
})
export class MangolLayertreeModule { }
