import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import Feature from 'ol/Feature';
import { Observable } from 'rxjs';

import { PrintDictionary } from './interfaces/config-toolbar.interface';
import { MangolLayer } from './classes/Layer';
import { CursorMode } from './interfaces/cursor-mode';
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
import * as LayersActions from './store/layers/layers.actions';
import * as fromLayers from './store/layers/layers.reducers';
import * as FeatureinfoActions from './store/featureinfo/featureinfo.actions';
import * as fromFeatureinfo from './store/featureinfo/featureinfo.reducers';
import { FeatureinfoDictionary } from './store/featureinfo/featureinfo.reducers';
import * as fromLayertree from './store/layertree/layertree.reducers';
import * as LayertreeActions from './store/layertree/layertree.actions';
import { LayertreeDictionary } from './store/layertree/layertree.reducers';
import * as fromMeasure from './store/measure/measure.reducers';
import * as MeasureActions from './store/measure/measure.actions';
import {
  MeasureDictionary,
  MeasureMode
} from './store/measure/measure.reducers';
import { PrintLayout, PrintSize } from './store/print/print.reducers';
import * as fromPrint from './store/print/print.reducers';
import * as PrintActions from './store/print/print.actions';

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
  layersState$: Observable<fromLayers.State>;
  layertreeState$: Observable<fromLayertree.State>;
  measureState$: Observable<fromMeasure.State>;
  printState$: Observable<fromPrint.State>;

  constructor(private store: Store<fromMangol.MangolState>) {
    this.configState$ = this.store.select(fromMangol.getConfigState);
    this.mapState$ = this.store.select(fromMangol.getMapState);
    this.sidebarState$ = this.store.select(fromMangol.getSidebarState);
    this.controllersState$ = this.store.select(fromMangol.getControllersState);
    this.cursorState$ = this.store.select(fromMangol.getCursorState);
    this.featureinfoState$ = this.store.select(fromMangol.getFeatureInfoState);
    this.layersState$ = this.store.select(fromMangol.getLayersState);
    this.layertreeState$ = this.store.select(fromMangol.getLayertreeState);
    this.measureState$ = this.store.select(fromMangol.getMeasureState);
    this.printState$ = this.store.select(fromMangol.getPrint);
  }

  /**
   * Resets the Mangol State
   */
  resetMangolState(): void {
    this.store.dispatch(new MangolActions.ClearState());
  }

  /*
   * CONFIG state functions
   */

  setConfig(config: MangolConfig): void {
    this.store.dispatch(new ConfigActions.SetConfig(config));
  }

  /*
   * MAP state functions
   */

  setMap(map: Map): void {
    this.store.dispatch(new MapActions.SetMap(map));
  }

  /*
   * SIDEBAR state functions
   */

  toggleSidebar(): void {
    this.store.dispatch(new SidebarActions.Toggle());
  }
  setHasSidebar(hasSidebar: boolean): void {
    this.store.dispatch(new SidebarActions.SetHasSidebar(hasSidebar));
  }
  setSidebarMode(mode: string): void {
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
  setSidebarSelectedModule(module: string): void {
    this.store.dispatch(new SidebarActions.SetSelectedModule(module));
  }

  /*
   * CONTROLLERS state functions
   */

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

  /*
   * CURSOR state functions
   */

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

  /*
   * FEATUREINFO state functions
   */

  featureinfoSetHasFeatureinfo(hasFeatureinfo: boolean): void {
    this.store.dispatch(new FeatureinfoActions.HasFeatureinfo(hasFeatureinfo));
  }
  featureinfoSetDisabled(disabled: boolean): void {
    this.store.dispatch(new FeatureinfoActions.SetDisabled(disabled));
  }
  featureinfoSetTitle(title: string): void {
    this.store.dispatch(new FeatureinfoActions.SetTitle(title));
  }
  featureinfoSetMaxFeatures(maxFeatures: number): void {
    this.store.dispatch(new FeatureinfoActions.SetMaxFeatures(maxFeatures));
  }
  featureinfoSetLayers(layers: MangolLayer[]): void {
    this.store.dispatch(new FeatureinfoActions.SetLayers(layers));
  }
  featureinfoSetSelectedLayer(layer: MangolLayer): void {
    this.store.dispatch(new FeatureinfoActions.SetSelectedLayer(layer));
  }
  featureinfoSetResultsLayer(layer: VectorLayer): void {
    this.store.dispatch(new FeatureinfoActions.SetResultsLayer(layer));
  }
  featureinfoSetResultsItems(features: Feature[]): void {
    this.store.dispatch(new FeatureinfoActions.SetResultsItems(features));
  }
  featureinfoSetDictionary(dictionary: FeatureinfoDictionary): void {
    this.store.dispatch(new FeatureinfoActions.SetDictionary(dictionary));
  }
  featureinfoSetHoverColor(color: [number, number, number]): void {
    this.store.dispatch(new FeatureinfoActions.SetHoverColor(color));
  }

  /**
   * LAYERS state functions
   */

  layersSetLayers(layers: MangolLayer[]): void {
    this.store.dispatch(new LayersActions.SetLayers(layers));
  }

  layersAddLayer(layer: MangolLayer): void {
    this.store.dispatch(new LayersActions.AddLayer(layer));
  }

  layersRemoveLayer(name: string): void {
    this.store.dispatch(new LayersActions.RemoveLayer(name));
  }

  layersSetMeasureLayer(layer: VectorLayer): void {
    this.store.dispatch(new LayersActions.SetMeasureLayer(layer));
  }

  /**
   * LAYERTREE state functions
   */

  layertreeSetHasLayertree(hasLayertree: boolean): void {
    this.store.dispatch(new LayertreeActions.HasLayertree(hasLayertree));
  }
  layertreeSetDisabled(disabled: boolean): void {
    this.store.dispatch(new LayertreeActions.SetDisabled(disabled));
  }
  layertreeSetTitle(title: string): void {
    this.store.dispatch(new LayertreeActions.SetTitle(title));
  }
  layertreeSetDictionary(dictionary: LayertreeDictionary): void {
    this.store.dispatch(new LayertreeActions.SetDictionary(dictionary));
  }
  layertreeShowLayergroupBadges(showBadges: boolean): void {
    this.store.dispatch(new LayertreeActions.ShowLayergroupBadges(showBadges));
  }

  /**
   * MEASURE state functions
   */

  measureSetHasMeasure(hasMeasure: boolean): void {
    this.store.dispatch(new MeasureActions.HasMeasure(hasMeasure));
  }
  measureSetDisabled(disabled: boolean): void {
    this.store.dispatch(new MeasureActions.SetDisabled(disabled));
  }
  measureSetTitle(title: string): void {
    this.store.dispatch(new MeasureActions.SetTitle(title));
  }
  measureSetDictionary(dictionary: MeasureDictionary): void {
    this.store.dispatch(new MeasureActions.SetDictionary(dictionary));
  }
  measureSetMode(mode: MeasureMode): void {
    this.store.dispatch(new MeasureActions.SetMode(mode));
  }

  /**
   * PRINT state functions
   */
  printSetHasPrint(hasPrint: boolean): void {
    this.store.dispatch(new PrintActions.HasPrint(hasPrint));
  }
  printSetDisabled(disabled: boolean): void {
    this.store.dispatch(new PrintActions.SetDisabled(disabled));
  }
  printSetTitle(title: string): void {
    this.store.dispatch(new PrintActions.SetTitle(title));
  }
  printSetResolutions(resolutions: number[]): void {
    this.store.dispatch(new PrintActions.SetResolutions(resolutions));
  }
  printSetLayouts(layouts: PrintLayout[]): void {
    this.store.dispatch(new PrintActions.SetLayouts(layouts));
  }
  printSetSizes(sizes: PrintSize[]): void {
    this.store.dispatch(new PrintActions.SetSizes(sizes));
  }
  printSetDictionary(dictionary: PrintDictionary): void {
    this.store.dispatch(new PrintActions.SetDictionary(dictionary));
  }
  printSetSelectedLayout(layout: PrintLayout): void {
    this.store.dispatch(new PrintActions.SetSelectedLayout(layout));
  }
  printSetSelectedResolution(resolution: number): void {
    this.store.dispatch(new PrintActions.SetSelectedResolution(resolution));
  }
  printSetSelectedSize(size: PrintSize): void {
    this.store.dispatch(new PrintActions.SetSelectedSize(size));
  }
}
