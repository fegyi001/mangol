import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import View from 'ol/View';
import { Observable, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { shownStateTrigger } from '../controllers.animations';
import * as ControllersActions from './../../../store/controllers/controllers.actions';
import { MangolControllersRotationStateModel } from './../../../store/controllers/controllers.reducers';
import * as fromMangol from './../../../store/mangol.reducers';

@Component({
  selector: 'mangol-rotation-button',
  templateUrl: './rotation-button.component.html',
  styleUrls: ['./rotation-button.component.scss'],
  animations: [shownStateTrigger],
})
export class RotationButtonComponent implements OnInit, OnDestroy {
  rotation$: Observable<MangolControllersRotationStateModel>;
  rotationFunction: any = null;
  animationDuration = 500;

  mapSubscription: Subscription;

  constructor(private store: Store<fromMangol.MangolState>) {
    this.rotation$ = this.store.select((state) => state.controllers.rotation);

    this.mapSubscription = this.store
      .select((state) => state.map.map)
      .pipe(filter((m) => m !== null))
      .subscribe((m) => {
        const view = m.getView();
        this.store.dispatch(
          new ControllersActions.SetRotationValue(view.getRotation())
        );
        if (this.rotationFunction !== null) {
          view.un('change:rotation', this.rotationFunction);
        }
        this.rotationFunction = (evt: any) => this._createRotationFunction(evt);
        view.on('change:rotation', this.rotationFunction);
      });
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.mapSubscription) {
      this.mapSubscription.unsubscribe();
    }
    this.store
      .select((state) => state.map.map)
      .pipe(
        filter((m) => m !== null),
        take(1)
      )
      .subscribe((m) => {
        m.getView().un('change:rotation', this.rotationFunction);
      });
  }

  rotateNorth() {
    this.store
      .select((state) => state.map.map)
      .pipe(
        filter((m) => m !== null),
        take(1)
      )
      .subscribe((m) => {
        const view = m.getView();
        if (view.getRotation() !== 0) {
          view.animate({ rotation: 0, duration: this.animationDuration });
          setTimeout(() => {
            view.setRotation(0);
          }, this.animationDuration + 1);
        }
      });
  }

  getRotationStyle(rotation: number) {
    return { transform: `rotate(${rotation}rad)` };
  }

  private _createRotationFunction(evt: any) {
    const targetView = <View>evt.target;
    this.store.dispatch(
      new ControllersActions.SetRotationValue(targetView.getRotation())
    );
  }
}
