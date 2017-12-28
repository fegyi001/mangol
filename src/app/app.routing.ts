import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DemoFeatureInfoComponent } from './demo/demo-featureinfo';
import { DemoFullComponent } from './demo/demo-full';
import { DemoLayertreeComponent } from './demo/demo-layertree';
import { DemoMapComponent } from './demo/demo-map';
import { DemoMapControllersComponent } from './demo/demo-map-controllers';
import { DemoMeasureComponent } from './demo/demo-measure';
import { DemoPrintComponent } from './demo/demo-print';
import { DemoSidebarComponent } from './demo/demo-sidebar';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/demo-map',
    // component: DemoMapComponent,
    pathMatch: 'full'
  }, {
    path: 'demo-map',
    component: DemoMapComponent
  }, {
    path: 'demo-map-controllers',
    component: DemoMapControllersComponent
  }, {
    path: 'demo-sidebar',
    component: DemoSidebarComponent
  }, {
    path: 'demo-layertree',
    component: DemoLayertreeComponent
  }, {
    path: 'demo-featureinfo',
    component: DemoFeatureInfoComponent
  }, {
    path: 'demo-print',
    component: DemoPrintComponent
  }, {
    path: 'demo-measure',
    component: DemoMeasureComponent
  // }, {
  //   path: 'demo-osmgwc',
  //   component: DemoOsmgwcComponent
  }, {
    path: 'demo-full',
    component: DemoFullComponent
  }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
