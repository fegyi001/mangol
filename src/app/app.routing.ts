import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoMapControllersComponent } from './demos/demo-map-controllers';
import { DemoFeatureInfoComponent } from './demos/demo-featureinfo';
import {
  DemoMapComponent,
  DemoSidebarComponent,
  DemoLayertreeComponent,
  DemoPrintComponent,
  DemoFullComponent,
  DemoMeasureComponent,
  // DemoOsmgwcComponent
} from './demos/_index';

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
