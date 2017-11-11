import { HostBinding, OnInit, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { MangolMap } from '../../core/map';
import {
  MangolConfigMapControllerQuickSearch,
  MangolConfigMapControllerQuickSearchItem
} from '../../interfaces/mangol-config-map-controllers.interface';

@Component({
  selector: 'mangol-quick-search',
  templateUrl: './quick-search.component.html'
})
export class MangolQuickSearchComponent implements OnInit {
  @HostBinding('class') class = 'mangol-quick-search';

  @Input() map: MangolMap;
  @Input() opts: MangolConfigMapControllerQuickSearch;

  items: MangolConfigMapControllerQuickSearchItem[];
  filteredOptionsObservable: Observable<MangolConfigMapControllerQuickSearchItem[]>;
  filteredOptions: MangolConfigMapControllerQuickSearchItem[];
  placeholder: string;
  formControl: FormControl;

  constructor() {
    this.formControl = new FormControl();
  }

  ngOnInit() {
    this.placeholder = this.opts.hasOwnProperty('placeholder') ? this.opts.placeholder : 'Quicksearch';
    this.items = this.opts.hasOwnProperty('items') ? this.opts.items : [];
    this.filteredOptionsObservable = this.formControl.valueChanges
      .startWith('')
      .map(val => this._filter(val));
    this.filteredOptions = [];
  }

  private _filter(val: string): MangolConfigMapControllerQuickSearchItem[] {
    this.filteredOptions = this.items.filter((option: MangolConfigMapControllerQuickSearchItem) =>
      option.text.toLowerCase().indexOf(val.toLowerCase()) === 0);
    return this.filteredOptions;
  }

  onOptionSeleted($event: MatAutocompleteSelectedEvent) {
    let selected: MangolConfigMapControllerQuickSearchItem = null;
    for (let i = 0; i < this.filteredOptions.length; i++) {
      if (this.filteredOptions[i].text === $event.option.value) {
        selected = this.filteredOptions[i];
        break;
      }
    }
    if (selected.hasOwnProperty('extent')) {
      this._zoomToExtent(selected);
    } else if (selected.hasOwnProperty('coordinates')) {
      this._zoomToCoordinates(selected);
    }
  }

  private _zoomToCoordinates(selected: MangolConfigMapControllerQuickSearchItem) {
    this.map.getView().animate({
      center: selected.coordinates
    });
  }

  private _zoomToExtent(selected: MangolConfigMapControllerQuickSearchItem) {
    this.map.getView().fit(selected.extent, {
      duration: 500
    });
  }

}
