import {AfterViewInit, Directive, ElementRef} from '@angular/core';
import { isBrowser } from './cloudinary.service';

@Directive({
  selector: 'cl-image[loading=lazy]'
})
export class LazyLoadDirective implements AfterViewInit {

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    if (isBrowser()) {
      if (!this.isNativeLazyLoadSupported() && this.isLazyLoadSupported()) {
        this.lazyLoad();
      } else {
        this.loadImage();
      }
    }
  }

  loadImage() {
    const nativeElement = this.el.nativeElement;
    const image = nativeElement.children[0];
    image.setAttribute('src', image.dataset.src);
  }

  isLazyLoadSupported() {
    return window && 'IntersectionObserver' in window;
  }

  isNativeLazyLoadSupported() {
    return 'loading' in HTMLImageElement.prototype; // check loading property is defined on image or iframe
  }

  lazyLoad() {
    const options = {
      rootMargin: `0px 0px -50% 0px`, // Margin around the root
    };
    const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage();
            observer.unobserve(entry.target);
          }
        }, options);
      });
    observer.observe(this.el.nativeElement);
  }
}
