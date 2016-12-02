import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import {MangolContainerComponent} from './container.component';
import {MangolMapModule} from '../map/map.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule.forRoot(),
    MangolMapModule
  ],
  exports: [
    MangolContainerComponent
  ],
  declarations: [
    MangolContainerComponent,
  ]
})
export class MangolContainerModule { 
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MangolContainerModule,
      providers: []
    };
  }
}
