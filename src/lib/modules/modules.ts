import { NgModule, ModuleWithProviders } from '@angular/core';

// import {} from './core/index';

import { MangolMapModule } from './map/index';

const MANGOL_MODULES = [
    MangolMapModule
];

@NgModule({
    imports: [
        MangolMapModule.forRoot()
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