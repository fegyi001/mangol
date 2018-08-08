import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import ScaleLine from 'ol/control/ScaleLine';
import Map from 'ol/Map';
import { Subscription } from 'rxjs';

import { MangolState } from '../../../mangol.state';

@Component({
  selector: 'mangol-scalebar',
  templateUrl: './scalebar.component.html',
  styleUrls: ['./scalebar.component.scss']
})
export class ScalebarComponent implements OnInit, AfterViewInit, OnDestroy {
  target: string = null;

  map: Map = null;

  mapSubscription: Subscription;

  constructor(private store: Store) {}

  ngOnInit() {
    this.map = this.store.selectSnapshot((state: MangolState) => state.map.map);
    this.target = `${this.map.getTarget()}-scale-line`;
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
