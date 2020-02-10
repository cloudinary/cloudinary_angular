/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Input, Output, ContentChildren, QueryList, ContentChild, } from '@angular/core';
import { Cloudinary } from './cloudinary.service';
import { CloudinaryTransformationDirective } from './cloudinary-transformation.directive';
import { CloudinaryPlaceHolder } from './cloudinary-placeholder.component';
import { isBrowser } from './cloudinary.service';
var CloudinaryImage = /** @class */ (function () {
    function CloudinaryImage(el, cloudinary) {
        this.el = el;
        this.cloudinary = cloudinary;
        this.onLoad = new EventEmitter();
        this.onError = new EventEmitter();
        this.shouldShowPlaceHolder = true;
    }
    /**
     * @return {?}
     */
    CloudinaryImage.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (isBrowser()) {
            // Create an observer instance
            this.observer = new MutationObserver(function () {
                _this.loadImage();
            });
            /** @type {?} */
            var config = { attributes: true, childList: true };
            // pass in the target node, as well as the observer options
            this.observer.observe(this.el.nativeElement, config);
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    CloudinaryImage.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        // Listen to changes on the data-bound property 'publicId'.
        // Update component unless this is the first value assigned.
        if (changes["publicId"] && !changes["publicId"].isFirstChange()) {
            this.loadImage();
        }
    };
    /**
     * @return {?}
     */
    CloudinaryImage.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.observer && this.observer.disconnect) {
            this.observer.disconnect();
        }
    };
    /**
     * @return {?}
     */
    CloudinaryImage.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.loadImage();
    };
    /**
     * @return {?}
     */
    CloudinaryImage.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        if (this.width && this.placeholderComponent) {
            this.placeholderComponent.setWidth(this.width);
        }
        if (this.height && this.placeholderComponent) {
            this.placeholderComponent.setHeight(this.height);
        }
        if (this.placeholderComponent) {
            this.placeholderComponent.setPublicId(this.publicId);
        }
    };
    /**
     * @return {?}
     */
    CloudinaryImage.prototype.hasLoaded = /**
     * @return {?}
     */
    function () {
        this.shouldShowPlaceHolder = false;
    };
    /**
     * @return {?}
     */
    CloudinaryImage.prototype.loadImage = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // https://github.com/angular/universal#universal-gotchas
        // Fetch the image only for client side rendering by the browser
        if (isBrowser()) {
            if (!this.publicId) {
                throw new Error('You must set the public id of the image to load, e.g. <cl-image public-id={{photo.public_id}}...></cl-image>');
            }
            /** @type {?} */
            var nativeElement = this.el.nativeElement;
            /** @type {?} */
            var image = nativeElement.children[0];
            // Add onload and onerror handlers
            image.onload = function (e) {
                _this.onLoad.emit(e);
            };
            image.onerror = function (e) {
                _this.onError.emit(e);
            };
            /** @type {?} */
            var options = this.cloudinary.toCloudinaryAttributes(nativeElement.attributes, this.transformations);
            if (this.clientHints || (typeof this.clientHints === 'undefined' && this.cloudinary.config().client_hints)) {
                delete options['class'];
                delete options['data-src'];
                delete options['responsive'];
            }
            if (this.placeholderComponent) {
                this.placeholderHandler(options);
            }
            /** @type {?} */
            var imageTag = this.cloudinary.imageTag(this.publicId, options);
            this.setElementAttributes(image, imageTag.attributes());
            if (options.responsive) {
                this.cloudinary.responsive(image, options);
            }
        }
    };
    /**
     * @param {?} element
     * @param {?} attributesLiteral
     * @return {?}
     */
    CloudinaryImage.prototype.setElementAttributes = /**
     * @param {?} element
     * @param {?} attributesLiteral
     * @return {?}
     */
    function (element, attributesLiteral) {
        var _this = this;
        Object.keys(attributesLiteral).forEach(function (attrName) {
            /** @type {?} */
            var attr = attrName === 'src' && _this.loading === 'lazy' ? 'data-src' : attrName;
            element.setAttribute(attr, attributesLiteral[attrName]);
        });
    };
    /**
     * @param {?} options
     * @return {?}
     */
    CloudinaryImage.prototype.placeholderHandler = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        /** @type {?} */
        var placeholderOptions = {};
        Object.keys(options).forEach(function (name) {
            placeholderOptions[name] = (name === 'width' && !options[name].startsWith('auto') || name === 'height') ? Math.floor(parseInt(options[name], 10) * 0.1) : options[name];
        });
        this.placeholderComponent.options = placeholderOptions;
    };
    CloudinaryImage.decorators = [
        { type: Component, args: [{
                    selector: 'cl-image',
                    template: "<img [ngStyle]=\"{opacity: shouldShowPlaceHolder ? '0' : '1', position: shouldShowPlaceHolder ? 'absolute' : 'unset'}\"(load)=\"hasLoaded()\">\n  <div [style.display]=\"shouldShowPlaceHolder ? 'inline' : 'none'\">\n      <ng-content></ng-content>\n  </div>\n  ",
                },] },
    ];
    /** @nocollapse */
    CloudinaryImage.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Cloudinary }
    ]; };
    CloudinaryImage.propDecorators = {
        publicId: [{ type: Input, args: ['public-id',] }],
        clientHints: [{ type: Input, args: ['client-hints',] }],
        loading: [{ type: Input, args: ['loading',] }],
        width: [{ type: Input, args: ['width',] }],
        height: [{ type: Input, args: ['height',] }],
        transformations: [{ type: ContentChildren, args: [CloudinaryTransformationDirective,] }],
        placeholderComponent: [{ type: ContentChild, args: [CloudinaryPlaceHolder,] }],
        onLoad: [{ type: Output }],
        onError: [{ type: Output }]
    };
    return CloudinaryImage;
}());
export { CloudinaryImage };
if (false) {
    /** @type {?} */
    CloudinaryImage.prototype.publicId;
    /** @type {?} */
    CloudinaryImage.prototype.clientHints;
    /** @type {?} */
    CloudinaryImage.prototype.loading;
    /** @type {?} */
    CloudinaryImage.prototype.width;
    /** @type {?} */
    CloudinaryImage.prototype.height;
    /** @type {?} */
    CloudinaryImage.prototype.transformations;
    /** @type {?} */
    CloudinaryImage.prototype.placeholderComponent;
    /** @type {?} */
    CloudinaryImage.prototype.onLoad;
    /** @type {?} */
    CloudinaryImage.prototype.onError;
    /** @type {?} */
    CloudinaryImage.prototype.observer;
    /** @type {?} */
    CloudinaryImage.prototype.shouldShowPlaceHolder;
    /** @type {?} */
    CloudinaryImage.prototype.el;
    /** @type {?} */
    CloudinaryImage.prototype.cloudinary;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWRpbmFyeS1pbWFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xvdWRpbmFyeS9hbmd1bGFyLTUueC8iLCJzb3VyY2VzIjpbImxpYi9jbG91ZGluYXJ5LWltYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBQ04sZUFBZSxFQUNmLFNBQVMsRUFPVCxZQUFZLEdBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzFGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7SUE0Qi9DLHlCQUFvQixFQUFjLEVBQVUsVUFBc0I7UUFBOUMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFVLGVBQVUsR0FBVixVQUFVLENBQVk7c0JBTnhCLElBQUksWUFBWSxFQUFFO3VCQUNqQixJQUFJLFlBQVksRUFBRTtxQ0FHckMsSUFBSTtLQUUwQzs7OztJQUV0RSxrQ0FBUTs7O0lBQVI7UUFBQSxpQkFZQztRQVhDLElBQUksU0FBUyxFQUFFLEVBQUU7O1lBRWYsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGdCQUFnQixDQUFDO2dCQUNuQyxLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDbEIsQ0FBQyxDQUFDOztZQUVILElBQU0sTUFBTSxHQUFHLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7O1lBR3JELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxD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QkFqSUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxVQUFVO29CQUNwQixRQUFRLEVBQUUsc1FBSVQ7aUJBQ0Y7Ozs7Z0JBMUJDLFVBQVU7Z0JBY0gsVUFBVTs7OzJCQWVoQixLQUFLLFNBQUMsV0FBVzs4QkFDakIsS0FBSyxTQUFDLGNBQWM7MEJBQ3BCLEtBQUssU0FBQyxTQUFTO3dCQUNmLEtBQUssU0FBQyxPQUFPO3lCQUNiLEtBQUssU0FBQyxRQUFRO2tDQUVkLGVBQWUsU0FBQyxpQ0FBaUM7dUNBRWpELFlBQVksU0FBQyxxQkFBcUI7eUJBRWxDLE1BQU07MEJBQ04sTUFBTTs7MEJBMUNUOztTQTZCYSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgUXVlcnlMaXN0LFxuICBBZnRlclZpZXdJbml0LFxuICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICBPbkluaXQsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBDb250ZW50Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2xvdWRpbmFyeSB9IGZyb20gJy4vY2xvdWRpbmFyeS5zZXJ2aWNlJztcbmltcG9ydCB7IENsb3VkaW5hcnlUcmFuc2Zvcm1hdGlvbkRpcmVjdGl2ZSB9IGZyb20gJy4vY2xvdWRpbmFyeS10cmFuc2Zvcm1hdGlvbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ2xvdWRpbmFyeVBsYWNlSG9sZGVyIH0gZnJvbSAnLi9jbG91ZGluYXJ5LXBsYWNlaG9sZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBpc0Jyb3dzZXIgfSBmcm9tICcuL2Nsb3VkaW5hcnkuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NsLWltYWdlJyxcbiAgdGVtcGxhdGU6IGA8aW1nIFtuZ1N0eWxlXT1cIntvcGFjaXR5OiBzaG91bGRTaG93UGxhY2VIb2xkZXIgPyAnMCcgOiAnMScsIHBvc2l0aW9uOiBzaG91bGRTaG93UGxhY2VIb2xkZXIgPyAnYWJzb2x1dGUnIDogJ3Vuc2V0J31cIihsb2FkKT1cImhhc0xvYWRlZCgpXCI+XG4gIDxkaXYgW3N0eWxlLmRpc3BsYXldPVwic2hvdWxkU2hvd1BsYWNlSG9sZGVyID8gJ2lubGluZScgOiAnbm9uZSdcIj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIENsb3VkaW5hcnlJbWFnZVxuICBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICBASW5wdXQoJ3B1YmxpYy1pZCcpIHB1YmxpY0lkOiBzdHJpbmc7XG4gIEBJbnB1dCgnY2xpZW50LWhpbnRzJykgY2xpZW50SGludHM/OiBib29sZWFuO1xuICBASW5wdXQoJ2xvYWRpbmcnKSBsb2FkaW5nOiBzdHJpbmc7XG4gIEBJbnB1dCgnd2lkdGgnKSB3aWR0aD86IHN0cmluZztcbiAgQElucHV0KCdoZWlnaHQnKSBoZWlnaHQ/OiBzdHJpbmc7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihDbG91ZGluYXJ5VHJhbnNmb3JtYXRpb25EaXJlY3RpdmUpXG4gIHRyYW5zZm9ybWF0aW9uczogUXVlcnlMaXN0PENsb3VkaW5hcnlUcmFuc2Zvcm1hdGlvbkRpcmVjdGl2ZT47XG4gIEBDb250ZW50Q2hpbGQoQ2xvdWRpbmFyeVBsYWNlSG9sZGVyKSBwbGFjZWhvbGRlckNvbXBvbmVudDogQ2xvdWRpbmFyeVBsYWNlSG9sZGVyO1xuXG4gIEBPdXRwdXQoKSBvbkxvYWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTsgLy8gQ2FsbGJhY2sgd2hlbiBhbiBpbWFnZSBpcyBsb2FkZWQgc3VjY2Vzc2Z1bGx5XG4gIEBPdXRwdXQoKSBvbkVycm9yOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7IC8vIENhbGxiYWNrIHdoZW4gYW4gaW1hZ2UgaXMgbG9hZGVkIHdpdGggZXJyb3JcblxuICBvYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlcjtcbiAgc2hvdWxkU2hvd1BsYWNlSG9sZGVyID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIGNsb3VkaW5hcnk6IENsb3VkaW5hcnkpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKGlzQnJvd3NlcigpKSB7XG4gICAgICAvLyBDcmVhdGUgYW4gb2JzZXJ2ZXIgaW5zdGFuY2VcbiAgICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICAgIHRoaXMubG9hZEltYWdlKCk7XG4gICAgICB9KTtcbiAgICAgIC8vIE9ic2VydmUgY2hhbmdlcyB0byBhdHRyaWJ1dGVzIG9yIGNoaWxkIHRyYW5zZm9ybWF0aW9ucyB0byByZS1yZW5kZXIgdGhlIGltYWdlXG4gICAgICBjb25zdCBjb25maWcgPSB7IGF0dHJpYnV0ZXM6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZSB9O1xuXG4gICAgICAvLyBwYXNzIGluIHRoZSB0YXJnZXQgbm9kZSwgYXMgd2VsbCBhcyB0aGUgb2JzZXJ2ZXIgb3B0aW9uc1xuICAgICAgdGhpcy5vYnNlcnZlci5vYnNlcnZlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgY29uZmlnKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgLy8gTGlzdGVuIHRvIGNoYW5nZXMgb24gdGhlIGRhdGEtYm91bmQgcHJvcGVydHkgJ3B1YmxpY0lkJy5cbiAgICAvLyBVcGRhdGUgY29tcG9uZW50IHVubGVzcyB0aGlzIGlzIHRoZSBmaXJzdCB2YWx1ZSBhc3NpZ25lZC5cbiAgICBpZiAoY2hhbmdlcy5wdWJsaWNJZCAmJiAhY2hhbmdlcy5wdWJsaWNJZC5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMubG9hZEltYWdlKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub2JzZXJ2ZXIgJiYgdGhpcy5vYnNlcnZlci5kaXNjb25uZWN0KSB7XG4gICAgICB0aGlzLm9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5sb2FkSW1hZ2UoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICBpZiAodGhpcy53aWR0aCAmJiB0aGlzLnBsYWNlaG9sZGVyQ29tcG9uZW50KSB7XG4gICAgICB0aGlzLnBsYWNlaG9sZGVyQ29tcG9uZW50LnNldFdpZHRoKHRoaXMud2lkdGgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5oZWlnaHQgJiYgdGhpcy5wbGFjZWhvbGRlckNvbXBvbmVudCkge1xuICAgICAgdGhpcy5wbGFjZWhvbGRlckNvbXBvbmVudC5zZXRIZWlnaHQodGhpcy5oZWlnaHQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wbGFjZWhvbGRlckNvbXBvbmVudCkge1xuICAgICAgdGhpcy5wbGFjZWhvbGRlckNvbXBvbmVudC5zZXRQdWJsaWNJZCh0aGlzLnB1YmxpY0lkKTtcbiAgICB9XG4gIH1cblxuICBoYXNMb2FkZWQoKSB7XG4gICAgdGhpcy5zaG91bGRTaG93UGxhY2VIb2xkZXIgPSBmYWxzZTtcbiAgfVxuXG4gIGxvYWRJbWFnZSgpIHtcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci91bml2ZXJzYWwjdW5pdmVyc2FsLWdvdGNoYXNcbiAgICAvLyBGZXRjaCB0aGUgaW1hZ2Ugb25seSBmb3IgY2xpZW50IHNpZGUgcmVuZGVyaW5nIGJ5IHRoZSBicm93c2VyXG4gICAgaWYgKGlzQnJvd3NlcigpKSB7XG4gICAgICBpZiAoIXRoaXMucHVibGljSWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdZb3UgbXVzdCBzZXQgdGhlIHB1YmxpYyBpZCBvZiB0aGUgaW1hZ2UgdG8gbG9hZCwgZS5nLiA8Y2wtaW1hZ2UgcHVibGljLWlkPXt7cGhvdG8ucHVibGljX2lkfX0uLi4+PC9jbC1pbWFnZT4nXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBjb25zdCBuYXRpdmVFbGVtZW50ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuICAgICAgY29uc3QgaW1hZ2UgPSBuYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdO1xuICAgICAgLy8gQWRkIG9ubG9hZCBhbmQgb25lcnJvciBoYW5kbGVyc1xuICAgICAgaW1hZ2Uub25sb2FkID0gZSA9PiB7XG4gICAgICAgIHRoaXMub25Mb2FkLmVtaXQoZSk7XG4gICAgICB9O1xuICAgICAgaW1hZ2Uub25lcnJvciA9IGUgPT4ge1xuICAgICAgICB0aGlzLm9uRXJyb3IuZW1pdChlKTtcbiAgICAgIH07XG4gICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5jbG91ZGluYXJ5LnRvQ2xvdWRpbmFyeUF0dHJpYnV0ZXMoXG4gICAgICAgIG5hdGl2ZUVsZW1lbnQuYXR0cmlidXRlcyxcbiAgICAgICAgdGhpcy50cmFuc2Zvcm1hdGlvbnNcbiAgICAgICk7XG4gICAgICBpZiAodGhpcy5jbGllbnRIaW50cyB8fCAodHlwZW9mIHRoaXMuY2xpZW50SGludHMgPT09ICd1bmRlZmluZWQnICYmIHRoaXMuY2xvdWRpbmFyeS5jb25maWcoKS5jbGllbnRfaGludHMpKSB7XG4gICAgICAgIGRlbGV0ZSBvcHRpb25zWydjbGFzcyddO1xuICAgICAgICBkZWxldGUgb3B0aW9uc1snZGF0YS1zcmMnXTtcbiAgICAgICAgZGVsZXRlIG9wdGlvbnNbJ3Jlc3BvbnNpdmUnXTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnBsYWNlaG9sZGVyQ29tcG9uZW50KSB7XG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXJIYW5kbGVyKG9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgY29uc3QgaW1hZ2VUYWcgPSB0aGlzLmNsb3VkaW5hcnkuaW1hZ2VUYWcodGhpcy5wdWJsaWNJZCwgb3B0aW9ucyk7XG5cbiAgICAgIHRoaXMuc2V0RWxlbWVudEF0dHJpYnV0ZXMoaW1hZ2UsIGltYWdlVGFnLmF0dHJpYnV0ZXMoKSk7XG4gICAgICBpZiAob3B0aW9ucy5yZXNwb25zaXZlKSB7XG4gICAgICAgIHRoaXMuY2xvdWRpbmFyeS5yZXNwb25zaXZlKGltYWdlLCBvcHRpb25zKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXRFbGVtZW50QXR0cmlidXRlcyhlbGVtZW50LCBhdHRyaWJ1dGVzTGl0ZXJhbCkge1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXNMaXRlcmFsKS5mb3JFYWNoKGF0dHJOYW1lID0+IHtcbiAgICAgIGNvbnN0IGF0dHIgPSBhdHRyTmFtZSA9PT0gJ3NyYycgJiYgdGhpcy5sb2FkaW5nID09PSAnbGF6eScgPyAnZGF0YS1zcmMnIDogYXR0ck5hbWU7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyLCBhdHRyaWJ1dGVzTGl0ZXJhbFthdHRyTmFtZV0pO1xuICAgIH0pO1xuICB9XG5cbiAgcGxhY2Vob2xkZXJIYW5kbGVyKG9wdGlvbnMpIHtcbiAgICBjb25zdCBwbGFjZWhvbGRlck9wdGlvbnMgPSB7fTtcblxuICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICBwbGFjZWhvbGRlck9wdGlvbnNbbmFtZV0gPSAobmFtZSA9PT0gJ3dpZHRoJyAmJiAhb3B0aW9uc1tuYW1lXS5zdGFydHNXaXRoKCdhdXRvJykgfHwgbmFtZSA9PT0gJ2hlaWdodCcpID8gTWF0aC5mbG9vcihwYXJzZUludChvcHRpb25zW25hbWVdLCAxMCkgKiAwLjEpIDogb3B0aW9uc1tuYW1lXTtcbiAgICB9KTtcbiAgICB0aGlzLnBsYWNlaG9sZGVyQ29tcG9uZW50Lm9wdGlvbnMgPSBwbGFjZWhvbGRlck9wdGlvbnM7XG4gIH1cbn1cbiJdfQ==