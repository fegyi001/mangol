import 'hammerjs';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MangolMaterialModule } from '../_shared/material.module';
import { MangolLayertreeModule } from '../layertree/layertree.module';
import { MangolMeasureModule } from '../measure/measure.module';
import { MangolFeatureInfoModule } from './../featureinfo/feature-info.module';
import { MangolPrintModule } from './../print/print.module';
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
  exports: [MangolSidebarComponent],
  declarations: [MangolSidebarComponent, MangolToolbarComponent]
})
export class MangolSidebarModule {}
