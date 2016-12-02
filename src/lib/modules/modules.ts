import { NgModule, ModuleWithProviders } from '@angular/core';

// import {} from './core/index';

import { MangolMapModule } from './map/index';
import { MangolContainerModule } from './container/index';

const MANGOL_MODULES = [
    MangolMapModule,
    MangolContainerModule
];

@NgModule({
    imports: [
        MangolMapModule.forRoot(),
        MangolContainerModule.forRoot()
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