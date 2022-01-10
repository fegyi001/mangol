import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { DemoControllersComponent } from './pages/demo-controllers/demo-controllers.component'
import { DemoFeatureinfoComponent } from './pages/demo-featureinfo/demo-featureinfo.component'
import { DemoFullComponent } from './pages/demo-full/demo-full.component'
import { DemoHomeComponent } from './pages/demo-home/demo-home.component'
import { DemoLayertreeComponent } from './pages/demo-layertree/demo-layertree.component'
import { DemoMapComponent } from './pages/demo-map/demo-map.component'
import { DemoMeasureComponent } from './pages/demo-measure/demo-measure.component'
import { DemoPrintComponent } from './pages/demo-print/demo-print.component'
import { DemoSidebarComponent } from './pages/demo-sidebar/demo-sidebar.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/demo-home',
    pathMatch: 'full',
    data: { animation: { page: 'homePage' } }
  },
  {
    path: 'demo-home',
    component: DemoHomeComponent,
    data: { animation: { page: 'demo-home' } }
  },
  {
    path: 'demo-map',
    component: DemoMapComponent,
    data: { animation: { page: 'demo-map' } }
  },
  {
    path: 'demo-controllers',
    component: DemoControllersComponent,
    data: { animation: { page: 'demo-controllers' } }
  },
  {
    path: 'demo-sidebar',
    component: DemoSidebarComponent,
    data: { animation: { page: 'demo-sidebar' } }
  },
  {
    path: 'demo-layertree',
    component: DemoLayertreeComponent,
    data: { animation: { page: 'demo-layertree' } }
  },
  {
    path: 'demo-featureinfo',
    component: DemoFeatureinfoComponent,
    data: { animation: { page: 'demo-featureinfo' } }
  },
  {
    path: 'demo-print',
    component: DemoPrintComponent,
    data: { animation: { page: 'demo-print' } }
  },
  {
    path: 'demo-measure',
    component: DemoMeasureComponent,
    data: { animation: { page: 'demo-measure' } }
  },
  {
    path: 'demo-full',
    component: DemoFullComponent,
    data: { animation: { page: 'demo-full' } }
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
