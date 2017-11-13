import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'hammerjs';

import { MangolMapModule } from './../map/_index';
import { MangolSidebarModule } from './../sidebar/_index';

import { MangolContainerComponent } from './container.component';

import * as ol from 'openlayers';
import { MangolMaterialModule } from '../_shared/mangol-material.module';
import { MangolDialogComponent } from './mangol-dialog.component';

@NgModule({
  declarations: [
    MangolContainerComponent,
    MangolDialogComponent
  ],
  imports: [
    CommonModule,
    MangolMaterialModule,
    MangolMapModule,
    MangolSidebarModule
  ],
  exports: [
    MangolContainerComponent,
    MangolDialogComponent
  ],
  entryComponents: [
    MangolDialogComponent
  ]
})
export class MangolContainerModule { }

