import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MangolModule } from './../../projects/mangol/src/lib/mangol.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoHomeComponent } from './pages/demo-home/demo-home.component';
import { DemoLayertreeComponent } from './pages/demo-layertree/demo-layertree.component';
import { DemoMapComponent } from './pages/demo-map/demo-map.component';
import { PrettyPrintComponent } from './pages/pretty-print/pretty-print.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoHomeComponent,
    DemoMapComponent,
    DemoLayertreeComponent,
    PrettyPrintComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    AppRoutingModule,
    MangolModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
