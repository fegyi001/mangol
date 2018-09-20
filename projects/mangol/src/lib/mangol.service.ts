import { CursorMode } from './interfaces/cursor-mode';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import { Observable } from 'rxjs';

import {
  MangolControllersFullScreenDictionary,
  MangolControllersPositionDictionary,
  MangolControllersRotationDictionary,
  MangolControllersZoomDictionary
} from './interfaces/config-map-controllers.interface';
import { MangolConfig } from './interfaces/config.interface';
import * as ConfigActions from './store/config/config.actions';
import * as fromConfig from './store/config/config.reducers';
import * as ControllersActions from './store/controllers/controllers.actions';
import * as fromControllers from './store/controllers/controllers.reducers';
import * as MangolActions from './store/mangol.actions';
import * as fromMangol from './store/mangol.reducers';
import * as MapActions from './store/map/map.actions';
import * as fromMap from './store/map/map.reducers';
import * as SidebarActions from './store/sidebar/sidebar.actions';
import * as fromSidebar from './store/sidebar/sidebar.reducers';
import * as fromCursor from './store/cursor/cursor.reducers';
import * as CursorActions from './store/cursor/cursor.actions';
import * as FeatureinfoActions from './store/featureinfo/featureinfo.actions';
import * as fromFeatureinfo from './store/featureinfo/featureinfo.reducers';

@Injectable({
  providedIn: 'root'
})
export class MangolService {
  configState$: Observable<fromConfig.State>;
  mapState$: Observable<fromMap.State>;
  sidebarState$: Observable<fromSidebar.State>;
  controllersState$: Observable<fromControllers.State>;
  cursorState$: Observable<fromCursor.State>;
  featureinfoState$: Observable<fromFeatureinfo.State>;

  constructor(private store: Store<fromMangol.MangolState>) {
    this.configState$ = this.store.select(state => state.config);
    this.mapState$ = this.store.select(state => state.map);
    this.sidebarState$ = this.store.select(state => state.sidebar);
    this.controllersState$ = this.store.select(state => state.controllers);
    this.cursorState$ = this.store.select(state => state.cursor);
    this.featureinfoState$ = this.store.select(state => state.featureinfo);
  }

  /**
   * Resets the Mangol State
   */
  resetMangolState(): void {
    this.store.dispatch(new MangolActions.ClearState());
  }

  /**************************
   * CONFIG state functions *
   **************************/

  setConfig(config: MangolConfig): void {
    this.store.dispatch(new ConfigActions.SetConfig(config));
  }

  /***********************
   * MAP state functions *
   ***********************/

  setMap(map: Map): void {
    this.store.dispatch(new MapActions.SetMap(map));
  }

  /***************************
   * SIDEBAR state functions *
   ***************************/

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

  setSidebarSelectedModule(module: string) {
    this.store.dispatch(new SidebarActions.SetSelectedModule(module));
  }

  /*******************************
   * CONTROLLERS state functions *
   *******************************/

  getControllersState$(): Observable<fromControllers.State> {
    return this.store.select(state => state.controllers);
  }

  resetControllers(): void {
    this.store.dispatch(new ControllersActions.Reset());
  }

  setControllersShowZoom(show: boolean): void {
    this.store.dispatch(new ControllersActions.SetShowZoom(show));
  }

  setControllersZoomDictionary(
    dictionary: MangolControllersZoomDictionary
  ): void {
    this.store.dispatch(new ControllersActions.SetZoomDictionary(dictionary));
  }

  setControllersShowTooltip(show: boolean): void {
    this.store.dispatch(new ControllersActions.SetShowTooltip(show));
  }

  setControllersShowPosition(show: boolean): void {
    this.store.dispatch(new ControllersActions.SetShowPosition(show));
  }

  setControllersPositionPrecision(precision: number): void {
    this.store.dispatch(new ControllersActions.SetPositionPrecision(precision));
  }

  setControllersPositionCoordinates(coordinates: [number, number]): void {
    this.store.dispatch(
      new ControllersActions.SetPositionCoordinates(coordinates)
    );
  }

  setControllersPositionDictionary(
    dictionary: MangolControllersPositionDictionary
  ): void {
    this.store.dispatch(
      new ControllersActions.SetPositionDictionary(dictionary)
    );
  }

  setControllersShowRotation(show: boolean): void {
    this.store.dispatch(new ControllersActions.SetShowRotation(show));
  }

  setControllersRotationDictionary(
    dictionary: MangolControllersRotationDictionary
  ): void {
    this.store.dispatch(
      new ControllersActions.SetRotationDictionary(dictionary)
    );
  }

  setControllersShowRotationTooltip(show: boolean): void {
    this.store.dispatch(new ControllersActions.SetShowRotationTooltip(show));
  }

  setControllersRotationValue(value: number): void {
    this.store.dispatch(new ControllersActions.SetRotationValue(value));
  }

  setControllersShowFullscreen(show: boolean): void {
    this.store.dispatch(new ControllersActions.SetShowFullscreen(show));
  }

  setControllersShowFullscreenTooltip(show: boolean): void {
    this.store.dispatch(new ControllersActions.SetShowFullscreenTooltip(show));
  }

  setControllersFullscreenDictionary(
    dictionary: MangolControllersFullScreenDictionary
  ): void {
    this.store.dispatch(
      new ControllersActions.SetFullscreenDictionary(dictionary)
    );
  }

  /**************************
   * CURSOR state functions *
   **************************/

  getCursorState$(): Observable<fromCursor.State> {
    return this.store.select(state => state.cursor);
  }

  resetCursorMode(): void {
    this.store.dispatch(new CursorActions.ResetMode());
  }

  setCursorMode(mode: CursorMode): void {
    this.store.dispatch(new CursorActions.SetMode(mode));
  }

  setCursorVisible(visible: boolean): void {
    this.store.dispatch(new CursorActions.SetVisible(visible));
  }

  setCursorLayer(layer: VectorLayer): void {
    this.store.dispatch(new CursorActions.SetLayer(layer));
  }

  /**************************
   * FEATUREINFO state functions *
   **************************/

  getFeatureinfoState$(): Observable<fromFeatureinfo.State> {
    return this.store.select(state => state.featureinfo);
  }
}
