import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import View from 'ol/View';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { MangolState } from '../../../mangol.state';
import { ControllersSetRotationValue } from '../../../store/controllers.state';
import { MangolControllersRotationStateModel } from './../../../store/controllers.state';

@Component({
  selector: 'mangol-rotation-button',
  templateUrl: './rotation-button.component.html',
  styleUrls: ['./rotation-button.component.scss']
})
export class RotationButtonComponent implements OnInit, OnDestroy {
  rotation$: Observable<MangolControllersRotationStateModel>;
  rotationFunction: any = null;

  mapSubscription: Subscription;

  constructor(private store: Store) {
    this.rotation$ = this.store.select(
      (state: MangolState) => state.controllers.rotation
    );

    this.mapSubscription = this.store
      .select((state: MangolState) => state.map.map)
      .pipe(filter(m => m !== null))
      .subscribe(m => {
        const view = m.getView();
        this.store.dispatch(
          new ControllersSetRotationValue(view.getRotation())
        );
        if (this.rotationFunction !== null) {
          view.un('change:rotation', this.rotationFunction);
        }
        this.rotationFunction = evt => this._createRotationFunction(evt);
        view.on('change:rotation', this.rotationFunction);
      });
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.mapSubscription) {
      this.mapSubscription.unsubscribe();
    }
    this.store
      .selectOnce((state: MangolState) => state.map.map)
      .pipe(filter(m => m !== null))
      .subscribe(m => {
        m.getView().un('change:rotation', this.rotationFunction);
      });
  }

  rotateNorth() {
    this.store
      .selectOnce((state: MangolState) => state.map.map)
      .pipe(filter(m => m !== null))
      .subscribe(m => {
        const view = m.getView();
        if (view.getRotation() !== 0) {
          view.setRotation(0);
        }
      });
  }

  getRotationStyle(rotation: number) {
    return { transform: `rotate(${rotation}rad)` };
  }

  private _createRotationFunction(evt) {
    const targetView = <View>evt.target;
    this.store.dispatch(
      new ControllersSetRotationValue(targetView.getRotation())
    );
  }
}
