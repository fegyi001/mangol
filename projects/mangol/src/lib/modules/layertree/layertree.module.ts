import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';

import { LayertreeComponent } from './layertree.component';

@NgModule({
  imports: [CommonModule, MatTreeModule, MatIconModule, MatButtonModule],
  declarations: [LayertreeComponent],
  exports: [LayertreeComponent]
})
export class LayertreeModule {}
