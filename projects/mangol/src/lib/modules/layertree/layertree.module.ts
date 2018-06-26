import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTreeModule } from '@angular/material/tree';

import { LayertreeDetailsComponent } from './layertree-details/layertree-details.component';
import { LayertreeComponent } from './layertree.component';

@NgModule({
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSlideToggleModule
  ],
  declarations: [LayertreeComponent, LayertreeDetailsComponent],
  exports: [LayertreeComponent]
})
export class LayertreeModule {}
