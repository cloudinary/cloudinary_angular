import {VERSION} from '@angular/core';
import {APP_VERSION} from './version';

export let analyticsOptionsDefault = {
  sdkSemver: APP_VERSION,
  techVersion: VERSION.full,
  sdkCode: 'K',
};
