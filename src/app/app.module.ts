import { HashLocationStrategy, LocationStrategy } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatTabsModule } from '@angular/material/tabs'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MangolService } from '../../projects/mangol/src/lib/mangol.service'
import { MangolModule } from './../../projects/mangol/src/lib/mangol.module'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { ApiComponent } from './etc/api/api.component'
import { PrettyPrintComponent } from './etc/pretty-print/pretty-print.component'
import { DemoControllersComponent } from './pages/demo-controllers/demo-controllers.component'
import { DemoFeatureinfoComponent } from './pages/demo-featureinfo/demo-featureinfo.component'
import { DemoFullComponent } from './pages/demo-full/demo-full.component'
import { DemoHomeComponent } from './pages/demo-home/demo-home.component'
import { DemoLayertreeComponent } from './pages/demo-layertree/demo-layertree.component'
import { DemoMapComponent } from './pages/demo-map/demo-map.component'
import { DemoMeasureComponent } from './pages/demo-measure/demo-measure.component'
import { DemoPrintComponent } from './pages/demo-print/demo-print.component'
import { DemoSidebarComponent } from './pages/demo-sidebar/demo-sidebar.component'

@NgModule({
  declarations: [
    AppComponent,
    DemoHomeComponent,
    DemoMapComponent,
    DemoLayertreeComponent,
    PrettyPrintComponent,
    DemoFullComponent,
    ApiComponent,
    DemoFeatureinfoComponent,
    DemoSidebarComponent,
    DemoControllersComponent,
    DemoMeasureComponent,
    DemoPrintComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    AppRoutingModule,
    MangolModule
  ],
  providers: [
    MangolService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
