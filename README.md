# Mangol

> Maps created with Angular & OpenLayers using Material design

<img src="./src/assets/img/logo/mangol_logo.png" width="200">

[![Join the chat at https://gitter.im/mangol_official/Lobby](https://badges.gitter.im/mangol_official/Lobby.svg)](https://gitter.im/mangol_official/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Dependency Status](https://david-dm.org/fegyi001/mangol.svg)](https://david-dm.org/fegyi001/mangol)
[![devDependency Status](https://david-dm.org/fegyi001/mangol/dev-status.svg)](https://david-dm.org/fegyi001/mangol#info=devDependencies)

## About Mangol

Mangol is an open source web mapping library for combining [Angular](https://angular.io/), [Angular Material](https://material.angular.io/) and [OpenLayers](https://openlayers.org/) to create a modern, responsive interactive GUI for web maps (_M_ stands for _Material_, _ang_ for _Angular_ and _ol_ for _OpenLayers_). The project is written in TypeScript and uses SCSS for styling. Mangol uses [ngrx/store](https://github.com/ngrx/platform) under the hood for state management.

## Live example

An online example can be opened [here](http://188.166.116.137/mangol).

## Run demo & edit source files

If you wish to see the built-in demos or modify the source files, simply run `ng serve` or `npm run start` to load the demo page on `localhost:4200`. With this command you can also watch file changes until you shut it down.

## Use as npm dependency

You most likely want to use Mangol as an npm library in your Angular (TypeScript & SCSS) project. You can also do that since [Mangol is on npm](https://www.npmjs.com/package/mangol) as well.

First, add Mangol as a dependency to your project:

```batch
npm install --save mangol
```

or

```batch
yarn add mangol
```

You have to add to your `app.module.ts` (or whatever you call it in your project, the one that gets bootstrapped in main.ts)

```typescript
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MangolModule } from 'mangol';
```

And in @NgModule add MangolModule and BrowserAnimationsModule to the imports:

```typescript
imports: [
    ...,
    BrowserAnimationsModule,
    MangolModule,
    ...
]
```

Also add some vendor js files. If you use Webpack and created your project with @angular/cli, add the following libraries to your `angular.json`:

```json
"scripts": [
    "node_modules/proj4/dist/proj4.js",
    "node_modules/jspdf/dist/jspdf.min.js"
]
```

At the beginning of your main SCSS file, you should import mangol.scss like this:

```scss
@import '~mangol/scss/mangol';
```

After that, you can use Mangol html tags in your templates such as

```html
<mangol></mangol>
```

## Run on localhost

At the moment when you run `ng serve` there will be the well-known error in the browser console: `ExpressionChangedAfterItHasBeenCheckedError`. Until this is fixed in Mangol please enable production mode in `main.ts` like this:

```typescript
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

enableProdMode();

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));
```

## Production build

Unfortunately there are some known issues with OL when build using Ahead-of-time (aot). To make aot possible, you should modify the `angular.json` and set `optimization: false` (default is `true`). After that, `ng build --prod --aot` should work fine.

## Basic example

This is the simplest implementation of Mangol in a component (this will create a default map with one OpenStreetMap layer) :

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <mangol></mangol>
  `
})
export class AppComponent {}
```

## Configuring the component

You can further configure your Mangol component by creating a variable of type <b>MangolConfig</b> and add this property as an input for yor mangol component like this:

```typescript
import { Component, OnInit } from '@angular/core';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj.js';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { MangolConfig, MangolLayer } from 'mangol';

@Component({
  selector: 'app',
  template: `
     <mangol [config]="mangolConfig"></mangol>
  `
})
export class AppComponent implements OnInit {
  // Notice the MangolConfig type, this  is a helper interface to easily fill out the required and optional parameters for your Mangol configuration.
  mangolConfig = {} as MangolConfig;

  public ngOnInit() {
    this.mangolConfig = {
      map: {
        renderer: 'canvas',
        target: 'mangol-demo',
        view: new View({
          projection: 'EPSG:900913',
          center: fromLonLat(
            [19.3956393810065, 47.168464955013],
            'EPSG:900913'
          ),
          zoom: 4
        }),
        layers: [
          new MangolLayer({
            name: 'OpenStreetMap Layer',
            details: 'Here are the OSM layer details',
            layer: new TileLayer({
              source: new OSM(),
              visible: true
            })
          })
        ]
      },
      sidebar: {
        opened: true,
        toolbar: {
          layertree: {},
          measure: {}
        }
      }
    };
  }
}
```

Mangol is highly configurable through MangolConfig. Just check the API doc for further options (currently under heavy development).

## Access and modify the internal State

After initialization you can also modify almost everything (also in progress) on your running Mangol app with a helper service called <b>MangolService</b>. Mangol is written in a reactive way which means almost every property is an RxJS Observable. Mangol itself uses @ngrx/store under the hood, and with the injectable MangolService you can access and modify the store state easily.

For example, if you wish to open the sidebar and change its title in runtime all you have to do is call the appropriate public functions form MangolService:

```typescript
import { Component, OnInit } from '@angular/core';
import { MangolService, MangolConfig } from 'mangol';

@Component({
  selector: 'app-root',
  template: `
    <mangol [config]="mangolConfig"></mangol>
  `
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  config: MangolConfig;

  constructor(private mangolService: MangolService) {}

  ngOnInit() {
    // Initialize the MangolConfig with an empty and closed sidebar
    this.config = {
      sidebar: { title: 'Mangol Sidebar', collapsible: true, opened: true }
    };
    // After 1.5 seconds rename the sidebar title
    setTimeout(() => {
      this.mangolService.setSidebarTitle('My title modified after 1.5 sec');
    }, 1500);
    // After 3 seconds toggle the sidebar
    setTimeout(() => {
      this.mangolService.toggleSidebar();
      console.log('I just toggled the sidebar.');
    }, 3000);
  }
}
```

## Styling

Mangol uses Material components and therefore it supports some SCSS customization. For example if you wish to alter the default colors, you can easily do that by overwriting the primary, accent and warn Material palettes <b>before</b> importing mangol.scss. Do it like this:

```scss
@import '~@angular/material/theming';
@include mat-core();
$mangol-primary: mat-palette($mat-teal);
$mangol-accent: mat-palette($mat-lime);
$mangol-warn: mat-palette($mat-deep-orange);
$mangol-theme: mat-light-theme($mangol-primary, $mangol-accent, $mangol-warn);

@import '~mangol/scss/mangol';
```

If you wish to set the component height, sidebar width or the quicksearch panel width, also do it before importing mangol.scss:

```scss
$mangol-height: 400px;
$mangol-sidebar-width: 450px;
$mangol-quicksearch-width: 250px;

@import '~mangol/scss/mangol';
```

## Present & Future

This project is still under heavy development. In the near future I intend to add/extend other widgets. More examples will arrive as soon as the project becomes smarter. Any notice, remarks or pull requests are appreciated.

## Author

`Mangol` was created by [Gergely Padányi-Gulyás](mailto:fegyi001@gmail.com)
