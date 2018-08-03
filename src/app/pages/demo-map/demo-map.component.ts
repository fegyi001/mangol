import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AppService } from '../../app.service';
import { MangolService } from './../../../../projects/mangol/src/lib/mangol.service';

@Component({
  selector: 'app-demo-map',
  templateUrl: './demo-map.component.html',
  styleUrls: ['./demo-map.component.scss']
})
export class DemoMapComponent implements OnInit, OnDestroy {
  sidebarOpenedSubscription: Subscription;
  code = `
  import { Component } from '@angular/core';

  @Component({
    selector: 'mangol-demo-map',
    template: '<mangol></mangol>'
  })
  export class DemoMapComponent {

  }
  `;

  constructor(
    private appService: AppService,
    private mangolService: MangolService
  ) {
    this.sidebarOpenedSubscription = this.appService.sidebarOpenedSubject.subscribe(
      opened => {
        if (opened !== null) {
          this.mangolService
            .getMap$()
            .pipe(filter(map => map !== null))
            .subscribe(map => {
              setTimeout(() => {
                map.updateSize();
              }, 500);
            });
        }
      }
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.sidebarOpenedSubscription) {
      this.sidebarOpenedSubscription.unsubscribe();
    }
  }
}
