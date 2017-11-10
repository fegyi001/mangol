import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'hammerjs';

import { MangolMapComponent } from './map.component';
import { MangolMaterialModule } from '../_shared/mangol-material.module';
import { MangolMousePositionComponent } from './mouse-position.component';

@NgModule({
  imports: [
    CommonModule,
    MangolMaterialModule
  ],
  exports: [
    MangolMapComponent,
    MangolMousePositionComponent
  ],
  declarations: [
    MangolMapComponent,
    MangolMousePositionComponent
  ]
})
export class MangolMapModule { }
