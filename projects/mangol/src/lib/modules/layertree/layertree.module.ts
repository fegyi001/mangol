import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';

import { LayertreeComponent } from './layertree.component';
import { LayertreeDetailsComponent } from './layertree-details/layertree-details.component';

@NgModule({
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatExpansionModule
  ],
  declarations: [LayertreeComponent, LayertreeDetailsComponent],
  exports: [LayertreeComponent]
})
export class LayertreeModule {}
