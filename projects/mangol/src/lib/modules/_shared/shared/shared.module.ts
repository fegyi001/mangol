import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortenPipe } from './pipes/shorten.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [ShortenPipe],
  exports: [ShortenPipe]
})
export class SharedModule {}
