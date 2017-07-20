import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { MangolLayertreeModule } from './../layertree/_index';
import { MangolPrintModule } from './../print/_index';
import { MangolMeasureModule } from './../measure/_index';

import { MangolSidebarComponent } from './sidebar.component';
import { MangolToolbarComponent } from './toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MangolLayertreeModule,
    MangolPrintModule,
    MangolMeasureModule
  ],
  exports: [
    MangolSidebarComponent
  ],
  declarations: [
    MangolSidebarComponent,
    MangolToolbarComponent
  ]
})
export class MangolSidebarModule { }
export * from './sidebar.component';
export * from './toolbar.component';
