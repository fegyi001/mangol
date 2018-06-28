import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';

import { LayertreeDetailsComponent } from './layertree-details/layertree-details.component';
import { LayertreeComponent } from './layertree.component';
import { LayerGroupComponent } from './layer-group/layer-group.component';
import { LayertreeItemComponent } from './layertree-item/layertree-item.component';
import { LayerComponent } from './layer/layer.component';

@NgModule({
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatDividerModule,
    MatTooltipModule,
    MatListModule
  ],
  declarations: [LayertreeComponent, LayertreeDetailsComponent, LayerGroupComponent, LayertreeItemComponent, LayerComponent],
  exports: [LayertreeComponent]
})
export class LayertreeModule {}
