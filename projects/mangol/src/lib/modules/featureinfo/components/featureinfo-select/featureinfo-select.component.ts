import { MangolState } from './../../../../mangol.state';
import { Component, Input, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { MangolLayer } from '../../../../classes/Layer';
import { SetFeatureinfoSelectedLayer } from '../../../../store/featureinfo.state';

@Component({
  selector: 'mangol-featureinfo-select',
  templateUrl: './featureinfo-select.component.html',
  styleUrls: ['./featureinfo-select.component.scss']
})
export class FeatureinfoSelectComponent implements OnInit {
  @Input() layers: MangolLayer[];

  selectedLayer$: Observable<MangolLayer>;

  constructor(private store: Store) {
    this.selectedLayer$ = this.store.select(
      (state: MangolState) => state.featureinfo.selectedLayer
    );
  }

  ngOnInit() {
    this.store.dispatch(new SetFeatureinfoSelectedLayer(null));
  }

  onSelectionChanged(evt: MatSelectChange) {
    if (typeof evt.value === 'undefined') {
      this.store.dispatch(new SetFeatureinfoSelectedLayer(null));
    } else {
      const layer: MangolLayer = evt.value;
      this.store.dispatch(new SetFeatureinfoSelectedLayer(layer));
    }
  }
}
