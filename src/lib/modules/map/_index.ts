import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'hammerjs';

import { MangolMapComponent } from './map.component';
import { MangolMaterialModule } from '../_shared/mangol-material.module';

@NgModule({
  imports: [
    CommonModule,
    MangolMaterialModule
  ],
  exports: [
    MangolMapComponent
  ],
  declarations: [
    MangolMapComponent
  ]
})
export class MangolMapModule { }
