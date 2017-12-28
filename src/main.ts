import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { MangolDemoModule } from './app/app.module';

enableProdMode();

platformBrowserDynamic().bootstrapModule(MangolDemoModule)
  .catch(err => console.log(err));
