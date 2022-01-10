import { Component, OnDestroy } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs'

import { MangolControllersPositionStateModel } from '../../../store/controllers/controllers.reducers'
import * as fromMangol from '../../../store/mangol.reducers'
import { shownStateTrigger } from '../controllers.animations'

@Component({
  selector: 'mangol-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
  animations: [shownStateTrigger]
})
export class PositionComponent implements OnDestroy {
  position: MangolControllersPositionStateModel = null

  showCopyIcon = false
  copyIconId = 'mangol-mouse-position-text'

  positionSubscription: Subscription

  constructor(
    private store: Store<fromMangol.MangolState>,
    public snackBar: MatSnackBar
  ) {
    this.positionSubscription = this.store
      .select((state) => state.controllers.position)
      .subscribe((position) => (this.position = position))
  }

  ngOnDestroy() {
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe()
    }
  }

  copyCoordinatesToClipboard() {
    const range = document.createRange()
    const element = document.getElementById(this.copyIconId)
    range.selectNode(element)
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(range)
    document.execCommand('copy')
    window.getSelection().removeAllRanges()
    this.snackBar.open(
      `${this.position.dictionary.textCopied}: ${element.textContent.trim()}`,
      this.position.dictionary.closeSnackbar,
      {
        duration: 2000,
        panelClass: 'mangol-snackbar'
      }
    )
  }
}
