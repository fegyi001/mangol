import 'hammerjs';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MangolMaterialModule } from '../_shared/material.module';
import { MangolMeasureComponent } from './measure.component';

@NgModule({
  imports: [CommonModule, MangolMaterialModule],
  exports: [MangolMeasureComponent],
  declarations: [MangolMeasureComponent]
})
export class MangolMeasureModule {}
