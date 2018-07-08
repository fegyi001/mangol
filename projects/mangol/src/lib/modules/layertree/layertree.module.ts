import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';

import { SharedModule } from '../_shared/shared/shared.module';
import { LayerDetailsComponent } from './components/layer-details/layer-details.component';
import { LegendComponent } from './components/layer-details/legend/legend.component';
import { TransparencyComponent } from './components/layer-details/transparency/transparency.component';
import { LayerGroupComponent } from './components/layer-group/layer-group.component';
import { LayerComponent } from './components/layer/layer.component';
import { LayertreeItemComponent } from './components/layertree-item/layertree-item.component';
import { LayertreeComponent } from './layertree.component';
import { DescriptionComponent } from './components/layer-details/description/description.component';

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
    MatSliderModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    MatDialogModule,
    SharedModule
  ],
  declarations: [
    LayertreeComponent,
    LayerGroupComponent,
    LayertreeItemComponent,
    LayerComponent,
    LayerDetailsComponent,
    TransparencyComponent,
    LegendComponent,
    DescriptionComponent
  ],
  entryComponents: [LayerDetailsComponent],
  exports: [LayertreeComponent]
})
export class LayertreeModule {}
