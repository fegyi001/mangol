import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
    DemoMapComponent,
    DemoSidebarComponent
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
    }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
