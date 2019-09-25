import { filter, take } from 'rxjs/operators';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromMangol from './../../../store/mangol.reducers';
import ScaleLine from 'ol/control/ScaleLine';
import Map from 'ol/Map';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mangol-scalebar',
  templateUrl: './scalebar.component.html',
  styleUrls: ['./scalebar.component.scss']
})
export class ScalebarComponent implements OnInit, AfterViewInit, OnDestroy {
  target: string = null;

  map: Map = null;

  mapSubscription: Subscription;

  constructor(private store: Store<fromMangol.MangolState>) {}

  ngOnInit() {
    this.store
      .select(fromMangol.getMap)
      .pipe(
        filter(m => m !== null),
        take(1)
      )
      .subscribe(m => {
        this.map = m;
        this.target = `${this.map.getTarget()}-scale-line`;
      });
  }

  ngAfterViewInit() {
    const scaleLineControl = new ScaleLine({
      target: document.getElementById(this.target),
      units: 'metric'
    });
    setTimeout(() => {
      this.map.addControl(scaleLineControl);
    }, 0);
  }

  ngOnDestroy() {
    if (this.mapSubscription) {
      this.mapSubscription.unsubscribe();
    }
  }
}
