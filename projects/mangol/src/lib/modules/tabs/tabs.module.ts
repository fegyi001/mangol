import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { EditModule } from '../edit/edit.module';
import { LayertreeModule } from '../layertree/layertree.module';
import { MeasureModule } from '../measure/measure.module';
import { PrintModule } from '../print/print.module';
import { FeatureinfoModule } from './../featureinfo/featureinfo.module';
import { TabsComponent } from './tabs.component';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    PrintModule,
    LayertreeModule,
    MeasureModule,
    EditModule,
    MeasureModule,
    FeatureinfoModule
  ],
  declarations: [TabsComponent],
  exports: [TabsComponent]
})
export class TabsModule {}
