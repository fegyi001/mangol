import 'hammerjs';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MangolMaterialModule } from '../_shared/material.module';
import { MangolSidebarModule } from '../sidebar/sidebar.module';
import { MangolMapModule } from './../map/map.module';
import { MangolDialogComponent } from './mangol-dialog.component';
import { MangolComponent } from './mangol.component';

@NgModule({
  imports: [
    CommonModule,
    MangolMaterialModule,
    MangolMapModule,
    MangolSidebarModule
  ],
  declarations: [MangolComponent, MangolDialogComponent],
  exports: [MangolComponent, MangolDialogComponent],
  entryComponents: [MangolDialogComponent]
})
export class MangolModule {}
