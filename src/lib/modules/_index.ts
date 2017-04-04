import { NgModule, ModuleWithProviders } from '@angular/core';

import { MangolMapModule } from './map/_index';
import { MangolContainerModule } from './container/_index';
import { MangolSidebarModule } from './sidebar/_index';
import { MangolLayertreeModule } from './layertree/_index';
import { MangolPrintModule } from './print/_index';
import { MangolMeasureModule } from './measure/_index';

import { MangolMapService } from './../services/map.service';

const MANGOL_MODULES = [
    MangolMapModule,
    MangolContainerModule,
    MangolSidebarModule,
    MangolLayertreeModule,
    MangolPrintModule,
    MangolMeasureModule
];

@NgModule({
    imports: [
        MangolMapModule.forRoot(),
        MangolContainerModule.forRoot(),
        MangolSidebarModule.forRoot(),
        MangolLayertreeModule.forRoot(),
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
