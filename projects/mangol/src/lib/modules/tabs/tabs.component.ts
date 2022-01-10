import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'
import { filter } from 'rxjs/operators'

import { MangolConfig } from '../../interfaces/config.interface'
import {
  MangolConfigFeatureInfoItem,
  MangolConfigLayertreeItem,
  MangolConfigMeasureItem
} from '../../interfaces/config-toolbar.interface'
import { MangolConfigPrintItem } from './../../interfaces/config-toolbar.interface'
import * as FeatureinfoActions from './../../store/featureinfo/featureinfo.actions'
import * as LayertreeActions from './../../store/layertree/layertree.actions'
import * as fromMangol from './../../store/mangol.reducers'
import * as MeasureActions from './../../store/measure/measure.actions'
import * as PrintActions from './../../store/print/print.actions'
import * as SidebarActions from './../../store/sidebar/sidebar.actions'
@Component({
  selector: 'mangol-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, OnDestroy {
  @HostBinding('class')
  class = 'mangol-tabs'

  selectedModule$: Observable<string>

  title$: Observable<string>
  /** Layertree */
  hasLayertree$: Observable<boolean>
  layertreeDisabled$: Observable<boolean>
  layertreeTitle$: Observable<string>
  /** FeatureInfo */
  hasFeatureinfo$: Observable<boolean>
  featureinfoDisabled$: Observable<boolean>
  featureinfoTitle$: Observable<string>
  /** MeasureInfo */
  hasMeasure$: Observable<boolean>
  measureDisabled$: Observable<boolean>
  measureTitle$: Observable<string>
  /** Print */
  hasPrint$: Observable<boolean>
  printDisabled$: Observable<boolean>
  printTitle$: Observable<string>

  configSubscription: Subscription

  items: string[] = []

  constructor(private store: Store<fromMangol.MangolState>) {
    this.selectedModule$ = this.store.select(
      (state) => state.sidebar.selectedModule
    )
    this.title$ = this.store.select((state) => state.sidebar.title)
    /** Layertree */
    this.hasLayertree$ = this.store.select(
      (state) => state.layertree.hasLayertree
    )
    this.layertreeTitle$ = this.store.select((state) => state.layertree.title)
    this.layertreeDisabled$ = this.store.select(
      (state) => state.layertree.disabled
    )
    /** Featureinfo */
    this.hasFeatureinfo$ = this.store.select(
      (state) => state.featureinfo.hasFeatureinfo
    )
    this.featureinfoTitle$ = this.store.select(
      (state) => state.featureinfo.title
    )
    this.featureinfoDisabled$ = this.store.select(
      (state) => state.featureinfo.disabled
    )
    /** Measure */
    this.hasMeasure$ = this.store.select((state) => state.measure.hasMeasure)
    this.measureTitle$ = this.store.select((state) => state.measure.title)
    this.measureDisabled$ = this.store.select((state) => state.measure.disabled)
    /** Print */
    this.hasPrint$ = this.store.select((state) => state.print.hasPrint)
    this.printTitle$ = this.store.select((state) => state.print.title)
    this.printDisabled$ = this.store.select((state) => state.print.disabled)
  }

  ngOnInit() {
    this.configSubscription = this.store
      .select((state) => state.config.config)
      .pipe(filter((config) => config !== null))
      .subscribe((config: MangolConfig) => {
        this.items = []
        /** Layertree */
        const hasLayertree =
          typeof config !== 'undefined' &&
          config !== null &&
          !!config.sidebar &&
          !!config.sidebar.toolbar &&
          !!config.sidebar.toolbar.layertree
        this.store.dispatch(new LayertreeActions.HasLayertree(hasLayertree))
        if (hasLayertree) {
          this.items.push('layertree')
          const layertree: MangolConfigLayertreeItem =
            config.sidebar.toolbar.layertree
          if (layertree.hasOwnProperty('disabled')) {
            this.store.dispatch(
              new LayertreeActions.SetDisabled(layertree.disabled)
            )
          }
          if (layertree.hasOwnProperty('title')) {
            this.store.dispatch(new LayertreeActions.SetTitle(layertree.title))
          }
        }
        /** Featureinfo */
        const hasFeatureinfo =
          typeof config !== 'undefined' &&
          config !== null &&
          !!config.sidebar &&
          !!config.sidebar.toolbar &&
          !!config.sidebar.toolbar.featureinfo
        this.store.dispatch(
          new FeatureinfoActions.HasFeatureinfo(hasFeatureinfo)
        )
        if (hasFeatureinfo) {
          this.items.push('featureinfo')
          const featureinfo: MangolConfigFeatureInfoItem =
            config.sidebar.toolbar.featureinfo
          if (featureinfo.hasOwnProperty('disabled')) {
            this.store.dispatch(
              new FeatureinfoActions.SetDisabled(featureinfo.disabled)
            )
          }
          if (featureinfo.hasOwnProperty('title')) {
            this.store.dispatch(
              new FeatureinfoActions.SetTitle(featureinfo.title)
            )
          }
        }
        /** Measure */
        const hasMeasure =
          typeof config !== 'undefined' &&
          config !== null &&
          !!config.sidebar &&
          !!config.sidebar.toolbar &&
          !!config.sidebar.toolbar.measure
        this.store.dispatch(new MeasureActions.HasMeasure(hasMeasure))
        if (hasMeasure) {
          this.items.push('measure')
          const measure: MangolConfigMeasureItem =
            config.sidebar.toolbar.measure
          if (measure.hasOwnProperty('disabled')) {
            this.store.dispatch(
              new MeasureActions.SetDisabled(measure.disabled)
            )
          }
          if (measure.hasOwnProperty('title')) {
            this.store.dispatch(new MeasureActions.SetTitle(measure.title))
          }
        }
        /** Print */
        const hasPrint =
          typeof config !== 'undefined' &&
          config !== null &&
          !!config.sidebar &&
          !!config.sidebar.toolbar &&
          !!config.sidebar.toolbar.print
        this.store.dispatch(new PrintActions.HasPrint(hasPrint))
        if (hasPrint) {
          this.items.push('print')
          const print: MangolConfigPrintItem = config.sidebar.toolbar.print
          if (print.hasOwnProperty('disabled')) {
            this.store.dispatch(new PrintActions.SetDisabled(print.disabled))
          }
          if (print.hasOwnProperty('title')) {
            this.store.dispatch(new PrintActions.SetTitle(print.title))
          }
        }

        if (this.items.length > 0) {
          this.store.dispatch(
            new SidebarActions.SetSelectedModule(this.items[0])
          )
        }
      })
  }

  ngOnDestroy() {
    if (this.configSubscription) {
      this.configSubscription.unsubscribe()
    }
  }

  toggleSidebar() {
    this.store.dispatch(new SidebarActions.Toggle())
  }

  selectTab(tabName: string) {
    this.store.dispatch(new SidebarActions.SetSelectedModule(tabName))
  }
}
