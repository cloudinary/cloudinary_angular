/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ElementRef } from '@angular/core';
export class LazyLoadDirective {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (!this.isNativeLazyLoadSupported() && this.isLazyLoadSupported()) {
            this.lazyLoad();
        }
        else {
            this.loadImage();
        }
    }
    /**
     * @return {?}
     */
    loadImage() {
        /** @type {?} */
        const nativeElement = this.el.nativeElement;
        /** @type {?} */
        const image = nativeElement.children[0];
        image.setAttribute('src', image.dataset.src);
    }
    /**
     * @return {?}
     */
    isLazyLoadSupported() {
        return window && 'IntersectionObserver' in window;
    }
    /**
     * @return {?}
     */
    isNativeLazyLoadSupported() {
        return 'loading' in HTMLImageElement.prototype; // check loading property is defined on image or iframe
    }
    /**
     * @return {?}
     */
    lazyLoad() {
        /** @type {?} */
        const options = {
            rootMargin: `0px 0px -50% 0px`,
        };
        /** @type {?} */
        const observer = new IntersectionObserver((entries) => {
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
LazyLoadDirective.decorators = [
    { type: Directive, args: [{
                selector: 'cl-image[loading=lazy]'
            },] },
];
/** @nocollapse */
LazyLoadDirective.ctorParameters = () => [
    { type: ElementRef }
];
if (false) {
    /** @type {?} */
    LazyLoadDirective.prototype.el;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWRpbmFyeS1sYXp5LWxvYWQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsb3VkaW5hcnkvYW5ndWxhci01LngvIiwic291cmNlcyI6WyJsaWIvY2xvdWRpbmFyeS1sYXp5LWxvYWQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWdCLFNBQVMsRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFNbkUsTUFBTTs7OztJQUVKLFlBQW9CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO0tBQUk7Ozs7SUFFdEMsZUFBZTtRQUNYLElBQUksQ0FBQyxJQUFJLENBQUMseUJBQXlCLEVBQUUsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBRTtZQUNuRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDakI7YUFBTTtZQUNMLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNsQjtLQUNKOzs7O0lBRUQsU0FBUzs7UUFDUCxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQzs7UUFDNUMsTUFBTSxLQUFLLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzlDOzs7O0lBRUQsbUJBQW1CO1FBQ2pCLE9BQU8sTUFBTSxJQUFJLHNCQUFzQixJQUFJLE1BQU0sQ0FBQztLQUNuRDs7OztJQUVELHlCQUF5QjtRQUN2QixPQUFPLFNBQVMsSUFBSSxnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7S0FDaEQ7Ozs7SUFFRCxRQUFROztRQUNOLE1BQU0sT0FBTyxHQUFHO1lBQ2QsVUFBVSxFQUFFLGtCQUFrQjtTQUMvQixDQUFDOztRQUNGLE1BQU0sUUFBUSxHQUFHLElBQUksb0JBQW9CLENBQ3pDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDVixPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNwQixJQUFJLEtBQUssQ0FBQyxjQUFjLEVBQUU7b0JBQ3hCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFDakIsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ2xDO2FBQ0YsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNiLENBQUMsQ0FBQztRQUNMLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQztLQUN6Qzs7O1lBM0NGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2FBQ25DOzs7O1lBTGlDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FmdGVyVmlld0luaXQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnY2wtaW1hZ2VbbG9hZGluZz1sYXp5XSdcbn0pXG5leHBvcnQgY2xhc3MgTGF6eUxvYWREaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgIGlmICghdGhpcy5pc05hdGl2ZUxhenlMb2FkU3VwcG9ydGVkKCkgJiYgdGhpcy5pc0xhenlMb2FkU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgdGhpcy5sYXp5TG9hZCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sb2FkSW1hZ2UoKTtcbiAgICAgIH1cbiAgfVxuXG4gIGxvYWRJbWFnZSgpIHtcbiAgICBjb25zdCBuYXRpdmVFbGVtZW50ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IGltYWdlID0gbmF0aXZlRWxlbWVudC5jaGlsZHJlblswXTtcbiAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGltYWdlLmRhdGFzZXQuc3JjKTtcbiAgfVxuXG4gIGlzTGF6eUxvYWRTdXBwb3J0ZWQoKSB7XG4gICAgcmV0dXJuIHdpbmRvdyAmJiAnSW50ZXJzZWN0aW9uT2JzZXJ2ZXInIGluIHdpbmRvdztcbiAgfVxuXG4gIGlzTmF0aXZlTGF6eUxvYWRTdXBwb3J0ZWQoKSB7XG4gICAgcmV0dXJuICdsb2FkaW5nJyBpbiBIVE1MSW1hZ2VFbGVtZW50LnByb3RvdHlwZTsgLy8gY2hlY2sgbG9hZGluZyBwcm9wZXJ0eSBpcyBkZWZpbmVkIG9uIGltYWdlIG9yIGlmcmFtZVxuICB9XG5cbiAgbGF6eUxvYWQoKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIHJvb3RNYXJnaW46IGAwcHggMHB4IC01MCUgMHB4YCwgLy8gTWFyZ2luIGFyb3VuZCB0aGUgcm9vdFxuICAgIH07XG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoXG4gICAgKGVudHJpZXMpID0+IHtcbiAgICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRJbWFnZSgpO1xuICAgICAgICAgICAgb2JzZXJ2ZXIudW5vYnNlcnZlKGVudHJ5LnRhcmdldCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICAgIH0pO1xuICAgIG9ic2VydmVyLm9ic2VydmUodGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgfVxufVxuIl19