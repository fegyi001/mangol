import { Component, Input, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MangolLayer } from '../../../../classes/Layer';
import { FeatureinfoDictionary } from '../../../../store/featureinfo/featureinfo.reducers';
import * as FeatureinfoActions from './../../../../store/featureinfo/featureinfo.actions';
import * as fromMangol from './../../../../store/mangol.reducers';

@Component({
  selector: 'mangol-featureinfo-select',
  templateUrl: './featureinfo-select.component.html',
  styleUrls: ['./featureinfo-select.component.scss'],
})
export class FeatureinfoSelectComponent implements OnInit {
  @Input()
  layers: MangolLayer[];
  @Input()
  dictionary: FeatureinfoDictionary;

  selectedLayer$: Observable<MangolLayer>;

  constructor(private store: Store<fromMangol.MangolState>) {
    this.selectedLayer$ = this.store.select(
      (state) => state.featureinfo.selectedLayer
    );
  }

  ngOnInit() {
    this.store.dispatch(new FeatureinfoActions.SetSelectedLayer(null));
  }

  onSelectionChanged(evt: MatSelectChange) {
    if (typeof evt.value === 'undefined') {
      this.store.dispatch(new FeatureinfoActions.SetSelectedLayer(null));
    } else {
      const layer: MangolLayer = evt.value;
      this.store.dispatch(new FeatureinfoActions.SetSelectedLayer(layer));
    }
  }
}
