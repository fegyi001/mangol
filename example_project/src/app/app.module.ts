import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MangolModule } from 'mangol/src/lib/modules/mangol.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MangolModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
