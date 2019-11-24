import {
  Component,
  Input,
  ContentChild,
  ContentChildren, QueryList,
} from '@angular/core';
import {Cloudinary} from './cloudinary.service';
import { CloudinaryImage } from './cloudinary-image.component';

@Component({
  selector: 'placeholder',
  template: `<div style="position: relative; overflow:hidden" [style.width.px]="this.width" [style.height.px]="this.height"><img style="width: 100%; position: relative; transform: scale(1)" [src]="getSmallImage()">
  <div style="position: absolute;top: 0;left: 0; width: 100%;height: 100%;transition: opacity 1s linear;" [style.opacity]="cloudinaryImage.sholdShowPlaceHolder ? 0 : 1">
      <ng-content></ng-content>
  </div></div>
  `
  ,
// <div *ngIf="this.cloudinaryImage.sholdHidePlaceHolder">  should make image disappear once loaded?
})
export class CloudinaryPlaceHolder {
  // @ts-ignore
  @Input('public-id') publicId: string;
  @Input() width: string;
  @Input('height') height: string;
  @Input() placeholder_type: string;

  showImage: boolean = true;

  @ContentChild(CloudinaryImage) cloudinaryImage: CloudinaryImage;
  @ContentChildren(CloudinaryImage)
  transformations: QueryList<CloudinaryImage>;

  constructor(private cloudinary: Cloudinary) {}

  toggleImage() {
    this.showImage = !this.showImage;
  }
  ngAfterViewInit() {
    console.log('width', this.width);
    this.width = this.cloudinaryImage.width;
    this.height = this.cloudinaryImage.height;
    this.publicId = this.cloudinaryImage.publicId;
    console.log('transformations', this.transformations);
    console.log('cloudinary-image', this.cloudinaryImage);
  }

  getSmallImage() { // blur cartoonify pixelate
    // take percentagge of original image with limit 200
    if (this.placeholder_type) {
      return this.cloudinary.url(this.publicId, {effect: this.placeholder_type, quality: 'auto', fetch_format: 'auto', width: '50', crop: 'fit'});
    }
    return this.cloudinary.url(this.publicId, {quality: 'auto', fetch_format: 'auto', width: '50', crop: 'fit', effect: 'blur'});
  }
}
