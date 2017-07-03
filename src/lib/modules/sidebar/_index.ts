import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { MangolLayertreeModule } from './../layertree/_index';
import { MangolPrintModule } from './../print/_index';
import { MangolMeasureModule } from './../measure/_index';

import { MangolSidebarComponent } from './components/sidebar.component';
import { MangolToolbarComponent } from './components/toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MangolLayertreeModule.forRoot(),
    MangolPrintModule.forRoot(),
    MangolMeasureModule.forRoot()
  ],
  exports: [
    MangolSidebarComponent
  ],
  declarations: [
    MangolSidebarComponent,
    MangolToolbarComponent
  ]
})
export class MangolSidebarModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MangolSidebarModule,
      providers: []
    };
  }
}
