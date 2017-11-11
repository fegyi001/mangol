import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'hammerjs';

import { MangolMapComponent } from './map.component';
import { MangolMaterialModule } from '../_shared/mangol-material.module';
import { MangolMousePositionComponent } from './mouse-position.component';
import { MangolScaleLineComponent } from './scale-line.component';
import { MangolQuickSearchComponent } from './quick-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
export class MangolMapModule { }
