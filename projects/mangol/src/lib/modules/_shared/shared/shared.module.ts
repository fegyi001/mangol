import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KeysPipe } from './pipes/keys.pipe';
import { ShortenPipe } from './pipes/shorten.pipe';
import { StyleService } from './services/style.service';

@NgModule({
  imports: [CommonModule],
  declarations: [ShortenPipe, KeysPipe],
  exports: [ShortenPipe, KeysPipe],
  providers: [StyleService]
})
export class SharedModule {}
