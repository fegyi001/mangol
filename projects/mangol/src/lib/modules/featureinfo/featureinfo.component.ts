import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { MangolLayer } from '../../classes/Layer';
import { MangolState } from '../../mangol.state';

@Component({
  selector: 'mangol-featureinfo',
  templateUrl: './featureinfo.component.html',
  styleUrls: ['./featureinfo.component.scss']
})
export class FeatureinfoComponent implements OnInit, OnDestroy {
  layers$: Observable<MangolLayer[]>;

  constructor(private store: Store) {
    // Get the queryable layers
    this.layers$ = this.store.select((state: MangolState) =>
      state.layers.layers.filter(layer => layer.queryable)
    );
  }

  ngOnInit() {}

  ngOnDestroy() {}
}
