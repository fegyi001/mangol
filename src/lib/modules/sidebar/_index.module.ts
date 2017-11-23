import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'hammerjs';

import { MangolMaterialModule } from '../_shared/mangol-material.module';
import { MangolLayertreeModule } from './../layertree/_index.module';
import { MangolPrintModule } from './../print/_index.module';
import { MangolMeasureModule } from './../measure/_index.module';
import { MangolFeatureInfoModule } from '../featureinfo/_index.module';

import { MangolSidebarComponent } from './sidebar.component';
import { MangolToolbarComponent } from './toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    MangolMaterialModule,
    MangolLayertreeModule,
    MangolPrintModule,
    MangolMeasureModule,
    MangolFeatureInfoModule
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
