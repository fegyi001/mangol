import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AppService } from './../app.service';
import { MangolConfig } from './../interfaces/config.interface';
import { MangolReady } from './../interfaces/ready.interface';

@Component({
  selector: 'mangol-demo-sidebar',
  template: `
    <mangol [config]="config" (mapReady)="onMapReady($event)"></mangol>
    <mangol-pretty-print [code]="snippet"></mangol-pretty-print>
  `
})
export class DemoSidebarComponent implements OnInit, OnDestroy {
  sidebarOpenedSubscription: Subscription;

  snippet = `
  import { Component, OnInit } from '@angular/core';

  import { MangolConfig } from 'mangol';

  @Component({
    selector: 'mangol-demo-sidebar',
    template: '<mangol [config]="config"></mangol>'
  })
  export class DemoSidebarComponent implements OnInit {

    config = {} as MangolConfig;

    public ngOnInit(): any {
      this.config = {
        // Minimal configuration
        sidebar: {
          collapsible: true,
          opened: true,
          toolbar: {}
        }
      };
    }
  }

  `;

  config = {} as MangolConfig;

  constructor(private appService: AppService) {}

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

  public ngOnInit(): any {
    this.config = {
      // Minimal configuration
      sidebar: {
        collapsible: true,
        opened: true,
        toolbar: {}
      }
    };
  }
}
