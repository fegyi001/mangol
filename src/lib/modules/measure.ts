import { Component, OnInit, Input, HostBinding, NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { MangolMap } from '../core/_index';


@Component({
  selector: 'mangol-measure',
  template: `
      <div>
      	<div class="dev">Measure options will come soon.</div>
      </div>
    `
})
export class MangolMeasureComponent implements OnInit {
  @HostBinding('class') class = 'mangol-measure';

  @Input() map: MangolMap;

  constructor() {

  }

  public ngOnInit(): any {

  }

}

@NgModule({
  imports: [
    CommonModule,
    MaterialModule.forRoot()
  ],
  exports: [
    MangolMeasureComponent
  ],
  declarations: [
    MangolMeasureComponent
  ]
})
export class MangolMeasureModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MangolMeasureModule,
      providers: []
    };
  }
}

