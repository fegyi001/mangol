import { MangolConfig } from './../interfaces/config.interface';
import { Component, OnInit } from '@angular/core';

import * as ol from 'openlayers';

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
