/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, HostBinding, Input, } from '@angular/core';
import { Cloudinary } from './cloudinary.service';
var CloudinaryPlaceHolder = /** @class */ (function () {
    function CloudinaryPlaceHolder(cloudinary) {
        this.cloudinary = cloudinary;
        this.options = {};
    }
    /**
     * @param {?} width
     * @return {?}
     */
    CloudinaryPlaceHolder.prototype.setWidth = /**
     * @param {?} width
     * @return {?}
     */
    function (width) {
        this.itemWidth = width;
    };
    /**
     * @param {?} height
     * @return {?}
     */
    CloudinaryPlaceHolder.prototype.setHeight = /**
     * @param {?} height
     * @return {?}
     */
    function (height) {
        this.itemHeight = height;
    };
    /**
     * @param {?} id
     * @return {?}
     */
    CloudinaryPlaceHolder.prototype.setPublicId = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        this.publicId = id;
    };
    /**
     * @return {?}
     */
    CloudinaryPlaceHolder.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        this.placeholderImg = this.getPlaceholderImage();
    };
    /**
     * @return {?}
     */
    CloudinaryPlaceHolder.prototype.getPlaceholderImage = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var placeholderImageOptions = {
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
        var transformation = [].concat.apply([], [this.options, placeholderImageOptions[this.type] || placeholderImageOptions['blur']]);
        /** @type {?} */
        var test = this.cloudinary.url(this.publicId, { transformation: transformation });
        return test;
    };
    CloudinaryPlaceHolder.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'cl-placeholder',
                    template: "<img [src]=\"this.placeholderImg\" [style.width.px]=\"this.itemWidth\" [style.height.px]=\"this.itemHeight\">",
                },] },
    ];
    /** @nocollapse */
    CloudinaryPlaceHolder.ctorParameters = function () { return [
        { type: Cloudinary }
    ]; };
    CloudinaryPlaceHolder.propDecorators = {
        type: [{ type: Input, args: ['type',] }],
        itemWidth: [{ type: HostBinding, args: ['style.width',] }],
        itemHeight: [{ type: HostBinding, args: ['style.height',] }],
        publicId: [{ type: HostBinding, args: ['attr.public-id',] }]
    };
    return CloudinaryPlaceHolder;
}());
export { CloudinaryPlaceHolder };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWRpbmFyeS1wbGFjZWhvbGRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xvdWRpbmFyeS9hbmd1bGFyLTUueC8iLCJzb3VyY2VzIjpbImxpYi9jbG91ZGluYXJ5LXBsYWNlaG9sZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxXQUFXLEVBQ1gsS0FBSyxHQUNOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQzs7SUFrQjlDLCtCQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO3VCQUh4QixFQUFFO0tBRzBCOzs7OztJQUU5Qyx3Q0FBUTs7OztJQUFSLFVBQVMsS0FBSztRQUNaLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0tBQ3hCOzs7OztJQUVELHlDQUFTOzs7O0lBQVQsVUFBVSxNQUFNO1FBQ2QsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7S0FDMUI7Ozs7O0lBRUQsMkNBQVc7Ozs7SUFBWCxVQUFZLEVBQUU7UUFDWixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztLQUNwQjs7OztJQUVELHFEQUFxQjs7O0lBQXJCO1FBQ0UsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztLQUNsRDs7OztJQUVELG1EQUFtQjs7O0lBQW5COztRQUNFLElBQU0sdUJBQXVCLEdBQUc7WUFDOUIsV0FBVyxFQUFFLEVBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDO1lBQzlDLFVBQVUsRUFBRSxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFDO1lBQ2xFLE1BQU0sRUFBRSxFQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFDO1lBQy9ELE9BQU8sRUFBRTtnQkFDUCxFQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUM7Z0JBQ3JFLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBQztnQkFDNUQsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBQztnQkFDekMsRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUM7YUFBQztTQUMzQyxDQUFBOztRQUNELElBQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzs7UUFDbEksSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFDLGNBQWMsRUFBRSxjQUFjLEVBQUMsQ0FBQyxDQUFDO1FBRWxGLE9BQU8sSUFBSSxDQUFDO0tBQ2I7O2dCQWhERixTQUFTLFNBQUM7O29CQUVULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSwrR0FBeUc7aUJBRXBIOzs7O2dCQVJPLFVBQVU7Ozt1QkFVZixLQUFLLFNBQUMsTUFBTTs0QkFDWixXQUFXLFNBQUMsYUFBYTs2QkFDekIsV0FBVyxTQUFDLGNBQWM7MkJBQzFCLFdBQVcsU0FBQyxnQkFBZ0I7O2dDQW5CL0I7O1NBZWEscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgQ29tcG9uZW50LFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDbG91ZGluYXJ5fSBmcm9tICcuL2Nsb3VkaW5hcnkuc2VydmljZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdjbC1wbGFjZWhvbGRlcicsXG4gIHRlbXBsYXRlOiBgPGltZyBbc3JjXT1cInRoaXMucGxhY2Vob2xkZXJJbWdcIiBbc3R5bGUud2lkdGgucHhdPVwidGhpcy5pdGVtV2lkdGhcIiBbc3R5bGUuaGVpZ2h0LnB4XT1cInRoaXMuaXRlbUhlaWdodFwiPmBcbiAgLFxufSlcbmV4cG9ydCBjbGFzcyBDbG91ZGluYXJ5UGxhY2VIb2xkZXIgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRDaGVja2VkIHtcbiAgQElucHV0KCd0eXBlJykgdHlwZTogc3RyaW5nO1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoJykgaXRlbVdpZHRoO1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmhlaWdodCcpIGl0ZW1IZWlnaHQ7XG4gIEBIb3N0QmluZGluZygnYXR0ci5wdWJsaWMtaWQnKSBwdWJsaWNJZDtcblxuICBvcHRpb25zOiBvYmplY3QgPSB7fTtcbiAgcGxhY2Vob2xkZXJJbWc6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNsb3VkaW5hcnk6IENsb3VkaW5hcnkpIHt9XG5cbiAgc2V0V2lkdGgod2lkdGgpIHtcbiAgICB0aGlzLml0ZW1XaWR0aCA9IHdpZHRoO1xuICB9XG5cbiAgc2V0SGVpZ2h0KGhlaWdodCkge1xuICAgIHRoaXMuaXRlbUhlaWdodCA9IGhlaWdodDtcbiAgfVxuXG4gIHNldFB1YmxpY0lkKGlkKSB7XG4gICAgdGhpcy5wdWJsaWNJZCA9IGlkO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgIHRoaXMucGxhY2Vob2xkZXJJbWcgPSB0aGlzLmdldFBsYWNlaG9sZGVySW1hZ2UoKTtcbiAgfVxuXG4gIGdldFBsYWNlaG9sZGVySW1hZ2UoKSB7XG4gICAgY29uc3QgcGxhY2Vob2xkZXJJbWFnZU9wdGlvbnMgPSB7XG4gICAgICAndmVjdG9yaXplJzoge2VmZmVjdDogJ3ZlY3Rvcml6ZScsIHF1YWxpdHk6IDF9LFxuICAgICAgJ3BpeGVsYXRlJzoge2VmZmVjdDogJ3BpeGVsYXRlJywgcXVhbGl0eTogMSwgZmV0Y2hfZm9ybWF0OiAnYXV0byd9LFxuICAgICAgJ2JsdXInOiB7ZWZmZWN0OiAnYmx1cjoyMDAwJywgcXVhbGl0eTogMSwgZmV0Y2hfZm9ybWF0OiAnYXV0byd9LFxuICAgICAgJ3NvbGlkJzogW1xuICAgICAgICB7d2lkdGg6ICdpd19kaXZfMicsIGFzcGVjdF9yYXRpbzogMSwgY3JvcDogJ3BhZCcsIGJhY2tncm91bmQ6ICdhdXRvJ30sXG4gICAgICAgIHtjcm9wOiAnY3JvcCcsIHdpZHRoOiAxMCwgaGVpZ2h0OiAxMCwgZ3Jhdml0eTogJ25vcnRoX2Vhc3QnfSxcbiAgICAgICAge3dpZHRoOiAnaXcnLCBoZWlnaHQ6ICdpaCcsIGNyb3A6ICdmaWxsJ30sXG4gICAgICAgIHtmZXRjaF9mb3JtYXQ6ICdhdXRvJywgcXVhbGl0eTogJ2F1dG8nfV1cbiAgICB9XG4gICAgY29uc3QgdHJhbnNmb3JtYXRpb24gPSBbXS5jb25jYXQuYXBwbHkoW10sIFt0aGlzLm9wdGlvbnMsIHBsYWNlaG9sZGVySW1hZ2VPcHRpb25zW3RoaXMudHlwZV0gfHwgcGxhY2Vob2xkZXJJbWFnZU9wdGlvbnNbJ2JsdXInXV0pO1xuICAgIGNvbnN0IHRlc3QgPSB0aGlzLmNsb3VkaW5hcnkudXJsKHRoaXMucHVibGljSWQsIHt0cmFuc2Zvcm1hdGlvbjogdHJhbnNmb3JtYXRpb259KTtcblxuICAgIHJldHVybiB0ZXN0O1xuICB9XG59XG4iXX0=