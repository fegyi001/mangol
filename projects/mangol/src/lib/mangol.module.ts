import 'hammerjs';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MangolComponent } from './mangol.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    BrowserAnimationsModule
  ],
  declarations: [MangolComponent],
  exports: [MangolComponent]
})
export class MangolModule {}
