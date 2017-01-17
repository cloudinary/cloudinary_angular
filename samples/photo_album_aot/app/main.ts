import { platformBrowser }    from '@angular/platform-browser';
import { AppModuleNgFactory } from '../aot/app/js/app.module.ngfactory';
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
