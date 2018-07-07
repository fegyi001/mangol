import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';

import { MangolModule } from './../../projects/mangol/src/lib/mangol.module';
import { mangolStates } from './../../projects/mangol/src/lib/mangol.state';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MangolModule,
    NgxsLoggerPluginModule.forRoot({ logger: console, collapsed: true }),
    NgxsModule.forRoot(mangolStates)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
