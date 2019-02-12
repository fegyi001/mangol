import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import Map from 'ol/Map';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { MangolConfig } from './interfaces/config.interface';
import * as ConfigActions from './store/config/config.actions';
import * as MangolActions from './store/mangol.actions';
import * as fromMangol from './store/mangol.reducers';
import * as SidebarActions from './store/sidebar/sidebar.actions';

import { addCommon as addCommonProjections } from 'ol/proj.js';
import { register } from 'ol/proj/proj4.js';
import proj4 from 'proj4';

@Component({
  selector: 'mangol',
  templateUrl: './mangol.component.html',
  styleUrls: ['./mangol.component.scss']
})
export class MangolComponent implements OnInit {
  @HostBinding('class')
  class = 'mangol';
  @Input()
  config: MangolConfig;

  hasSidebar$: Observable<boolean>;
  sidebarOpened$: Observable<boolean>;
  sidebarMode$: Observable<string>;
  map$: Observable<Map>;

  constructor(private store: Store<fromMangol.MangolState>) {
    this.hasSidebar$ = this.store.select(state => state.sidebar.hasSidebar);
    this.sidebarOpened$ = this.store.select(state => state.sidebar.opened);
    this.sidebarMode$ = this.store.select(state => state.sidebar.mode);
    this.map$ = this.store.select(state => state.map.map);
  }

  ngOnInit() {
    addCommonProjections();
    register(proj4);

    this.store.dispatch(new MangolActions.ClearState());
    this.store.dispatch(new ConfigActions.SetConfig(this.config));
    if (typeof this.config !== 'undefined' && this.config !== null) {
      // register the config in the Store
      this.store.dispatch(
        new SidebarActions.SetHasSidebar(!!this.config.sidebar)
      );
      if (!!this.config.sidebar) {
        /**
         * Basic sidebar options
         */
        if (!!this.config.sidebar.collapsible) {
          this.store.dispatch(
            new SidebarActions.SetCollapsible(this.config.sidebar.collapsible)
          );
        }
        if (!!this.config.sidebar.mode) {
          this.store.dispatch(
            new SidebarActions.SetMode(this.config.sidebar.mode)
          );
        }
        if (!!this.config.sidebar.opened) {
          this.store.dispatch(
            new SidebarActions.SetOpened(this.config.sidebar.opened)
          );
        }
        if (!!this.config.sidebar.title) {
          this.store.dispatch(
            new SidebarActions.SetTitle(this.config.sidebar.title)
          );
        }
      }
    } else {
      this.store.dispatch(new SidebarActions.SetHasSidebar(false));
    }
  }

  onOpenedChange(evt: boolean) {
    this.store
      .select(state => state.sidebar.opened)
      .pipe(take(1))
      .subscribe(opened => {
        if (opened !== evt) {
          this.store.dispatch(new SidebarActions.Toggle());
        }
        this.store
          .select(state => state.map.map)
          .pipe(take(1))
          .subscribe((m: Map) => {
            if (m !== null) {
              m.updateSize();
            }
          });
      });
  }
}
