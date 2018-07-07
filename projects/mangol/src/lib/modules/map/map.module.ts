import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { MapComponent } from './map.component';
import { MapState } from '../../store/map.state';

@NgModule({
  imports: [
    CommonModule
    // NgxsModule.forRoot([MapState])
  ],
  declarations: [MapComponent],
  exports: [MapComponent]
})
export class MapModule {}
