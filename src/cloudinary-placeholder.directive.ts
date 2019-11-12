import {AfterViewInit, Directive, ViewChild} from '@angular/core';
import { CloudinaryPlaceHolder } from'./cloudinary-placeholder.component';

@Directive({
  selector: 'cl-image[placeholder]'
})
export class PlaceHolderDirective implements AfterViewInit {
  @ViewChild(CloudinaryPlaceHolder) placeholder: CloudinaryPlaceHolder;


  // constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.placeholder;
    console.log('placeholder', this.placeholder);
  }
}
