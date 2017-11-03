import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'hammerjs';

import { MangolPrintComponent } from './print.component';
import { MangolMaterialModule } from '../_shared/mangol-material.module';

@NgModule({
  imports: [
    CommonModule,
    MangolMaterialModule
  ],
  exports: [
    MangolPrintComponent
  ],
  declarations: [
    MangolPrintComponent
  ]
})
export class MangolPrintModule { }
