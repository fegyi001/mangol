import 'hammerjs';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MangolMaterialModule } from '../_shared/material.module';
import { MangolMapComponent } from './map.component';
import { MangolMousePositionComponent } from './mouse-position.component';
import { MangolQuickSearchComponent } from './quick-search.component';
import { MangolScaleLineComponent } from './scale-line.component';

@NgModule({
  imports: [
    CommonModule,
    MangolMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MangolMapComponent,
    MangolMousePositionComponent,
    MangolScaleLineComponent,
    MangolQuickSearchComponent
  ],
  declarations: [
    MangolMapComponent,
    MangolMousePositionComponent,
    MangolScaleLineComponent,
    MangolQuickSearchComponent
  ]
})
export class MangolMapModule {}
