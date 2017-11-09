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
  MatSlideToggleModule
} from '@angular/material';

@NgModule({
  imports: [
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
    MatSlideToggleModule
  ],
  exports: [
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
    MatSlideToggleModule
  ]
})
export class MangolMaterialModule { }
