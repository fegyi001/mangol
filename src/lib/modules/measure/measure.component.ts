import { Component, OnInit, Input, HostBinding, NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MangolMap } from './../../core/_index';

@Component({
  selector: 'mangol-measure',
  templateUrl: './measure.component.html'
})
export class MangolMeasureComponent implements OnInit {
  @HostBinding('class') class = 'mangol-measure';

  @Input() map: MangolMap;

  constructor() {

  }

  public ngOnInit(): any {

  }

}
