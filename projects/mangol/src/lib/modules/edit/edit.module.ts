import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { EditComponent } from './edit.component'

@NgModule({
  imports: [CommonModule],
  declarations: [EditComponent],
  exports: [EditComponent]
})
export class EditModule {}
