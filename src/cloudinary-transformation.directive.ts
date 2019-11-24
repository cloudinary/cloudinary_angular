import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'cl-transformation'
})
export class CloudinaryTransformationDirective {

  constructor(private el: ElementRef) {
  }

  getAttributes(): NamedNodeMap {
    return this.el.nativeElement.attributes;
  }
}

