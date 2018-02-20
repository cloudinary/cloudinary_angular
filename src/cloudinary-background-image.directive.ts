import {Directive, ElementRef, Renderer2, AfterViewInit, Input, QueryList, ContentChildren} from '@angular/core';
import {Cloudinary} from './cloudinary.service';
import {CloudinaryTransformationDirective} from './cloudinary-transformation.directive';

@Directive({
    selector: '[clBackgroundImage]'
})
export class CloudinaryBackgroundImageDirective implements AfterViewInit {

    @Input() clBackgroundImage: string;

    @ContentChildren(CloudinaryTransformationDirective)
    transformations: QueryList<CloudinaryTransformationDirective>;

    constructor(private renderer: Renderer2, private el: ElementRef, private cloudinary: Cloudinary) {
    }

    ngAfterViewInit() {
      const nativeElement = this.el.nativeElement;
      const options = this.cloudinary.toCloudinaryAttributes(nativeElement.attributes, this.transformations);
      const imageUrl = this.cloudinary.url(this.clBackgroundImage, options);
      this.renderer.setStyle(nativeElement, 'background-image', `url('${imageUrl}')`);
      this.renderer.setStyle(nativeElement, 'background-repeat', 'no-repeat');
      this.renderer.setStyle(nativeElement, 'background-position', 'center');
  }
}
