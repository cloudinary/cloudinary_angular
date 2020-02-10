/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Renderer2, Input, QueryList, ContentChildren } from '@angular/core';
import { Cloudinary } from './cloudinary.service';
import { CloudinaryTransformationDirective } from './cloudinary-transformation.directive';
export class CloudinaryBackgroundImageDirective {
    /**
     * @param {?} renderer
     * @param {?} el
     * @param {?} cloudinary
     */
    constructor(renderer, el, cloudinary) {
        this.renderer = renderer;
        this.el = el;
        this.cloudinary = cloudinary;
    }
    /**
     * @return {?}
     */
    isBrowser() {
        return typeof window !== 'undefined';
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (this.isBrowser()) {
            /** @type {?} */
            const nativeElement = this.el.nativeElement;
            /** @type {?} */
            const options = this.cloudinary.toCloudinaryAttributes(nativeElement.attributes, this.transformations);
            /** @type {?} */
            const imageUrl = this.cloudinary.url(this.clBackgroundImage, options);
            this.renderer.setStyle(nativeElement, 'background-image', `url('${imageUrl}')`);
            this.renderer.setStyle(nativeElement, 'background-repeat', 'no-repeat');
            this.renderer.setStyle(nativeElement, 'background-position', 'center');
        }
    }
}
CloudinaryBackgroundImageDirective.decorators = [
    { type: Directive, args: [{
                selector: '[clBackgroundImage]'
            },] },
];
/** @nocollapse */
CloudinaryBackgroundImageDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: Cloudinary }
];
CloudinaryBackgroundImageDirective.propDecorators = {
    clBackgroundImage: [{ type: Input }],
    transformations: [{ type: ContentChildren, args: [CloudinaryTransformationDirective,] }]
};
if (false) {
    /** @type {?} */
    CloudinaryBackgroundImageDirective.prototype.clBackgroundImage;
    /** @type {?} */
    CloudinaryBackgroundImageDirective.prototype.transformations;
    /** @type {?} */
    CloudinaryBackgroundImageDirective.prototype.renderer;
    /** @type {?} */
    CloudinaryBackgroundImageDirective.prototype.el;
    /** @type {?} */
    CloudinaryBackgroundImageDirective.prototype.cloudinary;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWRpbmFyeS1iYWNrZ3JvdW5kLWltYWdlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbG91ZGluYXJ5L2FuZ3VsYXItNS54LyIsInNvdXJjZXMiOlsibGliL2Nsb3VkaW5hcnktYmFja2dyb3VuZC1pbWFnZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBaUIsS0FBSyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakgsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxpQ0FBaUMsRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBS3hGLE1BQU07Ozs7OztJQU9GLFlBQW9CLFFBQW1CLEVBQVUsRUFBYyxFQUFVLFVBQXNCO1FBQTNFLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtLQUM5Rjs7OztJQUVELFNBQVM7UUFDUCxPQUFPLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQztLQUN0Qzs7OztJQUVELGVBQWU7UUFDYixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRTs7WUFDcEIsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUM7O1lBQzVDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7O1lBQ3ZHLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUN0RSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxRQUFRLElBQUksQ0FBQyxDQUFDO1lBQ2hGLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxtQkFBbUIsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUN4RSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUscUJBQXFCLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDeEU7S0FDSjs7O1lBMUJGLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUscUJBQXFCO2FBQ2xDOzs7O1lBTjhCLFNBQVM7WUFBckIsVUFBVTtZQUNyQixVQUFVOzs7Z0NBUWIsS0FBSzs4QkFFTCxlQUFlLFNBQUMsaUNBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIFJlbmRlcmVyMiwgQWZ0ZXJWaWV3SW5pdCwgSW5wdXQsIFF1ZXJ5TGlzdCwgQ29udGVudENoaWxkcmVufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q2xvdWRpbmFyeX0gZnJvbSAnLi9jbG91ZGluYXJ5LnNlcnZpY2UnO1xuaW1wb3J0IHtDbG91ZGluYXJ5VHJhbnNmb3JtYXRpb25EaXJlY3RpdmV9IGZyb20gJy4vY2xvdWRpbmFyeS10cmFuc2Zvcm1hdGlvbi5kaXJlY3RpdmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1tjbEJhY2tncm91bmRJbWFnZV0nXG59KVxuZXhwb3J0IGNsYXNzIENsb3VkaW5hcnlCYWNrZ3JvdW5kSW1hZ2VEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICAgIEBJbnB1dCgpIGNsQmFja2dyb3VuZEltYWdlOiBzdHJpbmc7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKENsb3VkaW5hcnlUcmFuc2Zvcm1hdGlvbkRpcmVjdGl2ZSlcbiAgICB0cmFuc2Zvcm1hdGlvbnM6IFF1ZXJ5TGlzdDxDbG91ZGluYXJ5VHJhbnNmb3JtYXRpb25EaXJlY3RpdmU+O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIGNsb3VkaW5hcnk6IENsb3VkaW5hcnkpIHtcbiAgICB9XG5cbiAgICBpc0Jyb3dzZXIoKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgaWYgKHRoaXMuaXNCcm93c2VyKCkpIHtcbiAgICAgICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuY2xvdWRpbmFyeS50b0Nsb3VkaW5hcnlBdHRyaWJ1dGVzKG5hdGl2ZUVsZW1lbnQuYXR0cmlidXRlcywgdGhpcy50cmFuc2Zvcm1hdGlvbnMpO1xuICAgICAgICBjb25zdCBpbWFnZVVybCA9IHRoaXMuY2xvdWRpbmFyeS51cmwodGhpcy5jbEJhY2tncm91bmRJbWFnZSwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUobmF0aXZlRWxlbWVudCwgJ2JhY2tncm91bmQtaW1hZ2UnLCBgdXJsKCcke2ltYWdlVXJsfScpYCk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUobmF0aXZlRWxlbWVudCwgJ2JhY2tncm91bmQtcmVwZWF0JywgJ25vLXJlcGVhdCcpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKG5hdGl2ZUVsZW1lbnQsICdiYWNrZ3JvdW5kLXBvc2l0aW9uJywgJ2NlbnRlcicpO1xuICAgICAgfVxuICB9XG59XG4iXX0=