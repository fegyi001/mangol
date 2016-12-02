import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
    DemoMapComponent
} from './demos/demo-map';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/demo-map',
        // component: DemoMapComponent,
        pathMatch: 'full'
    }, {
        path: 'demo-map',
        component: DemoMapComponent
    }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
