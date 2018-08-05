import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';

import { FeatureinfoResultsComponent } from './components/featureinfo-results/featureinfo-results.component';
import { FeatureinfoSelectComponent } from './components/featureinfo-select/featureinfo-select.component';
import { FeatureinfoComponent } from './featureinfo.component';

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatDividerModule
  ],
  declarations: [
    FeatureinfoComponent,
    FeatureinfoSelectComponent,
    FeatureinfoResultsComponent
  ],
  exports: [FeatureinfoComponent]
})
export class FeatureinfoModule {}
