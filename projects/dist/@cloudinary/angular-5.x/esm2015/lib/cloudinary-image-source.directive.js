/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input, QueryList, ContentChildren } from '@angular/core';
import { Cloudinary } from './cloudinary.service';
import { CloudinaryTransformationDirective } from './cloudinary-transformation.directive';
import { isBrowser } from './cloudinary.service';
export class CloudinaryImageSourceDirective {
    /**
     * @param {?} el
     * @param {?} cloudinary
     */
    constructor(el, cloudinary) {
        this.el = el;
        this.cloudinary = cloudinary;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (isBrowser()) {
            /** @type {?} */
            let attrName;
            /** @type {?} */
            let propertyValue;
            if (this.clHref) {
                attrName = 'href';
                propertyValue = this.clHref;
            }
            else if (this.clSrc) {
                attrName = 'src';
                propertyValue = this.clSrc;
            }
            else if (this.clSrcset) {
                attrName = 'srcset';
                propertyValue = this.clSrcset;
            }
            /** @type {?} */
            let isSvg = false;
            if (this.clHref &&
                toString.call(this.el.nativeElement['href'] === '[object SVGAnimatedString]')) {
                this.el.nativeElement.setAttribute('xlinkHref', 'xlink:href');
                isSvg = true;
            }
            if (!attrName || !propertyValue) {
                throw new Error('Directive value is missing for clHref/clSrc/clSrcset');
            }
            /** @type {?} */
            const nativeElement = this.el.nativeElement;
            /** @type {?} */
            const options = this.cloudinary.toCloudinaryAttributes(nativeElement.attributes, this.transformations);
            /** @type {?} */
            const attrValue = this.cloudinary.url(propertyValue, options);
            this.el.nativeElement.setAttribute(attrName, attrValue);
            /** @type {?} */
            const msie = this.el.nativeElement.ownerDocument.documentMode;
            if (msie && !isSvg) {
                // IE logic here
                this.el.nativeElement[attrName] = attrValue;
            }
        }
    }
    ;
}
CloudinaryImageSourceDirective.decorators = [
    { type: Directive, args: [{
                selector: '[clHref], [clSrc], [clSrcset]'
            },] },
];
/** @nocollapse */
CloudinaryImageSourceDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Cloudinary }
];
CloudinaryImageSourceDirective.propDecorators = {
    clHref: [{ type: Input }],
    clSrc: [{ type: Input }],
    clSrcset: [{ type: Input }],
    transformations: [{ type: ContentChildren, args: [CloudinaryTransformationDirective,] }]
};
if (false) {
    /** @type {?} */
    CloudinaryImageSourceDirective.prototype.clHref;
    /** @type {?} */
    CloudinaryImageSourceDirective.prototype.clSrc;
    /** @type {?} */
    CloudinaryImageSourceDirective.prototype.clSrcset;
    /** @type {?} */
    CloudinaryImageSourceDirective.prototype.transformations;
    /** @type {?} */
    CloudinaryImageSourceDirective.prototype.el;
    /** @type {?} */
    CloudinaryImageSourceDirective.prototype.cloudinary;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWRpbmFyeS1pbWFnZS1zb3VyY2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsb3VkaW5hcnkvYW5ndWxhci01LngvIiwic291cmNlcyI6WyJsaWIvY2xvdWRpbmFyeS1pbWFnZS1zb3VyY2UuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBaUIsS0FBSyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxpQ0FBaUMsRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUtqRCxNQUFNOzs7OztJQVNGLFlBQW9CLEVBQWMsRUFBVSxVQUFzQjtRQUE5QyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtLQUNqRTs7OztJQUVELGVBQWU7UUFDYixJQUFJLFNBQVMsRUFBRSxFQUFFOztZQUNmLElBQUksUUFBUSxDQUFTOztZQUNyQixJQUFJLGFBQWEsQ0FBUztZQUMxQixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2IsUUFBUSxHQUFHLE1BQU0sQ0FBQztnQkFDbEIsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDL0I7aUJBQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNuQixRQUFRLEdBQUcsS0FBSyxDQUFDO2dCQUNqQixhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQzthQUM5QjtpQkFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ3RCLFFBQVEsR0FBRyxRQUFRLENBQUM7Z0JBQ3BCLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ2pDOztZQUVELElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztZQUVsQixJQUFJLElBQUksQ0FBQyxNQUFNO2dCQUNYLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssNEJBQTRCLENBQUMsRUFBRTtnQkFDL0UsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDOUQsS0FBSyxHQUFHLElBQUksQ0FBQzthQUNoQjtZQUVELElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsc0RBQXNELENBQUMsQ0FBQzthQUMzRTs7WUFFRCxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQzs7WUFDNUMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzs7WUFFdkcsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzlELElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7O1lBVXhELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7WUFDOUQsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7O2dCQUVoQixJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsR0FBRyxTQUFTLENBQUM7YUFDL0M7U0FDRjtLQUNGO0lBQUEsQ0FBQzs7O1lBOURMLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsK0JBQStCO2FBQzVDOzs7O1lBUGtCLFVBQVU7WUFDckIsVUFBVTs7O3FCQVNiLEtBQUs7b0JBQ0wsS0FBSzt1QkFDTCxLQUFLOzhCQUVMLGVBQWUsU0FBQyxpQ0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgQWZ0ZXJWaWV3SW5pdCwgSW5wdXQsIFF1ZXJ5TGlzdCwgQ29udGVudENoaWxkcmVufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q2xvdWRpbmFyeX0gZnJvbSAnLi9jbG91ZGluYXJ5LnNlcnZpY2UnO1xuaW1wb3J0IHtDbG91ZGluYXJ5VHJhbnNmb3JtYXRpb25EaXJlY3RpdmV9IGZyb20gJy4vY2xvdWRpbmFyeS10cmFuc2Zvcm1hdGlvbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgaXNCcm93c2VyIH0gZnJvbSAnLi9jbG91ZGluYXJ5LnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1tjbEhyZWZdLCBbY2xTcmNdLCBbY2xTcmNzZXRdJ1xufSlcbmV4cG9ydCBjbGFzcyBDbG91ZGluYXJ5SW1hZ2VTb3VyY2VEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICAgIEBJbnB1dCgpIGNsSHJlZjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGNsU3JjOiBzdHJpbmc7XG4gICAgQElucHV0KCkgY2xTcmNzZXQ6IHN0cmluZztcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oQ2xvdWRpbmFyeVRyYW5zZm9ybWF0aW9uRGlyZWN0aXZlKVxuICAgIHRyYW5zZm9ybWF0aW9uczogUXVlcnlMaXN0PENsb3VkaW5hcnlUcmFuc2Zvcm1hdGlvbkRpcmVjdGl2ZT47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIGNsb3VkaW5hcnk6IENsb3VkaW5hcnkpIHtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICBpZiAoaXNCcm93c2VyKCkpIHtcbiAgICAgICAgbGV0IGF0dHJOYW1lOiBzdHJpbmc7XG4gICAgICAgIGxldCBwcm9wZXJ0eVZhbHVlOiBzdHJpbmc7XG4gICAgICAgIGlmICh0aGlzLmNsSHJlZikge1xuICAgICAgICAgICAgYXR0ck5hbWUgPSAnaHJlZic7XG4gICAgICAgICAgICBwcm9wZXJ0eVZhbHVlID0gdGhpcy5jbEhyZWY7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jbFNyYykge1xuICAgICAgICAgICAgYXR0ck5hbWUgPSAnc3JjJztcbiAgICAgICAgICAgIHByb3BlcnR5VmFsdWUgPSB0aGlzLmNsU3JjO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2xTcmNzZXQpIHtcbiAgICAgICAgICAgIGF0dHJOYW1lID0gJ3NyY3NldCc7XG4gICAgICAgICAgICBwcm9wZXJ0eVZhbHVlID0gdGhpcy5jbFNyY3NldDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpc1N2ZyA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0aGlzLmNsSHJlZiAmJlxuICAgICAgICAgICAgdG9TdHJpbmcuY2FsbCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnRbJ2hyZWYnXSA9PT0gJ1tvYmplY3QgU1ZHQW5pbWF0ZWRTdHJpbmddJykpIHtcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3hsaW5rSHJlZicsICd4bGluazpocmVmJyk7XG4gICAgICAgICAgICBpc1N2ZyA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWF0dHJOYW1lIHx8ICFwcm9wZXJ0eVZhbHVlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RpcmVjdGl2ZSB2YWx1ZSBpcyBtaXNzaW5nIGZvciBjbEhyZWYvY2xTcmMvY2xTcmNzZXQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmNsb3VkaW5hcnkudG9DbG91ZGluYXJ5QXR0cmlidXRlcyhuYXRpdmVFbGVtZW50LmF0dHJpYnV0ZXMsIHRoaXMudHJhbnNmb3JtYXRpb25zKTtcblxuICAgICAgICBjb25zdCBhdHRyVmFsdWUgPSB0aGlzLmNsb3VkaW5hcnkudXJsKHByb3BlcnR5VmFsdWUsIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsdWUpO1xuXG4gICAgICAgIC8qXG4gICAgICAgICBvbiBJRSwgaWYgXCJuZ1NyY1wiIGRpcmVjdGl2ZSBkZWNsYXJhdGlvbiBpcyB1c2VkIGFuZCBcInNyY1wiIGF0dHJpYnV0ZSBkb2Vzbid0IGV4aXN0XG4gICAgICAgICB0aGVuIGNhbGxpbmcgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3NyYycsICdmb28nKSBkb2Vzbid0IGRvIGFueXRoaW5nLCBzbyB3ZSBuZWVkXG4gICAgICAgICB0byBzZXQgdGhlIHByb3BlcnR5IGFzIHdlbGwgdG8gYWNoaWV2ZSB0aGUgZGVzaXJlZCBlZmZlY3QuXG5cbiAgICAgICAgIENoZWNrIGZvciBJRTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzIxMzkzNzUvMTk4MDk1XG4gICAgICAgICBpZiBpcyBJRSB0aGVuIGRvY3VtZW50TW9kZSBjb250YWlucyBJRSB2ZXJzaW9uXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBtc2llID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm93bmVyRG9jdW1lbnQuZG9jdW1lbnRNb2RlO1xuICAgICAgICBpZiAobXNpZSAmJiAhaXNTdmcpIHtcbiAgICAgICAgICAgIC8vIElFIGxvZ2ljIGhlcmVcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudFthdHRyTmFtZV0gPSBhdHRyVmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xufVxuIl19