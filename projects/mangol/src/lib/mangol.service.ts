import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

import { MangolConfig } from './interfaces/config.interface';
import { SetConfig } from './store/config.state';
import { MangolState } from './mangol.state';
import { Observable } from 'rxjs';
import Map from 'ol/Map';
import {
  SetHasSidebar,
  SetSidebarCollapsible,
  SetSidebarMode,
  SetSidebarOpened,
  SetSidebarTitle,
  ToggleSidebar
} from './store/sidebar.state';

@Injectable({
  providedIn: 'root'
})
export class MangolService {
  constructor(private store: Store) {}

  /**
   * CONFIG STATE MODIFIER FUNCTIONS
   */
  getConfig() {
    return this.store.selectOnce((state: MangolState) => state.config.config);
  }

  setConfig(config: MangolConfig) {
    this.store.dispatch(new SetConfig(config));
  }

  /**
   *
   */
  getMap$() {
    return this.store.selectOnce((state: MangolState) => state.map.map);
  }

  /**
   * SIDEBAR STATE MODIFIER FUNCTIONS
   */

  getSidebar$() {
    this.store.selectOnce((state: MangolState) => state.sidebar);
  }

  toggleSidebar() {
    this.store.dispatch(new ToggleSidebar());
  }

  setHasSidebar(hasSidebar: boolean) {
    this.store.dispatch(new SetHasSidebar(hasSidebar));
  }

  setSidebarMode(mode: string) {
    this.store.dispatch(new SetSidebarMode(mode));
  }

  setSidebarCollapsible(collapsible: boolean) {
    this.store.dispatch(new SetSidebarCollapsible(collapsible));
  }

  setSidebarOpened(opened: boolean) {
    this.store.dispatch(new SetSidebarOpened(opened));
  }

  setSidebarTitle(title: string) {
    this.store.dispatch(new SetSidebarTitle(title));
  }
}
