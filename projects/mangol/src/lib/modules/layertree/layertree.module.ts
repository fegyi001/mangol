import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { MatTooltipModule } from '@angular/material/tooltip';

import { LayertreeDetailsComponent } from './layertree-details/layertree-details.component';
import { LayertreeComponent } from './layertree.component';

@NgModule({
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatDividerModule,
    MatTooltipModule
  ],
  declarations: [LayertreeComponent, LayertreeDetailsComponent],
  exports: [LayertreeComponent]
})
export class LayertreeModule {}
