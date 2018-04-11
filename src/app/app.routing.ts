import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DemoFeatureInfoComponent } from './demo/demo-featureinfo';
import { DemoFullComponent } from './demo/demo-full';
import { DemoHomeComponent } from './demo/demo-home.component';
import { DemoLayertreeComponent } from './demo/demo-layertree';
import { DemoMapComponent } from './demo/demo-map';
import { DemoMapControllersComponent } from './demo/demo-map-controllers';
import { DemoMeasureComponent } from './demo/demo-measure';
import { DemoPrintComponent } from './demo/demo-print';
import { DemoSidebarComponent } from './demo/demo-sidebar';

const appRoutes: Routes = [
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
    path: 'demo-map-controllers',
    component: DemoMapControllersComponent,
    data: { animation: { page: 'demo-map-controllers' } }
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
    component: DemoFeatureInfoComponent,
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
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
