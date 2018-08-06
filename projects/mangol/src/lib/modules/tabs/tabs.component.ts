import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';

import {
  MangolConfigFeatureInfoItem,
  MangolConfigLayertreeItem,
  MangolConfigMeasureItem
} from '../../interfaces/config-toolbar.interface';
import { MangolConfig } from '../../interfaces/config.interface';
import { SetFeatureinfoDisabled } from '../../store/featureinfo.state';
import {
  HasLayertree,
  SetLayertreeDisabled,
  SetLayertreeTitle
} from '../../store/layertree.state';
import { HasMeasure } from '../../store/measure.state';
import { SetPrintTitle } from '../../store/print.state';
import { ToggleSidebar } from '../../store/sidebar.state';
import { MangolConfigPrintItem } from './../../interfaces/config-toolbar.interface';
import {
  HasFeatureinfo,
  SetFeatureinfoTitle
} from './../../store/featureinfo.state';
import {
  SetMeasureDisabled,
  SetMeasureTitle
} from './../../store/measure.state';
import { HasPrint, SetPrintDisabled } from './../../store/print.state';
import { SetSidebarSelectedModule } from './../../store/sidebar.state';

@Component({
  selector: 'mangol-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'mangol-tabs';

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
          typeof config !== 'undefined' &&
          !!config.sidebar &&
          !!config.sidebar.toolbar &&
          !!config.sidebar.toolbar.layertree;
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
          typeof config !== 'undefined' &&
          !!config.sidebar &&
          !!config.sidebar.toolbar &&
          !!config.sidebar.toolbar.featureinfo;
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
          typeof config !== 'undefined' &&
          !!config.sidebar &&
          !!config.sidebar.toolbar &&
          !!config.sidebar.toolbar.measure;
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
          typeof config !== 'undefined' &&
          !!config.sidebar &&
          !!config.sidebar.toolbar &&
          !!config.sidebar.toolbar.print;
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

  toggleSidebar() {
    this.store.dispatch(new ToggleSidebar());
  }

  selectTab(tabName: string) {
    this.store.dispatch(new SetSidebarSelectedModule(tabName));
  }
}
