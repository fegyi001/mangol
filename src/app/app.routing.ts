import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  DemoMapComponent,
  DemoSidebarComponent,
  DemoLayertreeComponent
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
  }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
