import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { MangolReady } from './../interfaces/ready.interface';
import { AppService } from '../app.service';
import { MangolConfig } from './../interfaces/config.interface';

@Component({
  selector: 'mangol-demo-measure',
  template: `
      <mangol [config]="config" (mapReady)="onMapReady($event)"></mangol>
      <mangol-pretty-print [code]="snippet"></mangol-pretty-print>
    `
})
export class DemoMeasureComponent implements OnInit, OnDestroy {
  sidebarOpenedSubscription: Subscription;

  config = {} as MangolConfig;
  snippet = `
  import { Component, OnInit } from '@angular/core';

  import { MangolConfig } from 'mangol';

  @Component({
    selector: 'mangol-demo-measure',
    template: '<mangol [config]="config"></mangol>'
  })
  export class DemoMeasureComponent implements OnInit {
    config = {} as MangolConfig;

    ngOnInit() {
      this.config = {
        sidebar: {
          collapsible: true,
          opened: true,
          toolbar: {
            // Minimal configuration
            measure: {}
          }
        }
      };
    }
  }
  `;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.config = {
      sidebar: {
        collapsible: true,
        opened: true,
        toolbar: {
          // Minimal configuration
          measure: {}
        }
      }
    };
  }

  ngOnDestroy() {
    if (this.sidebarOpenedSubscription) {
      this.sidebarOpenedSubscription.unsubscribe();
    }
  }

  onMapReady(evt: MangolReady) {
    this.sidebarOpenedSubscription = this.appService.sidebarOpenedSubject.subscribe(
      opened => {
        if (opened !== null) {
          const map = evt.mapService.getMaps()[0];
          setTimeout(() => {
            map.updateSize();
          }, 500);
        }
      }
    );
  }
}
