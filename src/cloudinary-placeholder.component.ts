import {
  Component,
  Input,
  ViewChild,
  ElementRef
} from '@angular/core';

@Component({
  styleUrls: ['./cloudinary-placeholder.component.css'],
  templateUrl: './cloudinary-placeholder.component.html'
})
export class CloudinaryPlaceHolder {
  // @ts-ignore
  @ViewChild('image_container') image_container: ElementRef<any>;
  @Input('public-id') publicId: string;
  @Input() width: string;
  @Input() placeholder_type: string;
  // @Input() placeholder = true;



  doSomething() {
    const largePicture = this.image_container.nativeElement;
    largePicture.classList.add('loaded');
  }
  getSmallImage() { // blur cartoonify pixelate
    if (this.placeholder_type) {
      return `https://res.cloudinary.com/rcstraus/image/upload/e_${this.placeholder_type},q_auto,w_50,f_auto/${this.publicId}`;
    }
    return `https://res.cloudinary.com/rcstraus/image/upload/e_blur,q_auto,w_50,f_auto/${this.publicId}`;
  }

  getLargeImag() {
    if (this.width) {
      return `https://res.cloudinary.com/rcstraus/image/upload/w_${this.width}/${this.publicId}`;
    }
    return `https://res.cloudinary.com/rcstraus/image/upload/${this.publicId}`;
  }

}
