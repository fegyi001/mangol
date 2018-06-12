import {
  HasFeatureinfo,
  SetFeatureinfoTitle
} from './../../store/featureinfo.actions';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { filter, map, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import {
  HasLayertree,
  SetLayertreeDisabled,
  SetLayertreeTitle
} from '../../store/layertree.actions';
import { MangolConfig } from '../../interfaces/config.interface';
import {
  MangolConfigLayertreeItem,
  MangolConfigFeatureInfoItem
} from '../../interfaces/config-toolbar.interface';
import { SetFeatureinfoDisabled } from '../../store/featureinfo.actions';

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

  configSubscription: Subscription;

  constructor(private store: Store) {
    this.title$ = this.store.select(state => state.sidebar.title);
    this.hasLayertree$ = this.store.select(
      state => state.layertree.hasLayertree
    );
    this.layertreeTitle$ = this.store.select(state => state.layertree.title);

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
      });
  }

  ngOnInit() {}
  ngOnDestroy() {
    if (this.configSubscription) {
      this.configSubscription.unsubscribe();
    }
  }
}
