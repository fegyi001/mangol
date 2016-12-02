import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MangolMapComponent} from './map.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MangolMapComponent
  ],
  declarations: [
    MangolMapComponent
  ]
})
export class MangolMapModule { 
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MangolMapModule,
      providers: []
    };
  }
}
