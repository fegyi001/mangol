import 'hammerjs';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { MangolMaterialModule } from '../_shared/material.module';
import { MangolFeatureInfoTableDialogComponent } from './feature-info-table-dialog.component';
import { MangolFeatureInfoTableComponent } from './feature-info-table.component';
import { MangolFeatureInfoComponent } from './feature-info.component';
import { FeatureIntoService } from './feature-info.service';

@NgModule({
  declarations: [
    MangolFeatureInfoComponent,
    MangolFeatureInfoTableComponent,
    MangolFeatureInfoTableDialogComponent
  ],
  imports: [
    CommonModule,
    MangolMaterialModule,
    HttpModule
  ],
  exports: [
    MangolFeatureInfoComponent,
    MangolFeatureInfoTableComponent
  ],
  providers: [
    FeatureIntoService
  ],
  entryComponents: [
    MangolFeatureInfoTableDialogComponent
  ]
})
export class MangolFeatureInfoModule { }

