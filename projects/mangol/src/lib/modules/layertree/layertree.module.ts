import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';

import { LayerGroupComponent } from './components/layer-group/layer-group.component';
import { LayerComponent } from './components/layer/layer.component';
import { LayertreeDetailsComponent } from './components/layertree-details/layertree-details.component';
import { LayertreeItemComponent } from './components/layertree-item/layertree-item.component';
import { LayertreeComponent } from './layertree.component';

@NgModule({
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatTooltipModule,
    MatListModule,
    MatBadgeModule,
    MatToolbarModule,
    MatMenuModule
  ],
  declarations: [
    LayertreeComponent,
    LayertreeDetailsComponent,
    LayerGroupComponent,
    LayertreeItemComponent,
    LayerComponent
  ],
  exports: [LayertreeComponent]
})
export class LayertreeModule {}
