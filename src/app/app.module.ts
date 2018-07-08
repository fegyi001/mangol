import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MangolModule } from './../../projects/mangol/src/lib/mangol.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, MangolModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
