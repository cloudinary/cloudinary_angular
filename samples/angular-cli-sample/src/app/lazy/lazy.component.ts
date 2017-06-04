import { Component, OnInit } from '@angular/core';

import { CloudinaryModule } from '@cloudinary/angular-4.x';

@Component({
  template: `<h1>Lazy Component</h1>
<h3 *ngIf="images && images.length == 0">
  Loading images...
</h3>
<ngb-carousel [interval]="myInterval" [wrap]="wrapSlides" *ngIf="images">
  <ng-template ngbSlide *ngFor="let image of images">
        <cl-image public-id="{{image.imageIdentifier}}"
                  width="270"
                  responsive
                  height="150"
                  crop="fill"
                  gravity="auto"
                  fetch_format="auto"
        >
        </cl-image>
  </ng-template>
</ngb-carousel>`})
export class LazyComponent implements OnInit {
  wrapSlides = true;
  myInterval = 1000;
  images: Array<Object> = [];

  ngOnInit(): void {
    setTimeout(() => {
      this.images.push({ imageIdentifier: 'sample' });
      this.images.push({ imageIdentifier: 'couple' });
      this.images.push({ imageIdentifier: 'nice_couple' });
    }, 5000);
  }
}
