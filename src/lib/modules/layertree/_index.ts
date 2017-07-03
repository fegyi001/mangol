import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { MangolLayertreeComponent } from './components/layertree.component';
import { MangolLayergroupComponent } from './components/layergroup.component';
import { MangolLayertreeDetailsComponent } from './components/layertree-details.component';
import { MangolLayerComponent } from './components/layer.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MangolLayertreeComponent
  ],
  declarations: [
    MangolLayertreeComponent,
    MangolLayergroupComponent,
    MangolLayertreeDetailsComponent,
    MangolLayerComponent
  ]
})
export class MangolLayertreeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MangolLayertreeModule,
      providers: []
    };
  }
}