/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Input, Output, ContentChildren, QueryList, ContentChild, } from '@angular/core';
import { Cloudinary } from './cloudinary.service';
import { CloudinaryTransformationDirective } from './cloudinary-transformation.directive';
import { CloudinaryPlaceHolder } from './cloudinary-placeholder.component';
import { isBrowser } from './cloudinary.service';
export class CloudinaryImage {
    /**
     * @param {?} el
     * @param {?} cloudinary
     */
    constructor(el, cloudinary) {
        this.el = el;
        this.cloudinary = cloudinary;
        this.onLoad = new EventEmitter();
        this.onError = new EventEmitter();
        this.shouldShowPlaceHolder = true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (isBrowser()) {
            // Create an observer instance
            this.observer = new MutationObserver(() => {
                this.loadImage();
            });
            /** @type {?} */
            const config = { attributes: true, childList: true };
            // pass in the target node, as well as the observer options
            this.observer.observe(this.el.nativeElement, config);
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        // Listen to changes on the data-bound property 'publicId'.
        // Update component unless this is the first value assigned.
        if (changes["publicId"] && !changes["publicId"].isFirstChange()) {
            this.loadImage();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.observer && this.observer.disconnect) {
            this.observer.disconnect();
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.loadImage();
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        if (this.width && this.placeholderComponent) {
            this.placeholderComponent.setWidth(this.width);
        }
        if (this.height && this.placeholderComponent) {
            this.placeholderComponent.setHeight(this.height);
        }
        if (this.placeholderComponent) {
            this.placeholderComponent.setPublicId(this.publicId);
        }
    }
    /**
     * @return {?}
     */
    hasLoaded() {
        this.shouldShowPlaceHolder = false;
    }
    /**
     * @return {?}
     */
    loadImage() {
        // https://github.com/angular/universal#universal-gotchas
        // Fetch the image only for client side rendering by the browser
        if (isBrowser()) {
            if (!this.publicId) {
                throw new Error('You must set the public id of the image to load, e.g. <cl-image public-id={{photo.public_id}}...></cl-image>');
            }
            /** @type {?} */
            const nativeElement = this.el.nativeElement;
            /** @type {?} */
            const image = nativeElement.children[0];
            // Add onload and onerror handlers
            image.onload = e => {
                this.onLoad.emit(e);
            };
            image.onerror = e => {
                this.onError.emit(e);
            };
            /** @type {?} */
            const options = this.cloudinary.toCloudinaryAttributes(nativeElement.attributes, this.transformations);
            if (this.clientHints || (typeof this.clientHints === 'undefined' && this.cloudinary.config().client_hints)) {
                delete options['class'];
                delete options['data-src'];
                delete options['responsive'];
            }
            if (this.placeholderComponent) {
                this.placeholderHandler(options);
            }
            /** @type {?} */
            const imageTag = this.cloudinary.imageTag(this.publicId, options);
            this.setElementAttributes(image, imageTag.attributes());
            if (options.responsive) {
                this.cloudinary.responsive(image, options);
            }
        }
    }
    /**
     * @param {?} element
     * @param {?} attributesLiteral
     * @return {?}
     */
    setElementAttributes(element, attributesLiteral) {
        Object.keys(attributesLiteral).forEach(attrName => {
            /** @type {?} */
            const attr = attrName === 'src' && this.loading === 'lazy' ? 'data-src' : attrName;
            element.setAttribute(attr, attributesLiteral[attrName]);
        });
    }
    /**
     * @param {?} options
     * @return {?}
     */
    placeholderHandler(options) {
        /** @type {?} */
        const placeholderOptions = {};
        Object.keys(options).forEach(name => {
            placeholderOptions[name] = (name === 'width' && !options[name].startsWith('auto') || name === 'height') ? Math.floor(parseInt(options[name], 10) * 0.1) : options[name];
        });
        this.placeholderComponent.options = placeholderOptions;
    }
}
CloudinaryImage.decorators = [
    { type: Component, args: [{
                selector: 'cl-image',
                template: `<img [ngStyle]="{opacity: shouldShowPlaceHolder ? '0' : '1', position: shouldShowPlaceHolder ? 'absolute' : 'unset'}"(load)="hasLoaded()">
  <div [style.display]="shouldShowPlaceHolder ? 'inline' : 'none'">
      <ng-content></ng-content>
  </div>
  `,
            },] },
];
/** @nocollapse */
CloudinaryImage.ctorParameters = () => [
    { type: ElementRef },
    { type: Cloudinary }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWRpbmFyeS1pbWFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xvdWRpbmFyeS9hbmd1bGFyLTUueC8iLCJzb3VyY2VzIjpbImxpYi9jbG91ZGluYXJ5LWltYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBQ04sZUFBZSxFQUNmLFNBQVMsRUFPVCxZQUFZLEdBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzFGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQVVqRCxNQUFNOzs7OztJQWtCSixZQUFvQixFQUFjLEVBQVUsVUFBc0I7UUFBOUMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFVLGVBQVUsR0FBVixVQUFVLENBQVk7c0JBTnhCLElBQUksWUFBWSxFQUFFO3VCQUNqQixJQUFJLFlBQVksRUFBRTtxQ0FHckMsSUFBSTtLQUUwQzs7OztJQUV0RSxRQUFRO1FBQ04sSUFBSSxTQUFTLEVBQUUsRUFBRTs7WUFFZixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksZ0JBQWdCLENBQUMsR0FBRyxFQUFFO2dCQUN4QyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDbEIsQ0FBQyxDQUFDOztZQUVILE1BQU0sTUFBTSxHQUFHLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7O1lBR3JELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FB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OztZQTFCQyxVQUFVO1lBY0gsVUFBVTs7O3VCQWVoQixLQUFLLFNBQUMsV0FBVzswQkFDakIsS0FBSyxTQUFDLGNBQWM7c0JBQ3BCLEtBQUssU0FBQyxTQUFTO29CQUNmLEtBQUssU0FBQyxPQUFPO3FCQUNiLEtBQUssU0FBQyxRQUFROzhCQUVkLGVBQWUsU0FBQyxpQ0FBaUM7bUNBRWpELFlBQVksU0FBQyxxQkFBcUI7cUJBRWxDLE1BQU07c0JBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIFF1ZXJ5TGlzdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgT25Jbml0LFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgQ29udGVudENoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENsb3VkaW5hcnkgfSBmcm9tICcuL2Nsb3VkaW5hcnkuc2VydmljZSc7XG5pbXBvcnQgeyBDbG91ZGluYXJ5VHJhbnNmb3JtYXRpb25EaXJlY3RpdmUgfSBmcm9tICcuL2Nsb3VkaW5hcnktdHJhbnNmb3JtYXRpb24uZGlyZWN0aXZlJztcbmltcG9ydCB7IENsb3VkaW5hcnlQbGFjZUhvbGRlciB9IGZyb20gJy4vY2xvdWRpbmFyeS1wbGFjZWhvbGRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgaXNCcm93c2VyIH0gZnJvbSAnLi9jbG91ZGluYXJ5LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbC1pbWFnZScsXG4gIHRlbXBsYXRlOiBgPGltZyBbbmdTdHlsZV09XCJ7b3BhY2l0eTogc2hvdWxkU2hvd1BsYWNlSG9sZGVyID8gJzAnIDogJzEnLCBwb3NpdGlvbjogc2hvdWxkU2hvd1BsYWNlSG9sZGVyID8gJ2Fic29sdXRlJyA6ICd1bnNldCd9XCIobG9hZCk9XCJoYXNMb2FkZWQoKVwiPlxuICA8ZGl2IFtzdHlsZS5kaXNwbGF5XT1cInNob3VsZFNob3dQbGFjZUhvbGRlciA/ICdpbmxpbmUnIDogJ25vbmUnXCI+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBDbG91ZGluYXJ5SW1hZ2VcbiAgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkluaXQsIEFmdGVyVmlld0luaXQsIEFmdGVyQ29udGVudENoZWNrZWQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgQElucHV0KCdwdWJsaWMtaWQnKSBwdWJsaWNJZDogc3RyaW5nO1xuICBASW5wdXQoJ2NsaWVudC1oaW50cycpIGNsaWVudEhpbnRzPzogYm9vbGVhbjtcbiAgQElucHV0KCdsb2FkaW5nJykgbG9hZGluZzogc3RyaW5nO1xuICBASW5wdXQoJ3dpZHRoJykgd2lkdGg/OiBzdHJpbmc7XG4gIEBJbnB1dCgnaGVpZ2h0JykgaGVpZ2h0Pzogc3RyaW5nO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oQ2xvdWRpbmFyeVRyYW5zZm9ybWF0aW9uRGlyZWN0aXZlKVxuICB0cmFuc2Zvcm1hdGlvbnM6IFF1ZXJ5TGlzdDxDbG91ZGluYXJ5VHJhbnNmb3JtYXRpb25EaXJlY3RpdmU+O1xuICBAQ29udGVudENoaWxkKENsb3VkaW5hcnlQbGFjZUhvbGRlcikgcGxhY2Vob2xkZXJDb21wb25lbnQ6IENsb3VkaW5hcnlQbGFjZUhvbGRlcjtcblxuICBAT3V0cHV0KCkgb25Mb2FkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7IC8vIENhbGxiYWNrIHdoZW4gYW4gaW1hZ2UgaXMgbG9hZGVkIHN1Y2Nlc3NmdWxseVxuICBAT3V0cHV0KCkgb25FcnJvcjogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpOyAvLyBDYWxsYmFjayB3aGVuIGFuIGltYWdlIGlzIGxvYWRlZCB3aXRoIGVycm9yXG5cbiAgb2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXI7XG4gIHNob3VsZFNob3dQbGFjZUhvbGRlciA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBjbG91ZGluYXJ5OiBDbG91ZGluYXJ5KSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmIChpc0Jyb3dzZXIoKSkge1xuICAgICAgLy8gQ3JlYXRlIGFuIG9ic2VydmVyIGluc3RhbmNlXG4gICAgICB0aGlzLm9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICB0aGlzLmxvYWRJbWFnZSgpO1xuICAgICAgfSk7XG4gICAgICAvLyBPYnNlcnZlIGNoYW5nZXMgdG8gYXR0cmlidXRlcyBvciBjaGlsZCB0cmFuc2Zvcm1hdGlvbnMgdG8gcmUtcmVuZGVyIHRoZSBpbWFnZVxuICAgICAgY29uc3QgY29uZmlnID0geyBhdHRyaWJ1dGVzOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUgfTtcblxuICAgICAgLy8gcGFzcyBpbiB0aGUgdGFyZ2V0IG5vZGUsIGFzIHdlbGwgYXMgdGhlIG9ic2VydmVyIG9wdGlvbnNcbiAgICAgIHRoaXMub2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIGNvbmZpZyk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIC8vIExpc3RlbiB0byBjaGFuZ2VzIG9uIHRoZSBkYXRhLWJvdW5kIHByb3BlcnR5ICdwdWJsaWNJZCcuXG4gICAgLy8gVXBkYXRlIGNvbXBvbmVudCB1bmxlc3MgdGhpcyBpcyB0aGUgZmlyc3QgdmFsdWUgYXNzaWduZWQuXG4gICAgaWYgKGNoYW5nZXMucHVibGljSWQgJiYgIWNoYW5nZXMucHVibGljSWQuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLmxvYWRJbWFnZSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9ic2VydmVyICYmIHRoaXMub2JzZXJ2ZXIuZGlzY29ubmVjdCkge1xuICAgICAgdGhpcy5vYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMubG9hZEltYWdlKCk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgaWYgKHRoaXMud2lkdGggJiYgdGhpcy5wbGFjZWhvbGRlckNvbXBvbmVudCkge1xuICAgICAgdGhpcy5wbGFjZWhvbGRlckNvbXBvbmVudC5zZXRXaWR0aCh0aGlzLndpZHRoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaGVpZ2h0ICYmIHRoaXMucGxhY2Vob2xkZXJDb21wb25lbnQpIHtcbiAgICAgIHRoaXMucGxhY2Vob2xkZXJDb21wb25lbnQuc2V0SGVpZ2h0KHRoaXMuaGVpZ2h0KTtcbiAgICB9XG4gICAgaWYgKHRoaXMucGxhY2Vob2xkZXJDb21wb25lbnQpIHtcbiAgICAgIHRoaXMucGxhY2Vob2xkZXJDb21wb25lbnQuc2V0UHVibGljSWQodGhpcy5wdWJsaWNJZCk7XG4gICAgfVxuICB9XG5cbiAgaGFzTG9hZGVkKCkge1xuICAgIHRoaXMuc2hvdWxkU2hvd1BsYWNlSG9sZGVyID0gZmFsc2U7XG4gIH1cblxuICBsb2FkSW1hZ2UoKSB7XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvdW5pdmVyc2FsI3VuaXZlcnNhbC1nb3RjaGFzXG4gICAgLy8gRmV0Y2ggdGhlIGltYWdlIG9ubHkgZm9yIGNsaWVudCBzaWRlIHJlbmRlcmluZyBieSB0aGUgYnJvd3NlclxuICAgIGlmIChpc0Jyb3dzZXIoKSkge1xuICAgICAgaWYgKCF0aGlzLnB1YmxpY0lkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnWW91IG11c3Qgc2V0IHRoZSBwdWJsaWMgaWQgb2YgdGhlIGltYWdlIHRvIGxvYWQsIGUuZy4gPGNsLWltYWdlIHB1YmxpYy1pZD17e3Bob3RvLnB1YmxpY19pZH19Li4uPjwvY2wtaW1hZ2U+J1xuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcbiAgICAgIGNvbnN0IGltYWdlID0gbmF0aXZlRWxlbWVudC5jaGlsZHJlblswXTtcbiAgICAgIC8vIEFkZCBvbmxvYWQgYW5kIG9uZXJyb3IgaGFuZGxlcnNcbiAgICAgIGltYWdlLm9ubG9hZCA9IGUgPT4ge1xuICAgICAgICB0aGlzLm9uTG9hZC5lbWl0KGUpO1xuICAgICAgfTtcbiAgICAgIGltYWdlLm9uZXJyb3IgPSBlID0+IHtcbiAgICAgICAgdGhpcy5vbkVycm9yLmVtaXQoZSk7XG4gICAgICB9O1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuY2xvdWRpbmFyeS50b0Nsb3VkaW5hcnlBdHRyaWJ1dGVzKFxuICAgICAgICBuYXRpdmVFbGVtZW50LmF0dHJpYnV0ZXMsXG4gICAgICAgIHRoaXMudHJhbnNmb3JtYXRpb25zXG4gICAgICApO1xuICAgICAgaWYgKHRoaXMuY2xpZW50SGludHMgfHwgKHR5cGVvZiB0aGlzLmNsaWVudEhpbnRzID09PSAndW5kZWZpbmVkJyAmJiB0aGlzLmNsb3VkaW5hcnkuY29uZmlnKCkuY2xpZW50X2hpbnRzKSkge1xuICAgICAgICBkZWxldGUgb3B0aW9uc1snY2xhc3MnXTtcbiAgICAgICAgZGVsZXRlIG9wdGlvbnNbJ2RhdGEtc3JjJ107XG4gICAgICAgIGRlbGV0ZSBvcHRpb25zWydyZXNwb25zaXZlJ107XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5wbGFjZWhvbGRlckNvbXBvbmVudCkge1xuICAgICAgICB0aGlzLnBsYWNlaG9sZGVySGFuZGxlcihvcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGltYWdlVGFnID0gdGhpcy5jbG91ZGluYXJ5LmltYWdlVGFnKHRoaXMucHVibGljSWQsIG9wdGlvbnMpO1xuXG4gICAgICB0aGlzLnNldEVsZW1lbnRBdHRyaWJ1dGVzKGltYWdlLCBpbWFnZVRhZy5hdHRyaWJ1dGVzKCkpO1xuICAgICAgaWYgKG9wdGlvbnMucmVzcG9uc2l2ZSkge1xuICAgICAgICB0aGlzLmNsb3VkaW5hcnkucmVzcG9uc2l2ZShpbWFnZSwgb3B0aW9ucyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0RWxlbWVudEF0dHJpYnV0ZXMoZWxlbWVudCwgYXR0cmlidXRlc0xpdGVyYWwpIHtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzTGl0ZXJhbCkuZm9yRWFjaChhdHRyTmFtZSA9PiB7XG4gICAgICBjb25zdCBhdHRyID0gYXR0ck5hbWUgPT09ICdzcmMnICYmIHRoaXMubG9hZGluZyA9PT0gJ2xhenknID8gJ2RhdGEtc3JjJyA6IGF0dHJOYW1lO1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0ciwgYXR0cmlidXRlc0xpdGVyYWxbYXR0ck5hbWVdKTtcbiAgICB9KTtcbiAgfVxuXG4gIHBsYWNlaG9sZGVySGFuZGxlcihvcHRpb25zKSB7XG4gICAgY29uc3QgcGxhY2Vob2xkZXJPcHRpb25zID0ge307XG5cbiAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgcGxhY2Vob2xkZXJPcHRpb25zW25hbWVdID0gKG5hbWUgPT09ICd3aWR0aCcgJiYgIW9wdGlvbnNbbmFtZV0uc3RhcnRzV2l0aCgnYXV0bycpIHx8IG5hbWUgPT09ICdoZWlnaHQnKSA/IE1hdGguZmxvb3IocGFyc2VJbnQob3B0aW9uc1tuYW1lXSwgMTApICogMC4xKSA6IG9wdGlvbnNbbmFtZV07XG4gICAgfSk7XG4gICAgdGhpcy5wbGFjZWhvbGRlckNvbXBvbmVudC5vcHRpb25zID0gcGxhY2Vob2xkZXJPcHRpb25zO1xuICB9XG59XG4iXX0=