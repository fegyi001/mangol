import 'hammerjs';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MangolMaterialModule } from '../_shared/material.module';
import { KeysPipe } from '../_shared/pipes';
import { MangolPrintComponent } from './print.component';

@NgModule({
  imports: [
    CommonModule,
    MangolMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [MangolPrintComponent],
  declarations: [MangolPrintComponent, KeysPipe]
})
export class MangolPrintModule {}
