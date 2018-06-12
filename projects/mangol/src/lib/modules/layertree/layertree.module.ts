import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayertreeComponent } from './layertree.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LayertreeComponent],
  exports: [LayertreeComponent]
})
export class LayertreeModule {}
