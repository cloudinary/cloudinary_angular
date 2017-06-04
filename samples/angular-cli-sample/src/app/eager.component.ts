import { Component } from '@angular/core';

import { SharedModule } from './shared/shared.module';

@Component({
  template: `<h1>Eager Component</h1>
  <cl-image public-id="sample" width="auto" crop="scale" responsive></cl-image>`
})
export class EagerComponent { }
