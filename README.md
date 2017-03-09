# Mangol
> Maps created with Angular2+ & OpenLayers3

[![Join the chat at https://gitter.im/mangol_official/Lobby](https://badges.gitter.im/mangol_official/Lobby.svg)](https://gitter.im/mangol_official/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Dependency Status](https://david-dm.org/fegyi001/mangol.svg)](https://david-dm.org/fegyi001/mangol)
[![devDependency Status](https://david-dm.org/fegyi001/mangol/dev-status.svg)](https://david-dm.org/fegyi001/mangol#info=devDependencies)

## About Mangol
Mangol is an open source library for combining [Angular2+](https://angular.io/) and [OpenLayers3+](https://openlayers.org/) to create modern, responsive interactive web maps (_M_ stands for _maps_, _ang_ for _Angular_ and _ol_ for _OpenLayers_). The project has been created using [angular-cli](https://cli.angular.io/), a command-line tool for Angular2 projects. The project is written in TypeScript and uses SCSS for styling. It has been built with Angular2 (2.4.8) and TypeScript2 (2.0.10). The packaging is done via [Webpack module bundler](https://webpack.github.io/).

Formerly, Mangol was called `ng2ol3` and was based on SystemJS and without angular-cli.

## Install
[Node.js with npm](https://nodejs.org/en/download/) is required. The preferenced version of Node.js is 6.10.0, the preferenced version of npm is 4.x.x. After `git clone`, navigate to the main directory and run ```npm install``` to download all dependencies.

## Live example
An online example can be opened [here](http://188.166.116.137/mangol/dist).

## Use as source

If you wish to see the built-in demos or modify the source files, simply run ```ng serve``` to load the demo page on ```localhost:4200```. With this command you can also watch file changes until you shut it down. 

## Use as npm library

If you would like to use Mangol as an npm library in your Angular2 (TypeScript) project, you can also do that since [Mangol is on npm](https://www.npmjs.com/package/mangol) as well.

First, add Mangol as a dependency to your project: 
```batch
npm install mangol --save 
```

You have to add to your `app.module.ts` (or whatever you call it in your project, the one that gets bootstrapped in main.ts) 

```typescript
import {MangolModule} from 'mangol/index';
```

And in @NgModule add MangolModule to the imports:

```typescript
imports: [
    ...,
    MangolModule.forRoot(),
    ...
]
```

After that, you can use Mangol html tags in your templates such as
```html
<mangol-container></mangol-container>
``` 

This is the simplest implementation of Mangol in a component (this will create a default map with zoom buttons and with one OpenStreetMap layer) :
```typescript
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
      <mangol-container></mangol-container>
    `
})
export class DemoMapComponent {

}
```

You also have to add some vendor css/scss & js files. If you use Webpack and created your project with angular-cli, add the following libraries to you `angular-cli.json`:

```json
"styles": [
    "../node_modules/openlayers/dist/ol.css",
    "../node_modules/font-awesome/css/font-awesome.min.css",
    "../node_modules/mangol/vendor/mapskin/css/mapskin.min.css",
    "../node_modules/mangol/vendor/material-icons/material-icons.css",
    "../node_modules/mangol/src/assets/mangol.scss",
],
"scripts": [
    "../node_modules/openlayers/dist/ol.js",
    "../node_modules/proj4/dist/proj4.js",
    "../node_modules/jspdf/dist/jspdf.min.js"
]
```

If you use SystemJS add the files above in a regular way to your index.html (with link and script tags).

## Present & Future
This project is still very new and therefore it contains only a couple of components (widgets), most of them are under heavy development. In the near future I intend to add/extend other widgets. More examples will arrive as soon as the project becomes smarter.

![demo](src/assets/img/screenshots/demo-map_20161211.png)

## Author
```Mangol``` was created by [Gergely Padányi-Gulyás](http://gpadanyig.com)
