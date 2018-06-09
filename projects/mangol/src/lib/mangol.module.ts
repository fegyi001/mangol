import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MangolComponent } from './mangol.component';

@NgModule({
  imports: [BrowserModule, CommonModule],
  declarations: [MangolComponent],
  exports: [MangolComponent]
})
export class MangolModule {}
