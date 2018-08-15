import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import Map from 'ol/Map';
import { Observable } from 'rxjs';

import { MangolConfig } from './interfaces/config.interface';
import * as ConfigActions from './store/config/config.actions';
import * as fromMangol from './store/mangol.reducers';
import * as SidebarActions from './store/sidebar/sidebar.actions';
import * as fromSidebar from './store/sidebar/sidebar.reducers';

@Injectable({
  providedIn: 'root'
})
export class MangolService {
  constructor(private store: Store<fromMangol.MangolState>) {}

  /**
   * CONFIG STATE MODIFIER FUNCTIONS
   */
  getConfig(): Observable<MangolConfig> {
    return this.store.select(state => state.config.config);
  }

  setConfig(config: MangolConfig): void {
    this.store.dispatch(new ConfigActions.SetConfig(config));
  }

  /**
   *
   */
  getMap$(): Observable<Map> {
    return this.store.select(state => state.map.map);
  }

  /**
   * SIDEBAR STATE MODIFIER FUNCTIONS
   */

  getSidebar$(): Observable<fromSidebar.State> {
    return this.store.select(state => state.sidebar);
  }

  toggleSidebar(): void {
    this.store.dispatch(new SidebarActions.Toggle());
  }

  setHasSidebar(hasSidebar: boolean): void {
    this.store.dispatch(new SidebarActions.SetHasSidebar(hasSidebar));
  }

  setSidebarMode(mode: string) {
    this.store.dispatch(new SidebarActions.SetMode(mode));
  }

  setSidebarCollapsible(collapsible: boolean): void {
    this.store.dispatch(new SidebarActions.SetCollapsible(collapsible));
  }

  setSidebarOpened(opened: boolean): void {
    this.store.dispatch(new SidebarActions.SetOpened(opened));
  }

  setSidebarTitle(title: string): void {
    this.store.dispatch(new SidebarActions.SetTitle(title));
  }
}
