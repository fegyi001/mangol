import { MangolConfigPrintItem } from './../../interfaces/config-toolbar.interface';
import { HasPrint, SetPrintDisabled } from './../../store/print.actions';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import {
  MangolConfigFeatureInfoItem,
  MangolConfigLayertreeItem,
  MangolConfigMeasureItem
} from '../../interfaces/config-toolbar.interface';
import { MangolConfig } from '../../interfaces/config.interface';
import { SetFeatureinfoDisabled } from '../../store/featureinfo.actions';
import {
  HasLayertree,
  SetLayertreeDisabled,
  SetLayertreeTitle
} from '../../store/layertree.actions';
import { HasMeasure } from '../../store/measure.actions';
import { SetPrintTitle } from '../../store/print.actions';
import {
  HasFeatureinfo,
  SetFeatureinfoTitle
} from './../../store/featureinfo.actions';
import {
  SetMeasureDisabled,
  SetMeasureTitle
} from './../../store/measure.actions';

@Component({
  selector: 'mangol-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, OnDestroy {
  title$: Observable<boolean>;
  /** Layertree */
  hasLayertree$: Observable<boolean>;
  layertreeDisabled$: Observable<boolean>;
  layertreeTitle$: Observable<string>;
  /** FeatureInfo */
  hasFeatureinfo$: Observable<boolean>;
  featureinfoDisabled$: Observable<boolean>;
  featureinfoTitle$: Observable<string>;
  /** MeasureInfo */
  hasMeasure$: Observable<boolean>;
  measureDisabled$: Observable<boolean>;
  measureTitle$: Observable<string>;
  /** Print */
  hasPrint$: Observable<boolean>;
  printDisabled$: Observable<boolean>;
  printTitle$: Observable<string>;

  configSubscription: Subscription;

  constructor(private store: Store) {
    this.title$ = this.store.select(state => state.sidebar.title);
    /** Layertree */
    this.hasLayertree$ = this.store.select(
      state => state.layertree.hasLayertree
    );
    this.layertreeTitle$ = this.store.select(state => state.layertree.title);
    this.layertreeDisabled$ = this.store.select(
      state => state.layertree.disabled
    );
    /** Featureinfo */
    this.hasFeatureinfo$ = this.store.select(
      state => state.featureinfo.hasFeatureinfo
    );
    this.featureinfoTitle$ = this.store.select(
      state => state.featureinfo.title
    );
    this.featureinfoDisabled$ = this.store.select(
      state => state.featureinfo.disabled
    );
    /** Measure */
    this.hasMeasure$ = this.store.select(state => state.measure.hasMeasure);
    this.measureTitle$ = this.store.select(state => state.measure.title);
    this.measureDisabled$ = this.store.select(state => state.measure.disabled);
    /** Print */
    this.hasPrint$ = this.store.select(state => state.print.hasPrint);
    this.printTitle$ = this.store.select(state => state.print.title);
    this.printDisabled$ = this.store.select(state => state.print.disabled);

    this.configSubscription = this.store
      .select(state => state.config.config)
      .subscribe((config: MangolConfig) => {
        /** Layertree */
        const hasLayertree =
          config.hasOwnProperty('sidebar') &&
          config.sidebar.hasOwnProperty('toolbar') &&
          config.sidebar.toolbar.hasOwnProperty('layertree');
        this.store.dispatch(new HasLayertree(hasLayertree));
        if (hasLayertree) {
          const layertree: MangolConfigLayertreeItem =
            config.sidebar.toolbar.layertree;
          if (layertree.hasOwnProperty('disabled')) {
            this.store.dispatch(new SetLayertreeDisabled(layertree.disabled));
          }
          if (layertree.hasOwnProperty('title')) {
            this.store.dispatch(new SetLayertreeTitle(layertree.title));
          }
        }
        /** Featureinfo */
        const hasFeatureinfo =
          config.hasOwnProperty('sidebar') &&
          config.sidebar.hasOwnProperty('toolbar') &&
          config.sidebar.toolbar.hasOwnProperty('featureinfo');
        this.store.dispatch(new HasFeatureinfo(hasFeatureinfo));
        if (hasFeatureinfo) {
          const featureinfo: MangolConfigFeatureInfoItem =
            config.sidebar.toolbar.featureinfo;
          if (featureinfo.hasOwnProperty('disabled')) {
            this.store.dispatch(
              new SetFeatureinfoDisabled(featureinfo.disabled)
            );
          }
          if (featureinfo.hasOwnProperty('title')) {
            this.store.dispatch(new SetFeatureinfoTitle(featureinfo.title));
          }
        }
        /** Measure */
        const hasMeasure =
          config.hasOwnProperty('sidebar') &&
          config.sidebar.hasOwnProperty('toolbar') &&
          config.sidebar.toolbar.hasOwnProperty('measure');
        this.store.dispatch(new HasMeasure(hasMeasure));
        if (hasMeasure) {
          const measure: MangolConfigMeasureItem =
            config.sidebar.toolbar.measure;
          if (measure.hasOwnProperty('disabled')) {
            this.store.dispatch(new SetMeasureDisabled(measure.disabled));
          }
          if (measure.hasOwnProperty('title')) {
            this.store.dispatch(new SetMeasureTitle(measure.title));
          }
        }
        /** Print */
        const hasPrint =
          config.hasOwnProperty('sidebar') &&
          config.sidebar.hasOwnProperty('toolbar') &&
          config.sidebar.toolbar.hasOwnProperty('print');
        this.store.dispatch(new HasPrint(hasPrint));
        if (hasPrint) {
          const print: MangolConfigPrintItem = config.sidebar.toolbar.print;
          if (print.hasOwnProperty('disabled')) {
            this.store.dispatch(new SetPrintDisabled(print.disabled));
          }
          if (print.hasOwnProperty('title')) {
            this.store.dispatch(new SetPrintTitle(print.title));
          }
        }
      });
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.configSubscription) {
      this.configSubscription.unsubscribe();
    }
  }
}
