import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeasureComponent } from './measure.component';

@NgModule({
  imports: [CommonModule],
  declarations: [MeasureComponent],
  exports: [MeasureComponent]
})
export class MeasureModule {}
