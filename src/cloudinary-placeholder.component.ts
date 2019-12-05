import {
  AfterContentChecked,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import {Cloudinary} from './cloudinary.service';


@Component({
  selector: 'cl-placeholder',
  template: `<img [src]="this.smallImg" [style.width.px]="this.itemWidth"[style.height.px]="this.itemHeight">`
  ,
})
export class CloudinaryPlaceHolder implements AfterContentChecked {
  @Input('type') type: string;
  @HostBinding('style.width') itemWidth;
  @HostBinding('style.height') itemHeight;
  @HostBinding('attr.public-id') publicId;

  options: object = {};
  smallImg: string;

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
    this.smallImg = this.getSmallImage();
  }

  getSmallImage() {
    if (this.type === 'vectorize') {
      return this.cloudinary.url(this.publicId, {transformation: [this.options, {effect: this.type, quality: 1}]});
    } else if (this.type === 'pixelate') {
        return this.cloudinary.url(this.publicId, {transformation: [this.options, {effect: this.type, quality: 1, fetch_format: 'auto'}]});
    } else if (this.type === 'solid') {
      return this.cloudinary.url(this.publicId, {
        transformation: [this.options,
          {width: 'iw_div_2', aspect_ratio: 1, crop: 'pad', background: 'auto'},
          {crop: 'crop', width: 10, height: 10, gravity: 'north_east'},
          {width: 'iw', height: 'ih', crop: 'fill'}]
      });
    } else {
      return this.cloudinary.url(this.publicId, {transformation: [this.options, {effect: 'blur:500', quality: 1, fetch_format: 'auto'}]});
    }
  }
}
