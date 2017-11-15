import { MangolFeatureInfoComponent } from './feature-info.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'hammerjs';

import * as ol from 'openlayers';
import { MangolMaterialModule } from '../_shared/mangol-material.module';
import { FeatureIntoService } from './feature-info.service';

@NgModule({
  declarations: [
    MangolFeatureInfoComponent
  ],
  imports: [
    CommonModule,
    MangolMaterialModule,
  ],
  exports: [
    MangolFeatureInfoComponent
  ],
  providers: [
    FeatureIntoService
  ],
  entryComponents: [
  ]
})
export class MangolFeatureInfoModule { }

