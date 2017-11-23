import { Component, OnInit } from '@angular/core';

import * as ol from 'openlayers';
import MangolConfig from '../../lib/interfaces/mangol-config.interface';

@Component({
  selector: 'mangol-demo-sidebar',
  template: `
      <mangol [config]="config"></mangol>
    `
})
export class DemoSidebarComponent implements OnInit {

  config = {} as MangolConfig;

  public ngOnInit(): any {
    this.config = {
      sidebar: {
        collapsible: true,
        opened: true,
        toolbar: {}
      }
    };
  }

}
