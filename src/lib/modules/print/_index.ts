import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import 'hammerjs';

import { MangolPrintComponent } from './print.component';
import { MangolMaterialModule } from '../_shared/mangol-material.module';

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
    MangolPrintComponent
  ]
})
export class MangolPrintModule { }
