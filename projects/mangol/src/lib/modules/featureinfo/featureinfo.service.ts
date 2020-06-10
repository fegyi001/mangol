import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FeatureCollection } from 'geojson';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import TileWMS from 'ol/source/TileWMS';
import { Observable, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

import { MangolLayer } from './../../classes/Layer';
import * as fromMangol from './../../store/mangol.reducers';

@Injectable({
  providedIn: 'root',
})
export class FeatureinfoService {
  geojsonFormat = new GeoJSON();

  constructor(
    private store: Store<fromMangol.MangolState>,
    private http: HttpClient
  ) {}

  /**
   * Gets the GetFeatureInfo WMS url as an Observable from a layer
   * @param layer
   * @param m
   * @param coordinates
   */
  getFeatureinfoUrl$(
    layer: MangolLayer,
    m: Map,
    coordinates: [number, number]
  ): Observable<string> {
    return this.store
      .select((state) => state.featureinfo.maxFeatures)
      .pipe(
        take(1),
        map((maxFeatures) => {
          const source: TileWMS = <TileWMS>layer.layer.getSource();
          let url: string = source.getFeatureInfoUrl(
            coordinates,
            m.getView().getResolution(),
            m.getView().getProjection().getCode(),
            { INFO_FORMAT: 'application/json', FEATURE_COUNT: maxFeatures }
          );
          if (url) {
            // In case of a GWC layer somehow there is I and J instead of X and Y, so we must change that
            url = url.replace('&I=', '&X=').replace('&J=', '&Y=');
          } else {
            url = null;
          }
          return url;
        })
      );
  }

  /**
   * Requests the featureinfo geojson from the remote server
   * @param url
   * @param dataProjection
   * @param featureProjection
   */
  getFeatureinfo(
    url: string,
    dataProjection: string,
    featureProjection: string
  ): Observable<Feature[]> {
    return this.http
      .get(url, {
        observe: 'body',
        responseType: 'json',
      })
      .pipe(
        map((response) => {
          const featureCollection = <FeatureCollection<any, any>>response;
          let format = new GeoJSON();
          if (dataProjection !== featureProjection) {
            const pseudoGeoJSONFormat = <any>GeoJSON;
            format = new pseudoGeoJSONFormat({
              dataProjection: dataProjection,
              featureProjection: featureProjection,
            });
          }
          return format.readFeatures(featureCollection);
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }
}
