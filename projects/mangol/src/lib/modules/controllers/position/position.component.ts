import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { shownStateTrigger } from '../controllers.animations';
import * as ControllersActions from './../../../store/controllers/controllers.actions';
import { MangolControllersPositionStateModel } from './../../../store/controllers/controllers.reducers';
import * as fromMangol from './../../../store/mangol.reducers';

@Component({
  selector: 'mangol-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
  animations: [shownStateTrigger]
})
export class PositionComponent implements OnInit, OnDestroy {
  position: MangolControllersPositionStateModel = null;

  pointerMoveFunction: any = null;
  mapSubscription: Subscription;

  showCopyIcon = false;
  copyIconId = 'mangol-mouse-position-text';

  positionSubscription: Subscription;

  constructor(
    private store: Store<fromMangol.MangolState>,
    public snackBar: MatSnackBar
  ) {
    this.positionSubscription = this.store
      .select(state => state.controllers.position)
      .subscribe(position => (this.position = position));
  }

  ngOnInit() {
    this.mapSubscription = this.store
      .select(state => state.map.map)
      .subscribe(m => {
        if (m !== null) {
          if (this.pointerMoveFunction !== null) {
            m.un('pointermove', this.pointerMoveFunction);
          }
          this.pointerMoveFunction = evt =>
            this._createPointerMoveFunction(evt);
          m.on('pointermove', this.pointerMoveFunction);
        }
      });
  }

  ngOnDestroy() {
    if (this.mapSubscription) {
      this.mapSubscription.unsubscribe();
    }
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
    }
    if (this.pointerMoveFunction !== null) {
      this.store
        .select(state => state.map.map)
        .pipe(
          filter(m => m !== null),
          take(1)
        )
        .subscribe(m => {
          m.un('pointermove', this.pointerMoveFunction);
        });
    }
  }

  /**
   * Creates the pointermove event handler function
   * @param evt
   */
  private _createPointerMoveFunction(evt) {
    if (evt.dragging) {
      return;
    } else {
      const coords = <[number, number]>this._formatCoordinates(evt.coordinate);
      this.store.dispatch(
        new ControllersActions.SetPositionCoordinates(coords)
      );
    }
  }

  /**
   * Formats a pair of coordinates bz a given precision
   * @param coords
   */
  private _formatCoordinates(coords: any[]): number[] {
    const formattedCoords: number[] = [];
    coords.forEach((coord: any) => {
      coord = parseFloat(coord).toFixed(this.position.precision);
      formattedCoords.push(coord);
    });
    return formattedCoords;
  }

  copyCoordinatesToClipboard() {
    const range = document.createRange();
    const element = document.getElementById(this.copyIconId);
    range.selectNode(element);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    this.snackBar.open(
      `${this.position.dictionary.textCopied}: ${element.textContent.trim()}`,
      this.position.dictionary.closeSnackbar,
      {
        duration: 2000,
        panelClass: 'mangol-snackbar'
      }
    );
  }
}
