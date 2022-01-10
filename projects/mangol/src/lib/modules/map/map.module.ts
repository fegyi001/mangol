import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { MapComponent } from './map.component'

@NgModule({
  imports: [CommonModule],
  declarations: [MapComponent],
  exports: [MapComponent]
})
export class MapModule {}
