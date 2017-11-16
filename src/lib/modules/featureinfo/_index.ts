import { MangolFeatureInfoComponent } from './feature-info.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'hammerjs';

import * as ol from 'openlayers';
import { MangolMaterialModule } from '../_shared/mangol-material.module';
import { FeatureIntoService } from './feature-info.service';
import { MangolFeatureInfoTableComponent } from './feature-info-table.component';

@NgModule({
  declarations: [
    MangolFeatureInfoComponent,
    MangolFeatureInfoTableComponent
  ],
  imports: [
    CommonModule,
    MangolMaterialModule,
  ],
  exports: [
    MangolFeatureInfoComponent,
    MangolFeatureInfoTableComponent
  ],
  providers: [
    FeatureIntoService
  ],
  entryComponents: [
  ]
})
export class MangolFeatureInfoModule { }

