import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  DemoMapComponent,
  DemoSidebarComponent,
  DemoLayertreeComponent,
  DemoPrintComponent,
  DemoFullComponent,
  DemoMeasureComponent,
  DemoOsmgwcComponent
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
    path: 'demo-sidebar',
    component: DemoSidebarComponent
  }, {
    path: 'demo-layertree',
    component: DemoLayertreeComponent
  }, {
    path: 'demo-print',
    component: DemoPrintComponent
  }, {
    path: 'demo-measure',
    component: DemoMeasureComponent
  }, {
    path: 'demo-osmgwc',
    component: DemoOsmgwcComponent
  }, {
    path: 'demo-full',
    component: DemoFullComponent
  }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
