import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { MangolPrintComponent } from './print.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MangolPrintComponent
  ],
  declarations: [
    MangolPrintComponent
  ]
})
export class MangolPrintModule { }
export * from './print.component';

