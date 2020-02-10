import {
  AfterContentChecked,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import {Cloudinary} from './cloudinary.service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cl-placeholder',
  template: `<img [src]="this.placeholderImg" [style.width.px]="this.itemWidth" [style.height.px]="this.itemHeight">`
  ,
})
export class CloudinaryPlaceHolder implements AfterContentChecked {
  @Input('type') type: string;
  @HostBinding('style.width') itemWidth;
  @HostBinding('style.height') itemHeight;
  @HostBinding('attr.public-id') publicId;

  options: object = {};
  placeholderImg: string;

  constructor(private cloudinary: Cloudinary) {}

  setWidth(width) {
    this.itemWidth = width;
  }

  setHeight(height) {
    this.itemHeight = height;
  }

  setPublicId(id) {
    this.publicId = id;
  }

  ngAfterContentChecked() {
    this.placeholderImg = this.getPlaceholderImage();
  }

  getPlaceholderImage() {
    const placeholderImageOptions = {
      'vectorize': {effect: 'vectorize', quality: 1},
      'pixelate': {effect: 'pixelate', quality: 1, fetch_format: 'auto'},
      'blur': {effect: 'blur:2000', quality: 1, fetch_format: 'auto'},
      'solid': [
        {width: 'iw_div_2', aspect_ratio: 1, crop: 'pad', background: 'auto'},
        {crop: 'crop', width: 10, height: 10, gravity: 'north_east'},
        {width: 'iw', height: 'ih', crop: 'fill'},
        {fetch_format: 'auto', quality: 'auto'}]
    }
    const transformation = [].concat.apply([], [this.options, placeholderImageOptions[this.type] || placeholderImageOptions['blur']]);
    const test = this.cloudinary.url(this.publicId, {transformation: transformation});

    return test;
  }
}
