import {AfterContentInit, ContentChild, Directive} from '@angular/core';
import { CloudinaryPlaceHolder } from'./cloudinary-placeholder.component';

@Directive({
  selector: 'h3[placeholder]'
})
export class PlaceHolderDirective implements AfterContentInit {
  @ContentChild(CloudinaryPlaceHolder) placeholderComponent: CloudinaryPlaceHolder;

  ngAfterContentInit(): void {
    // this.placeholderComponent;
    // console.log('this', this);
    // console.log('placeholder', this.placeholderComponent);
  }
}
