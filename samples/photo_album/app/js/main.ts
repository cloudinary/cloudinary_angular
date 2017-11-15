import 'zone.js/dist/zone';
import 'reflect-metadata';

// Load global styles
import '!!style-loader!css-loader!../css/app.css';
import '!!style-loader!css-loader!../css/animations.css';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

declare var ENV: string;
if (ENV === 'production') {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
