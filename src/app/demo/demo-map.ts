import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { MangolReady } from '../../../dist/src/app/interfaces/ready.interface';
import { AppService } from '../app.service';

@Component({
  selector: 'mangol-demo-map',
  template: `
      <mangol (mapReady)="onMapReady($event)"></mangol>
      <mangol-pretty-print [code]="snippet"></mangol-pretty-print>
    `
})
export class DemoMapComponent implements OnDestroy {
  sidebarOpenedSubscription: Subscription;

  snippet = `
  import { Component } from '@angular/core';

  @Component({
    selector: 'mangol-demo-map',
    template: '<mangol></mangol>'
  })
  export class DemoMapComponent {
  }
  `;

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
}
