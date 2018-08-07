import { MangolState } from './../../mangol.state';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import Map from 'ol/Map';
import TileWMS from 'ol/source/TileWMS';

import { FeatureCollection } from 'geojson';

import GeoJSON from 'ol/format/GeoJSON';

import { MangolLayer } from './../../classes/Layer';
import Feature from 'ol/Feature';

@Injectable({
  providedIn: 'root'
})
export class FeatureinfoService {
  geojsonFormat = new GeoJSON();

  constructor(private store: Store, private http: HttpClient) {}

  /**
   * Gets the GetFeatureInfo WMS url from a layer
   * @param layer
   * @param m
   * @param coordinates
   */
  getFeatureinfoUrl(layer: MangolLayer, m: Map, coordinates: [number, number]) {
    const source: TileWMS = <TileWMS>layer.layer.getSource();
    const maxFeatuers = this.store.selectSnapshot(
      (state: MangolState) => state.featureinfo.maxFeatures
    );
    let url = source.getGetFeatureInfoUrl(
      coordinates,
      m.getView().getResolution(),
      m
        .getView()
        .getProjection()
        .getCode(),
      { INFO_FORMAT: 'application/json', FEATURE_COUNT: maxFeatuers }
    );
    if (url) {
      // In case of a GWC layer somehow there is I and J instead of X and Y, so we must change that
      url = url.replace('&I=', '&X=').replace('&J=', '&Y=');
      return url;
    } else {
      return null;
    }
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
        responseType: 'json'
      })
      .pipe(
        map(response => {
          const featureCollection = <FeatureCollection<any, any>>response;
          const format =
            dataProjection !== featureProjection
              ? new GeoJSON({
                  defaultDataProjection: dataProjection,
                  featureProjection: featureProjection
                })
              : this.geojsonFormat;
          return format.readFeatures(featureCollection);
        }),
        catchError(error => {
          return Observable.throw(error);
        })
      );
  }
}
