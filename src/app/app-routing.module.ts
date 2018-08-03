import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DemoFullComponent } from './pages/demo-full/demo-full.component';
import { DemoHomeComponent } from './pages/demo-home/demo-home.component';
import { DemoLayertreeComponent } from './pages/demo-layertree/demo-layertree.component';
import { DemoMapComponent } from './pages/demo-map/demo-map.component';

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
  // {
  //   path: 'demo-map-controllers',
  //   component: DemoMapControllersComponent,
  //   data: { animation: { page: 'demo-map-controllers' } }
  // },
  {
    path: 'demo-layertree',
    component: DemoLayertreeComponent,
    data: { animation: { page: 'demo-layertree' } }
  },
  // {
  //   path: 'demo-featureinfo',
  //   component: DemoFeatureInfoComponent,
  //   data: { animation: { page: 'demo-featureinfo' } }
  // },
  // {
  //   path: 'demo-print',
  //   component: DemoPrintComponent,
  //   data: { animation: { page: 'demo-print' } }
  // },
  // {
  //   path: 'demo-measure',
  //   component: DemoMeasureComponent,
  //   data: { animation: { page: 'demo-measure' } }
  // },
  {
    path: 'demo-full',
    component: DemoFullComponent,
    data: { animation: { page: 'demo-full' } }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
