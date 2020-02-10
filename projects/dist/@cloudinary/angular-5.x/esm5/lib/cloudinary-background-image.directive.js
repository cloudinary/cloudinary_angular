/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Renderer2, Input, QueryList, ContentChildren } from '@angular/core';
import { Cloudinary } from './cloudinary.service';
import { CloudinaryTransformationDirective } from './cloudinary-transformation.directive';
var CloudinaryBackgroundImageDirective = /** @class */ (function () {
    function CloudinaryBackgroundImageDirective(renderer, el, cloudinary) {
        this.renderer = renderer;
        this.el = el;
        this.cloudinary = cloudinary;
    }
    /**
     * @return {?}
     */
    CloudinaryBackgroundImageDirective.prototype.isBrowser = /**
     * @return {?}
     */
    function () {
        return typeof window !== 'undefined';
    };
    /**
     * @return {?}
     */
    CloudinaryBackgroundImageDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        if (this.isBrowser()) {
            /** @type {?} */
            var nativeElement = this.el.nativeElement;
            /** @type {?} */
            var options = this.cloudinary.toCloudinaryAttributes(nativeElement.attributes, this.transformations);
            /** @type {?} */
            var imageUrl = this.cloudinary.url(this.clBackgroundImage, options);
            this.renderer.setStyle(nativeElement, 'background-image', "url('" + imageUrl + "')");
            this.renderer.setStyle(nativeElement, 'background-repeat', 'no-repeat');
            this.renderer.setStyle(nativeElement, 'background-position', 'center');
        }
    };
    CloudinaryBackgroundImageDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[clBackgroundImage]'
                },] },
    ];
    /** @nocollapse */
    CloudinaryBackgroundImageDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: Cloudinary }
    ]; };
    CloudinaryBackgroundImageDirective.propDecorators = {
        clBackgroundImage: [{ type: Input }],
        transformations: [{ type: ContentChildren, args: [CloudinaryTransformationDirective,] }]
    };
    return CloudinaryBackgroundImageDirective;
}());
export { CloudinaryBackgroundImageDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWRpbmFyeS1iYWNrZ3JvdW5kLWltYWdlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbG91ZGluYXJ5L2FuZ3VsYXItNS54LyIsInNvdXJjZXMiOlsibGliL2Nsb3VkaW5hcnktYmFja2dyb3VuZC1pbWFnZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBaUIsS0FBSyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakgsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxpQ0FBaUMsRUFBQyxNQUFNLHVDQUF1QyxDQUFDOztJQVlwRiw0Q0FBb0IsUUFBbUIsRUFBVSxFQUFjLEVBQVUsVUFBc0I7UUFBM0UsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFVLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO0tBQzlGOzs7O0lBRUQsc0RBQVM7OztJQUFUO1FBQ0UsT0FBTyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUM7S0FDdEM7Ozs7SUFFRCw0REFBZTs7O0lBQWY7UUFDRSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRTs7WUFDcEIsSUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUM7O1lBQzVDLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7O1lBQ3ZHLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUN0RSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsVUFBUSxRQUFRLE9BQUksQ0FBQyxDQUFDO1lBQ2hGLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxtQkFBbUIsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUN4RSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUscUJBQXFCLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDeEU7S0FDSjs7Z0JBMUJGLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUscUJBQXFCO2lCQUNsQzs7OztnQkFOOEIsU0FBUztnQkFBckIsVUFBVTtnQkFDckIsVUFBVTs7O29DQVFiLEtBQUs7a0NBRUwsZUFBZSxTQUFDLGlDQUFpQzs7NkNBWHREOztTQU9hLGtDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBSZW5kZXJlcjIsIEFmdGVyVmlld0luaXQsIElucHV0LCBRdWVyeUxpc3QsIENvbnRlbnRDaGlsZHJlbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Nsb3VkaW5hcnl9IGZyb20gJy4vY2xvdWRpbmFyeS5zZXJ2aWNlJztcbmltcG9ydCB7Q2xvdWRpbmFyeVRyYW5zZm9ybWF0aW9uRGlyZWN0aXZlfSBmcm9tICcuL2Nsb3VkaW5hcnktdHJhbnNmb3JtYXRpb24uZGlyZWN0aXZlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbY2xCYWNrZ3JvdW5kSW1hZ2VdJ1xufSlcbmV4cG9ydCBjbGFzcyBDbG91ZGluYXJ5QmFja2dyb3VuZEltYWdlRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICBASW5wdXQoKSBjbEJhY2tncm91bmRJbWFnZTogc3RyaW5nO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihDbG91ZGluYXJ5VHJhbnNmb3JtYXRpb25EaXJlY3RpdmUpXG4gICAgdHJhbnNmb3JtYXRpb25zOiBRdWVyeUxpc3Q8Q2xvdWRpbmFyeVRyYW5zZm9ybWF0aW9uRGlyZWN0aXZlPjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBjbG91ZGluYXJ5OiBDbG91ZGluYXJ5KSB7XG4gICAgfVxuXG4gICAgaXNCcm93c2VyKCk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgIGlmICh0aGlzLmlzQnJvd3NlcigpKSB7XG4gICAgICAgIGNvbnN0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmNsb3VkaW5hcnkudG9DbG91ZGluYXJ5QXR0cmlidXRlcyhuYXRpdmVFbGVtZW50LmF0dHJpYnV0ZXMsIHRoaXMudHJhbnNmb3JtYXRpb25zKTtcbiAgICAgICAgY29uc3QgaW1hZ2VVcmwgPSB0aGlzLmNsb3VkaW5hcnkudXJsKHRoaXMuY2xCYWNrZ3JvdW5kSW1hZ2UsIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKG5hdGl2ZUVsZW1lbnQsICdiYWNrZ3JvdW5kLWltYWdlJywgYHVybCgnJHtpbWFnZVVybH0nKWApO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKG5hdGl2ZUVsZW1lbnQsICdiYWNrZ3JvdW5kLXJlcGVhdCcsICduby1yZXBlYXQnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShuYXRpdmVFbGVtZW50LCAnYmFja2dyb3VuZC1wb3NpdGlvbicsICdjZW50ZXInKTtcbiAgICAgIH1cbiAgfVxufVxuIl19