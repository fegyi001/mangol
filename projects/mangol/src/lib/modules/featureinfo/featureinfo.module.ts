import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { FeatureinfoResultsComponent } from './components/featureinfo-results/featureinfo-results.component';
import { FeatureinfoSelectComponent } from './components/featureinfo-select/featureinfo-select.component';
import { FeatureinfoComponent } from './featureinfo.component';
import { FeatureinfoService } from './featureinfo.service';

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatDividerModule,
    HttpClientModule,
    MatExpansionModule
  ],
  declarations: [
    FeatureinfoComponent,
    FeatureinfoSelectComponent,
    FeatureinfoResultsComponent
  ],
  exports: [FeatureinfoComponent],
  providers: [FeatureinfoService]
})
export class FeatureinfoModule {}
