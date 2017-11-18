import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'hammerjs';

import { MangolPrintComponent } from './print.component';
import { MangolMaterialModule } from '../_shared/mangol-material.module';
import { KeysPipe } from '../_shared/pipes';

@NgModule({
  imports: [
    CommonModule,
    MangolMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MangolPrintComponent
  ],
  declarations: [
    MangolPrintComponent,
    KeysPipe
  ]
})
export class MangolPrintModule { }
