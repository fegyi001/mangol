import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MatSliderChange } from '@angular/material';

import { MangolLayer } from '../../../../../classes/Layer';
import { Store } from '@ngxs/store';
import { MangolConfig } from '../../../../../interfaces/config.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mangol-transparency',
  templateUrl: './transparency.component.html',
  styleUrls: ['./transparency.component.scss']
})
export class TransparencyComponent implements OnInit, OnDestroy {
  @Input() layer: MangolLayer;

  min = 0;
  max = 100;
  showLabels = true;
  sliderStep = 1;
  value: number;

  configSubscription: Subscription;

  constructor(private store: Store) {
    this.configSubscription = this.store
      .select(state => state.config.config)
      .subscribe((config: MangolConfig) => {
        if (
          !!config.sidebar &&
          !!config.sidebar.toolbar &&
          !!config.sidebar.toolbar.layertree &&
          !!config.sidebar.toolbar.layertree.details &&
          !!config.sidebar.toolbar.layertree.details.opacity
        ) {
          const params = config.sidebar.toolbar.layertree.details.opacity;
          if (!!params.sliderStep) {
            this.sliderStep = params.sliderStep;
          }
          if (!!params.showLabels) {
            this.showLabels = params.showLabels;
          }
        }
      });
  }

  ngOnInit() {
    this.value = this.layer.layer.getOpacity() * 100;
  }

  ngOnDestroy() {
    if (this.configSubscription) {
      this.configSubscription.unsubscribe();
    }
  }

  onChange(evt: MatSliderChange) {
    this.layer.layer.setOpacity(evt.value / 100);
  }
}
