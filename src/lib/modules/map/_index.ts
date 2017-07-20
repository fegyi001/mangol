import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { MangolMapComponent } from './map.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MangolMapComponent
  ],
  declarations: [
    MangolMapComponent
  ]
})
export class MangolMapModule { }
export * from './map.component';
