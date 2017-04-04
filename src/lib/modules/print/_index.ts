import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { MangolPrintComponent } from './components/print.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule.forRoot()
  ],
  exports: [
    MangolPrintComponent
  ],
  declarations: [
    MangolPrintComponent
  ]
})
export class MangolPrintModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MangolPrintModule,
      providers: []
    };
  }
}

