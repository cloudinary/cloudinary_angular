import {
  AfterViewInit,
  Directive,
  ElementRef,
  NgZone,
  OnDestroy,
} from '@angular/core';

import { isBrowser } from './cloudinary.service';

// Check loading property is defined on image or iframe.
const isNativeLazyLoadSupported =
  isBrowser && 'loading' in HTMLImageElement.prototype;
const isIntersectionObserverSupported =
  isBrowser && 'IntersectionObserver' in window;

@Directive({
  selector: 'cl-image[loading=lazy]',
})
export class LazyLoadDirective implements AfterViewInit, OnDestroy {
  private observer: IntersectionObserver | null = null;

  constructor(private el: ElementRef, private ngZone: NgZone) {}

  ngAfterViewInit() {
    if (isBrowser()) {
      if (!isNativeLazyLoadSupported && isIntersectionObserverSupported) {
        this.lazyLoadThroughIntersectionObserver();
      } else {
        this.loadImage();
      }
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  loadImage() {
    const nativeElement = this.el.nativeElement;
    const image = nativeElement.children[0];
    image.setAttribute('src', image.dataset.src);
  }

  lazyLoadThroughIntersectionObserver() {
    const options = {
      rootMargin: `0px 0px -50% 0px`, // Margin around the root
    };
    // Caretaker note: the `IntersectionObserver` is patched by zone.js in the latest versions,
    // which means it triggers change detection when `IntersectionObserver` tasks are invoked.
    // We only set the `src` property within the task, so we don't require Angular running `tick()`.
    this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.loadImage();
            this.observer.unobserve(entry.target);
          }
        }, options);
      });
      this.observer.observe(this.el.nativeElement);
    });
  }
}
