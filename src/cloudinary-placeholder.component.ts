import {
  AfterContentChecked,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import {Cloudinary} from './cloudinary.service';
import { placeholderImageOptions, predominantColorTransformPxl } from './constants';

@Component({
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
    if (this.type === 'predominant-color' && this.itemHeight && this.itemWidth) {
      return this.cloudinary.url(this.publicId, {transformation: [this.options, ...predominantColorTransformPxl]});
    } else {
      return this.cloudinary.url(this.publicId, {transformation: [this.options, ...placeholderImageOptions[this.type] || placeholderImageOptions['blur']]})
    }
  }
}
