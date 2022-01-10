import { Component, OnDestroy, OnInit } from '@angular/core'
import { fromLonLat } from 'ol/proj.js'
import View from 'ol/View'
import { Subscription } from 'rxjs'
import { filter, map } from 'rxjs/operators'

import { AppService } from '../../app.service'
import { MangolConfig } from './../../../../projects/mangol/src/lib/interfaces/config.interface'
import { MangolService } from './../../../../projects/mangol/src/lib/mangol.service'
import { code } from './code'

@Component({
  selector: 'app-demo-sidebar',
  templateUrl: './demo-sidebar.component.html',
  styleUrls: ['./demo-sidebar.component.scss']
})
export class DemoSidebarComponent implements OnInit, OnDestroy {
  mangolConfig: MangolConfig
  sidebarOpenedSubscription: Subscription

  code = code

  constructor(
    private appService: AppService,
    private mangolService: MangolService
  ) {
    this.sidebarOpenedSubscription =
      this.appService.sidebarOpenedSubject.subscribe((opened) => {
        if (opened !== null) {
          this.mangolService.mapState$
            .pipe(
              map((m) => m.map),
              filter((m) => m !== null)
            )
            .subscribe((m) => {
              setTimeout(() => {
                m.updateSize()
              }, 500)
            })
        }
      })
  }

  ngOnInit() {
    this.mangolConfig = {
      map: {
        target: 'mangol-demo-sidebar',
        view: new View({
          projection: 'EPSG:900913',
          center: fromLonLat(
            [19.3956393810065, 47.168464955013],
            'EPSG:900913'
          ),
          zoom: 4
        })
      },
      sidebar: {
        collapsible: true,
        opened: true,
        title: 'Sidebar example',
        mode: 'side'
      }
    }
  }

  ngOnDestroy() {
    if (this.sidebarOpenedSubscription) {
      this.sidebarOpenedSubscription.unsubscribe()
    }
    this.mangolService.resetMangolState()
  }
}
