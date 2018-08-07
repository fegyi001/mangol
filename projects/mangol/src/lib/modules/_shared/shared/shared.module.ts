import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortenPipe } from './pipes/shorten.pipe';
import { StyleService } from './services/style.service';

@NgModule({
  imports: [CommonModule],
  declarations: [ShortenPipe],
  exports: [ShortenPipe],
  providers: [StyleService]
})
export class SharedModule {}
