import { NgModule, ModuleWithProviders } from '@angular/core';

@NgModule({
    imports: [],
    exports: [],
})
export class MangolCoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MangolCoreModule,
            providers: [],
        };
    }
}