import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { MangolControllersFullScreenOptions } from '../../../interfaces/config-map-controllers.interface'
import * as fromMangol from '../../../store/mangol.reducers'

interface FsDocument extends HTMLDocument {
  mozFullScreenElement?: Element
  msFullscreenElement?: Element
  msExitFullscreen?: () => void
  mozCancelFullScreen?: () => void
}

interface FsDocumentElement extends HTMLElement {
  msRequestFullscreen?: () => void
  mozRequestFullScreen?: () => void
}

@Component({
  selector: 'mangol-fullscreen-button',
  templateUrl: './fullscreen-button.component.html',
  styleUrls: ['./fullscreen-button.component.scss']
})
export class FullscreenButtonComponent {
  fullScreen$: Observable<MangolControllersFullScreenOptions>

  constructor(private store: Store<fromMangol.MangolState>) {
    this.fullScreen$ = this.store.select(
      (state) => state.controllers.fullScreen
    )
  }

  toggleFullScreen(): void {
    const fsDoc = <FsDocument>document
    if (!this.isFullScreen()) {
      const fsDocElem = <FsDocumentElement>(
        document.documentElement.getElementsByTagName('mangol')[0]
      )
      if (fsDocElem.requestFullscreen) {
        fsDocElem.requestFullscreen()
      } else if (fsDocElem.msRequestFullscreen) {
        fsDocElem.msRequestFullscreen()
      } else if (fsDocElem.mozRequestFullScreen) {
        fsDocElem.mozRequestFullScreen()
      } else if (fsDocElem['webkitRequestFullscreen']) {
        ;(<any>fsDocElem).webkitRequestFullscreen()
      }
    } else if (fsDoc.exitFullscreen) {
      fsDoc.exitFullscreen()
    } else if (fsDoc.msExitFullscreen) {
      fsDoc.msExitFullscreen()
    } else if (fsDoc.mozCancelFullScreen) {
      fsDoc.mozCancelFullScreen()
    } else if (fsDoc['webkitExitFullscreen']) {
      ;(<any>fsDoc).webkitExitFullscreen()
    }
  }

  isFullScreen(): boolean {
    const fsDoc = <FsDocument>document
    return !!(
      fsDoc['fullscreenElement'] ||
      fsDoc.mozFullScreenElement ||
      fsDoc['webkitFullscreenElement'] ||
      fsDoc.msFullscreenElement
    )
  }
}
