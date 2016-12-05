import { NgModule, ModuleWithProviders } from '@angular/core';

// import {} from './core/index';

import { MangolMapModule } from './map';
import { MangolContainerModule } from './container';
import { MangolSidebarModule } from './sidebar';
import {MangolToolbarModule} from './toolbar';

const MANGOL_MODULES = [
    MangolMapModule,
    MangolContainerModule,
    MangolSidebarModule,
    MangolToolbarModule
];

@NgModule({
    imports: [
        MangolMapModule.forRoot(),
        MangolContainerModule.forRoot(),
        MangolSidebarModule.forRoot()
    ],
    exports: MANGOL_MODULES,
})
export class MangolRootModule { }

@NgModule({
    imports: MANGOL_MODULES,
    exports: MANGOL_MODULES,
})
export class MangolModule {
    static forRoot(): ModuleWithProviders {
        return { ngModule: MangolRootModule };
    }
}