import { Component, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { filter, map } from 'rxjs/operators'

import { MangolService } from '../../../../projects/mangol/src/lib/mangol.service'
import { AppService } from '../../app.service'
import { code } from './code'

@Component({
  selector: 'app-demo-map',
  templateUrl: './demo-map.component.html',
  styleUrls: ['./demo-map.component.scss']
})
export class DemoMapComponent implements OnDestroy {
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

  ngOnDestroy() {
    if (this.sidebarOpenedSubscription) {
      this.sidebarOpenedSubscription.unsubscribe()
    }
    this.mangolService.resetMangolState()
  }
}
