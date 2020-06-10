import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SharedModule } from './../_shared/shared/shared.module';
import { FeatureinfoResultsComponent } from './components/featureinfo-results/featureinfo-results.component';
import { FeatureinfoSelectComponent } from './components/featureinfo-select/featureinfo-select.component';
import { FeatureinfoTableDialogComponent } from './components/featureinfo-table-dialog/featureinfo-table-dialog.component';
import { FeaturenfoTableComponent } from './components/featurenfo-table/featurenfo-table.component';
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
    MatExpansionModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatToolbarModule,
    MatTooltipModule,
    SharedModule,
  ],
  declarations: [
    FeatureinfoComponent,
    FeatureinfoSelectComponent,
    FeatureinfoResultsComponent,
    FeaturenfoTableComponent,
    FeatureinfoTableDialogComponent,
  ],
  entryComponents: [FeatureinfoTableDialogComponent],
  exports: [FeatureinfoComponent],
  providers: [FeatureinfoService],
})
export class FeatureinfoModule {}
