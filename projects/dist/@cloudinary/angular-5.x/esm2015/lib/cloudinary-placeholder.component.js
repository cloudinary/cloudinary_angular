/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, HostBinding, Input, } from '@angular/core';
import { Cloudinary } from './cloudinary.service';
export class CloudinaryPlaceHolder {
    /**
     * @param {?} cloudinary
     */
    constructor(cloudinary) {
        this.cloudinary = cloudinary;
        this.options = {};
    }
    /**
     * @param {?} width
     * @return {?}
     */
    setWidth(width) {
        this.itemWidth = width;
    }
    /**
     * @param {?} height
     * @return {?}
     */
    setHeight(height) {
        this.itemHeight = height;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    setPublicId(id) {
        this.publicId = id;
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        this.placeholderImg = this.getPlaceholderImage();
    }
    /**
     * @return {?}
     */
    getPlaceholderImage() {
        /** @type {?} */
        const placeholderImageOptions = {
            'vectorize': { effect: 'vectorize', quality: 1 },
            'pixelate': { effect: 'pixelate', quality: 1, fetch_format: 'auto' },
            'blur': { effect: 'blur:2000', quality: 1, fetch_format: 'auto' },
            'solid': [
                { width: 'iw_div_2', aspect_ratio: 1, crop: 'pad', background: 'auto' },
                { crop: 'crop', width: 10, height: 10, gravity: 'north_east' },
                { width: 'iw', height: 'ih', crop: 'fill' },
                { fetch_format: 'auto', quality: 'auto' }
            ]
        };
        /** @type {?} */
        const transformation = [].concat.apply([], [this.options, placeholderImageOptions[this.type] || placeholderImageOptions['blur']]);
        /** @type {?} */
        const test = this.cloudinary.url(this.publicId, { transformation: transformation });
        return test;
    }
}
CloudinaryPlaceHolder.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: 'cl-placeholder',
                template: `<img [src]="this.placeholderImg" [style.width.px]="this.itemWidth" [style.height.px]="this.itemHeight">`,
            },] },
];
/** @nocollapse */
CloudinaryPlaceHolder.ctorParameters = () => [
    { type: Cloudinary }
];
CloudinaryPlaceHolder.propDecorators = {
    type: [{ type: Input, args: ['type',] }],
    itemWidth: [{ type: HostBinding, args: ['style.width',] }],
    itemHeight: [{ type: HostBinding, args: ['style.height',] }],
    publicId: [{ type: HostBinding, args: ['attr.public-id',] }]
};
if (false) {
    /** @type {?} */
    CloudinaryPlaceHolder.prototype.type;
    /** @type {?} */
    CloudinaryPlaceHolder.prototype.itemWidth;
    /** @type {?} */
    CloudinaryPlaceHolder.prototype.itemHeight;
    /** @type {?} */
    CloudinaryPlaceHolder.prototype.publicId;
    /** @type {?} */
    CloudinaryPlaceHolder.prototype.options;
    /** @type {?} */
    CloudinaryPlaceHolder.prototype.placeholderImg;
    /** @type {?} */
    CloudinaryPlaceHolder.prototype.cloudinary;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWRpbmFyeS1wbGFjZWhvbGRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xvdWRpbmFyeS9hbmd1bGFyLTUueC8iLCJzb3VyY2VzIjpbImxpYi9jbG91ZGluYXJ5LXBsYWNlaG9sZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxXQUFXLEVBQ1gsS0FBSyxHQUNOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQVNoRCxNQUFNOzs7O0lBU0osWUFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTt1QkFIeEIsRUFBRTtLQUcwQjs7Ozs7SUFFOUMsUUFBUSxDQUFDLEtBQUs7UUFDWixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztLQUN4Qjs7Ozs7SUFFRCxTQUFTLENBQUMsTUFBTTtRQUNkLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO0tBQzFCOzs7OztJQUVELFdBQVcsQ0FBQyxFQUFFO1FBQ1osSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7S0FDcEI7Ozs7SUFFRCxxQkFBcUI7UUFDbkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztLQUNsRDs7OztJQUVELG1CQUFtQjs7UUFDakIsTUFBTSx1QkFBdUIsR0FBRztZQUM5QixXQUFXLEVBQUUsRUFBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUM7WUFDOUMsVUFBVSxFQUFFLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUM7WUFDbEUsTUFBTSxFQUFFLEVBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUM7WUFDL0QsT0FBTyxFQUFFO2dCQUNQLEVBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBQztnQkFDckUsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFDO2dCQUM1RCxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFDO2dCQUN6QyxFQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBQzthQUFDO1NBQzNDLENBQUE7O1FBQ0QsTUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksdUJBQXVCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDOztRQUNsSSxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUMsY0FBYyxFQUFFLGNBQWMsRUFBQyxDQUFDLENBQUM7UUFFbEYsT0FBTyxJQUFJLENBQUM7S0FDYjs7O1lBaERGLFNBQVMsU0FBQzs7Z0JBRVQsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFLHlHQUF5RzthQUVwSDs7OztZQVJPLFVBQVU7OzttQkFVZixLQUFLLFNBQUMsTUFBTTt3QkFDWixXQUFXLFNBQUMsYUFBYTt5QkFDekIsV0FBVyxTQUFDLGNBQWM7dUJBQzFCLFdBQVcsU0FBQyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICBDb21wb25lbnQsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Nsb3VkaW5hcnl9IGZyb20gJy4vY2xvdWRpbmFyeS5zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ2NsLXBsYWNlaG9sZGVyJyxcbiAgdGVtcGxhdGU6IGA8aW1nIFtzcmNdPVwidGhpcy5wbGFjZWhvbGRlckltZ1wiIFtzdHlsZS53aWR0aC5weF09XCJ0aGlzLml0ZW1XaWR0aFwiIFtzdHlsZS5oZWlnaHQucHhdPVwidGhpcy5pdGVtSGVpZ2h0XCI+YFxuICAsXG59KVxuZXhwb3J0IGNsYXNzIENsb3VkaW5hcnlQbGFjZUhvbGRlciBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQge1xuICBASW5wdXQoJ3R5cGUnKSB0eXBlOiBzdHJpbmc7XG4gIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgnKSBpdGVtV2lkdGg7XG4gIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0JykgaXRlbUhlaWdodDtcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnB1YmxpYy1pZCcpIHB1YmxpY0lkO1xuXG4gIG9wdGlvbnM6IG9iamVjdCA9IHt9O1xuICBwbGFjZWhvbGRlckltZzogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2xvdWRpbmFyeTogQ2xvdWRpbmFyeSkge31cblxuICBzZXRXaWR0aCh3aWR0aCkge1xuICAgIHRoaXMuaXRlbVdpZHRoID0gd2lkdGg7XG4gIH1cblxuICBzZXRIZWlnaHQoaGVpZ2h0KSB7XG4gICAgdGhpcy5pdGVtSGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgc2V0UHVibGljSWQoaWQpIHtcbiAgICB0aGlzLnB1YmxpY0lkID0gaWQ7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgdGhpcy5wbGFjZWhvbGRlckltZyA9IHRoaXMuZ2V0UGxhY2Vob2xkZXJJbWFnZSgpO1xuICB9XG5cbiAgZ2V0UGxhY2Vob2xkZXJJbWFnZSgpIHtcbiAgICBjb25zdCBwbGFjZWhvbGRlckltYWdlT3B0aW9ucyA9IHtcbiAgICAgICd2ZWN0b3JpemUnOiB7ZWZmZWN0OiAndmVjdG9yaXplJywgcXVhbGl0eTogMX0sXG4gICAgICAncGl4ZWxhdGUnOiB7ZWZmZWN0OiAncGl4ZWxhdGUnLCBxdWFsaXR5OiAxLCBmZXRjaF9mb3JtYXQ6ICdhdXRvJ30sXG4gICAgICAnYmx1cic6IHtlZmZlY3Q6ICdibHVyOjIwMDAnLCBxdWFsaXR5OiAxLCBmZXRjaF9mb3JtYXQ6ICdhdXRvJ30sXG4gICAgICAnc29saWQnOiBbXG4gICAgICAgIHt3aWR0aDogJ2l3X2Rpdl8yJywgYXNwZWN0X3JhdGlvOiAxLCBjcm9wOiAncGFkJywgYmFja2dyb3VuZDogJ2F1dG8nfSxcbiAgICAgICAge2Nyb3A6ICdjcm9wJywgd2lkdGg6IDEwLCBoZWlnaHQ6IDEwLCBncmF2aXR5OiAnbm9ydGhfZWFzdCd9LFxuICAgICAgICB7d2lkdGg6ICdpdycsIGhlaWdodDogJ2loJywgY3JvcDogJ2ZpbGwnfSxcbiAgICAgICAge2ZldGNoX2Zvcm1hdDogJ2F1dG8nLCBxdWFsaXR5OiAnYXV0byd9XVxuICAgIH1cbiAgICBjb25zdCB0cmFuc2Zvcm1hdGlvbiA9IFtdLmNvbmNhdC5hcHBseShbXSwgW3RoaXMub3B0aW9ucywgcGxhY2Vob2xkZXJJbWFnZU9wdGlvbnNbdGhpcy50eXBlXSB8fCBwbGFjZWhvbGRlckltYWdlT3B0aW9uc1snYmx1ciddXSk7XG4gICAgY29uc3QgdGVzdCA9IHRoaXMuY2xvdWRpbmFyeS51cmwodGhpcy5wdWJsaWNJZCwge3RyYW5zZm9ybWF0aW9uOiB0cmFuc2Zvcm1hdGlvbn0pO1xuXG4gICAgcmV0dXJuIHRlc3Q7XG4gIH1cbn1cbiJdfQ==