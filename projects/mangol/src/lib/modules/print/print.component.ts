import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { PrintLayout, PrintSize } from '../../store/print/print.reducers';
import {
  MangolConfigPrintItem,
  PrintDictionary,
} from './../../interfaces/config-toolbar.interface';
import * as fromMangol from './../../store/mangol.reducers';
import * as PrintActions from './../../store/print/print.actions';

declare var jsPDF: any;
export interface Layout {
  name: string;
  value: string;
}

@Component({
  selector: 'mangol-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss'],
})
export class PrintComponent implements OnInit, OnDestroy {
  form: FormGroup;

  printConfig$: Observable<MangolConfigPrintItem>;
  dictionary$: Observable<PrintDictionary>;
  layouts$: Observable<PrintLayout[]>;
  resolutions$: Observable<number[]>;
  sizes$: Observable<PrintSize[]>;
  selectedLayout$: Observable<PrintLayout>;
  selectedResolution$: Observable<number>;
  selectedSize$: Observable<PrintSize>;

  printConfigSubscription: Subscription;

  printInProgress = false;

  constructor(
    private store: Store<fromMangol.MangolState>,
    private fb: FormBuilder
  ) {
    this.printConfig$ = this.store.select(
      (state) => state.config.config.sidebar.toolbar.print
    );
    this.dictionary$ = this.store.select((state) => state.print.dictionary);
    this.layouts$ = this.store.select((state) => state.print.layouts);
    this.resolutions$ = this.store.select((state) => state.print.resolutions);
    this.sizes$ = this.store.select((state) => state.print.sizes);
    this.selectedLayout$ = this.store.select(
      (state) => state.print.selectedLayout
    );
    this.selectedResolution$ = this.store.select(
      (state) => state.print.selectedResolution
    );
    this.selectedSize$ = this.store.select((state) => state.print.selectedSize);

    this.printConfigSubscription = this.printConfig$.subscribe((config) => {
      if (config.hasOwnProperty('dictionary')) {
        this.store.dispatch(new PrintActions.SetDictionary(config.dictionary));
      }
      if (config.hasOwnProperty('sizes')) {
        this.store.dispatch(new PrintActions.SetSizes(config.sizes));
      }
      if (config.hasOwnProperty('resolutions')) {
        this.store.dispatch(
          new PrintActions.SetResolutions(config.resolutions)
        );
      }
      if (config.hasOwnProperty('layouts')) {
        this.store.dispatch(new PrintActions.SetLayouts(config.layouts));
      }
    });
  }

  ngOnInit() {
    // Initialize the reactive form
    this.form = this.fb.group({
      layout: ['', Validators.required],
      size: ['', Validators.required],
      resolution: ['', Validators.required],
    });
  }

  ngOnDestroy() {
    if (this.printConfigSubscription) {
      this.printConfigSubscription.unsubscribe();
    }
  }

  /**
   * Performs the print action
   */
  print(): void {
    combineLatest([
      this.store
        .select((state) => state.map.map)
        .pipe(filter((m) => m !== null)),
      this.selectedLayout$,
      this.selectedResolution$,
      this.selectedSize$,
    ])
      .pipe(take(1))
      .subscribe(([m, layout, resolution, size]) => {
        this.printInProgress = true;
        const width = Math.round(
          ((layout.type === 'landscape' ? size.width : size.height) *
            resolution) /
            25.4
        );
        const height = Math.round(
          ((layout.type === 'landscape' ? size.height : size.width) *
            resolution) /
            25.4
        );
        const mapSize = m.getSize();
        const extent = m.getView().calculateExtent(mapSize);
        // https://openlayers.org/en/latest/examples/export-pdf.html
        m.once('rendercomplete', (event: any) => {
          const mapCanvas = document.createElement('canvas');
          mapCanvas.width = width;
          mapCanvas.height = height;
          const mapContext = mapCanvas.getContext('2d');
          document
            .querySelectorAll('.ol-layer canvas')
            .forEach((canvas: any) => {
              if (canvas.width > 0) {
                const opacity = canvas.parentNode.style.opacity;
                mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
                const transform = canvas.style.transform;
                // Get the transform parameters from the style's transform matrix
                const matrix = transform
                  .match(/^matrix\(([^\(]*)\)$/)[1]
                  .split(',')
                  .map(Number);
                // Apply the transform to the export map context
                CanvasRenderingContext2D.prototype.setTransform.apply(
                  mapContext,
                  matrix
                );
                mapContext.drawImage(canvas, 0, 0);
              }
            });
          const pdf = new jsPDF(layout.type, undefined, size.id);
          pdf.addImage(
            mapCanvas.toDataURL('image/jpeg'),
            'JPEG',
            0,
            0,
            layout.type === 'landscape' ? size.width : size.height,
            layout.type === 'landscape' ? size.height : size.width
          );
          pdf.save('map.pdf');
          m.setSize(mapSize);
          m.getView().fit(extent, { size: mapSize });
          this.printInProgress = false;
        });
        const printSize: [number, number] = [width, height];
        m.setSize(printSize);
        m.getView().fit(extent, { size: printSize });
        m.renderSync();
      });
  }

  /**
   * Layout change
   * @param evt
   */
  onLayoutChange(evt: MatSelectChange) {
    this.store.dispatch(
      new PrintActions.SetSelectedLayout(
        !!evt.value ? <PrintLayout>evt.value : null
      )
    );
  }

  /**
   * Size change
   * @param evt
   */
  onSizeChange(evt: MatSelectChange) {
    this.store.dispatch(
      new PrintActions.SetSelectedSize(
        !!evt.value ? <PrintSize>evt.value : null
      )
    );
  }

  /**
   * Resolution change
   * @param evt
   */
  onResolutionChange(evt: MatSelectChange) {
    this.store.dispatch(
      new PrintActions.SetSelectedResolution(
        !!evt.value ? <number>evt.value : null
      )
    );
  }
}
