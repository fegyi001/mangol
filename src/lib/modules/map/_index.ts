import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'hammerjs';

import { MangolMapComponent } from './map.component';
import { MangolMaterialModule } from '../_shared/mangol-material.module';
import { MangolMousePositionComponent } from './mouse-position.component';
import { MangolScaleLineComponent } from './scale-line.component';

@NgModule({
  imports: [
    CommonModule,
    MangolMaterialModule
  ],
  exports: [
    MangolMapComponent,
    MangolMousePositionComponent,
    MangolScaleLineComponent
  ],
  declarations: [
    MangolMapComponent,
    MangolMousePositionComponent,
    MangolScaleLineComponent
  ]
})
export class MangolMapModule { }
