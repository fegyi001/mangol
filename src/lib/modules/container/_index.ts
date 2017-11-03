import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'hammerjs';

import { MangolMapModule } from './../map/_index';
import { MangolSidebarModule } from './../sidebar/_index';

import { MangolContainerComponent } from './container.component';

import * as ol from 'openlayers';
import { MangolMaterialModule } from '../_shared/mangol-material.module';

@NgModule({
  declarations: [
    MangolContainerComponent
  ],
  imports: [
    CommonModule,
    MangolMaterialModule,
    MangolMapModule,
    MangolSidebarModule
  ],
  exports: [
    MangolContainerComponent
  ]
})
export class MangolContainerModule { }
