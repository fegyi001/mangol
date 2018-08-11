import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { MangolConfig } from './interfaces/config.interface';
import { MangolState } from './mangol.state';
import { SetConfig } from './store/config.state';
import Map from 'ol/Map';
import {
  SetHasSidebar,
  SetSidebarCollapsible,
  SetSidebarMode,
  SetSidebarOpened,
  SetSidebarTitle,
  ToggleSidebar,
  SidebarStateModel
} from './store/sidebar.state';

@Injectable({
  providedIn: 'root'
})
export class MangolService {
  constructor(private store: Store) {}

  /**
   * CONFIG STATE MODIFIER FUNCTIONS
   */
  getConfig(): Observable<MangolConfig> {
    return this.store.selectOnce((state: MangolState) => state.config.config);
  }

  setConfig(config: MangolConfig): void {
    this.store.dispatch(new SetConfig(config));
  }

  /**
   *
   */
  getMap$(): Observable<Map> {
    return this.store.selectOnce((state: MangolState) => state.map.map);
  }

  /**
   * SIDEBAR STATE MODIFIER FUNCTIONS
   */

  getSidebar$(): Observable<SidebarStateModel> {
    return this.store.selectOnce((state: MangolState) => state.sidebar);
  }

  toggleSidebar(): void {
    this.store.dispatch(new ToggleSidebar());
  }

  setHasSidebar(hasSidebar: boolean): void {
    this.store.dispatch(new SetHasSidebar(hasSidebar));
  }

  setSidebarMode(mode: string) {
    this.store.dispatch(new SetSidebarMode(mode));
  }

  setSidebarCollapsible(collapsible: boolean): void {
    this.store.dispatch(new SetSidebarCollapsible(collapsible));
  }

  setSidebarOpened(opened: boolean): void {
    this.store.dispatch(new SetSidebarOpened(opened));
  }

  setSidebarTitle(title: string): void {
    this.store.dispatch(new SetSidebarTitle(title));
  }
}
