import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';

import { MangolState } from '../../../mangol.state';
import { ControllersSetPositionCoordinates } from '../../../store/controllers.state';
import { MangolControllersPositionStateModel } from './../../../store/controllers.state';

@Component({
  selector: 'mangol-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit, OnDestroy {
  position$: Observable<MangolControllersPositionStateModel>;

  pointerMoveFunction: any = null;
  mapSubscription: Subscription;

  constructor(private store: Store) {
    this.position$ = this.store.select(
      (state: MangolState) => state.controllers.position
    );
  }

  ngOnInit() {
    this.mapSubscription = this.store
      .select((state: MangolState) => state.map.map)
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
    if (this.pointerMoveFunction !== null) {
      this.store
        .selectSnapshot((state: MangolState) => state.map.map)
        .un('pointermove', this.pointerMoveFunction);
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
      this.store.dispatch(new ControllersSetPositionCoordinates(coords));
    }
  }

  /**
   * Formats a pair of coordinates bz a given precision
   * @param coords
   */
  private _formatCoordinates(coords: any[]): number[] {
    const formattedCoords: number[] = [];
    coords.forEach((coord: any) => {
      coord = parseFloat(coord).toFixed(
        this.store.selectSnapshot(
          (state: MangolState) => state.controllers.position.precision
        )
      );
      formattedCoords.push(coord);
    });
    return formattedCoords;
  }
}
