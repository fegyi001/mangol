import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatTooltipModule,
  MatSidenavModule,
  MatGridListModule,
  MatListModule,
  MatExpansionModule,
  MatCardModule,
  MatSliderModule,
  MatMenuModule,
  MatSlideToggleModule,
  MatChipsModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatInputModule,
  MatDialogModule,
  MatSelectModule,
  MatTableModule,
  MatSnackBarModule
} from '@angular/material';

const materialModules: any[] = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatTooltipModule,
  MatSidenavModule,
  MatGridListModule,
  MatListModule,
  MatExpansionModule,
  MatCardModule,
  MatSliderModule,
  MatMenuModule,
  MatSlideToggleModule,
  MatChipsModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatInputModule,
  MatDialogModule,
  MatSelectModule,
  MatTableModule,
  MatSnackBarModule
];

@NgModule({
  imports: materialModules,
  exports: materialModules
})
export class MangolMaterialModule { }
