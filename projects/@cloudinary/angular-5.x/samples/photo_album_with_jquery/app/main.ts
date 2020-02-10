import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// Load 3rd party dependencies
require('jquery');
require('jquery.ui.widget');
require('jquery.iframe-transport');
require('jquery.fileupload');

import { AppModule } from './js/app.module';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
