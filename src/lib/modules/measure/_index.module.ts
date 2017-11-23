import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'hammerjs';

import { MangolMeasureComponent } from './measure.component';
import { MangolMaterialModule } from '../_shared/mangol-material.module';

@NgModule({
  imports: [
    CommonModule,
    MangolMaterialModule
  ],
  exports: [
    MangolMeasureComponent
  ],
  declarations: [
    MangolMeasureComponent
  ]
})
export class MangolMeasureModule { }
