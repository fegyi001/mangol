import { NgModule, ModuleWithProviders } from '@angular/core';

// import {} from './core/index';

import { MangolMapModule } from './map';
import { MangolContainerModule } from './container';
import { MangolSidebarModule } from './sidebar';
import { MangolToolbarModule } from './toolbar';
import { MangolLayerModule } from './layer';
import { MangolLayergroupModule } from './layergroup';
import { MangolLayertreeDetailsModule } from './layertree-details';
import { MangolPrintModule } from './print';
import { MangolMeasureModule } from './measure';

const MANGOL_MODULES = [
    MangolMapModule,
    MangolContainerModule,
    MangolSidebarModule,
    MangolToolbarModule,
    MangolLayerModule,
    MangolLayergroupModule,
    MangolLayertreeDetailsModule,
    MangolPrintModule,
    MangolMeasureModule
];

@NgModule({
    imports: [
        MangolMapModule.forRoot(),
        MangolContainerModule.forRoot(),
        MangolSidebarModule.forRoot(),
        MangolLayerModule.forRoot(),
        MangolLayergroupModule.forRoot(),
        MangolLayertreeDetailsModule.forRoot(),
        MangolPrintModule.forRoot(),
        MangolMeasureModule.forRoot()
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
