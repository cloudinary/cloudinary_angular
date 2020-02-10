/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ElementRef, Input, ContentChildren, QueryList, PLATFORM_ID, Inject, } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Cloudinary } from './cloudinary.service';
import { CloudinaryTransformationDirective } from './cloudinary-transformation.directive';
var CloudinaryVideo = /** @class */ (function () {
    function CloudinaryVideo(el, cloudinary, platformId) {
        this.el = el;
        this.cloudinary = cloudinary;
        this.platformId = platformId;
    }
    /**
     * @return {?}
     */
    CloudinaryVideo.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (typeof MutationObserver !== 'undefined') {
            // Create an observer instance
            this.observer = new MutationObserver(function () {
                _this.loadVideo(_this.publicId);
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
    CloudinaryVideo.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        // Listen to changes on the data-bound property 'publicId'.
        // Update component unless this is the first value assigned.
        if (changes["publicId"] && !changes["publicId"].isFirstChange()) {
            this.loadVideo(changes["publicId"].currentValue);
        }
    };
    /**
     * @return {?}
     */
    CloudinaryVideo.prototype.ngOnDestroy = /**
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
    CloudinaryVideo.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        if (!this.publicId) {
            throw new Error('You must set the public id of the video to load, e.g. <cl-video public-id={{video.public_id}}...></cl-video>');
        }
        this.loadVideo(this.publicId);
    };
    /**
     * @param {?} publicId
     * @return {?}
     */
    CloudinaryVideo.prototype.loadVideo = /**
     * @param {?} publicId
     * @return {?}
     */
    function (publicId) {
        // https://github.com/angular/universal#universal-gotchas
        if (isPlatformBrowser(this.platformId)) {
            /** @type {?} */
            var nativeElement = this.el.nativeElement;
            /** @type {?} */
            var video = nativeElement.children[0];
            /** @type {?} */
            var options = this.cloudinary.toCloudinaryAttributes(nativeElement.attributes, this.transformations);
            /** @type {?} */
            var videoTag = this.cloudinary.videoTag(publicId, options);
            // Replace template with the custom video tag created by Cloudinary
            this.appendSourceElements(video, videoTag.content());
            // Add attributes
            this.setElementAttributes(video, videoTag.attributes());
        }
    };
    /**
     * @param {?} element
     * @param {?} attributesLiteral
     * @return {?}
     */
    CloudinaryVideo.prototype.setElementAttributes = /**
     * @param {?} element
     * @param {?} attributesLiteral
     * @return {?}
     */
    function (element, attributesLiteral) {
        Object.keys(attributesLiteral).forEach(function (attrName) {
            element.setAttribute(attrName, attributesLiteral[attrName]);
        });
    };
    /**
     * @param {?} element
     * @param {?} html
     * @return {?}
     */
    CloudinaryVideo.prototype.appendSourceElements = /**
     * @param {?} element
     * @param {?} html
     * @return {?}
     */
    function (element, html) {
        /** @type {?} */
        var fragment = document.createDocumentFragment();
        element.innerHTML = html;
        while (element.childNodes[0]) {
            fragment.appendChild(element.childNodes[0]);
        }
        element.appendChild(fragment);
    };
    CloudinaryVideo.decorators = [
        { type: Component, args: [{
                    selector: 'cl-video',
                    template: '<video></video>'
                },] },
    ];
    /** @nocollapse */
    CloudinaryVideo.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Cloudinary },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    CloudinaryVideo.propDecorators = {
        publicId: [{ type: Input, args: ['public-id',] }],
        transformations: [{ type: ContentChildren, args: [CloudinaryTransformationDirective,] }]
    };
    return CloudinaryVideo;
}());
export { CloudinaryVideo };
if (false) {
    /** @type {?} */
    CloudinaryVideo.prototype.publicId;
    /** @type {?} */
    CloudinaryVideo.prototype.transformations;
    /** @type {?} */
    CloudinaryVideo.prototype.observer;
    /** @type {?} */
    CloudinaryVideo.prototype.el;
    /** @type {?} */
    CloudinaryVideo.prototype.cloudinary;
    /** @type {?} */
    CloudinaryVideo.prototype.platformId;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWRpbmFyeS12aWRlby5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xvdWRpbmFyeS9hbmd1bGFyLTUueC8iLCJzb3VyY2VzIjpbImxpYi9jbG91ZGluYXJ5LXZpZGVvLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLGVBQWUsRUFDZixTQUFTLEVBTVQsV0FBVyxFQUNYLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sdUNBQXVDLENBQUM7O0lBZ0J4Rix5QkFBb0IsRUFBYyxFQUFVLFVBQXNCLEVBQStCLFVBQWtCO1FBQS9GLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQStCLGVBQVUsR0FBVixVQUFVLENBQVE7S0FBSTs7OztJQUV2SCxrQ0FBUTs7O0lBQVI7UUFBQSxpQkFZQztRQVhDLElBQUksT0FBTyxnQkFBZ0IsS0FBSyxXQUFXLEVBQUU7O1lBRTNDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQztnQkFDbkMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDL0IsQ0FBQyxDQUFDOztZQUVILElBQU0sTUFBTSxHQUFHLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7O1lBR3JELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3REO0tBQ0Y7Ozs7O0lBRUQscUNBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCOzs7UUFHaEMsSUFBSSxPQUFPLGdCQUFhLENBQUMsT0FBTyxhQUFVLGFBQWEsRUFBRSxFQUFFO1lBQ3pELElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxhQUFVLFlBQVksQ0FBQyxDQUFDO1NBQy9DO0tBQ0Y7Ozs7SUFFRCxxQ0FBVzs7O0lBQVg7UUFDRSxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUU7WUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUM1QjtLQUNGOzs7O0lBRUQseUNBQWU7OztJQUFmO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsTUFBTSxJQUFJLEtBQUssQ0FDYiw4R0FBOEcsQ0FDL0csQ0FBQztTQUNIO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDL0I7Ozs7O0lBRUQsbUNBQVM7Ozs7SUFBVCxVQUFVLFFBQWdCOztRQUV4QixJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTs7WUFDdEMsSUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUM7O1lBQzVDLElBQU0sS0FBSyxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBQ3hDLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQ3BELGFBQWEsQ0FBQyxVQUFVLEVBQ3hCLElBQUksQ0FBQyxlQUFlLENBQ3JCLENBQUM7O1lBRUYsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDOztZQUc3RCxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDOztZQUVyRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1NBQ3pEO0tBQ0Y7Ozs7OztJQUVELDhDQUFvQjs7Ozs7SUFBcEIsVUFBcUIsT0FBTyxFQUFFLGlCQUFpQjtRQUM3QyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsUUFBUTtZQUM3QyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1NBQzdELENBQUMsQ0FBQztLQUNKOzs7Ozs7SUFFRCw4Q0FBb0I7Ozs7O0lBQXBCLFVBQXFCLE9BQU8sRUFBRSxJQUFJOztRQUNoQyxJQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUNuRCxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUV6QixPQUFPLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDNUIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0M7UUFDRCxPQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQy9COztnQkF0RkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxVQUFVO29CQUNwQixRQUFRLEVBQUUsaUJBQWlCO2lCQUM1Qjs7OztnQkFuQkMsVUFBVTtnQkFhSCxVQUFVO2dCQWlCNEYsTUFBTSx1QkFBOUMsTUFBTSxTQUFDLFdBQVc7OzsyQkFQdEYsS0FBSyxTQUFDLFdBQVc7a0NBRWpCLGVBQWUsU0FBQyxpQ0FBaUM7OzBCQTNCcEQ7O1NBdUJhLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIFF1ZXJ5TGlzdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgT25Jbml0LFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgUExBVEZPUk1fSUQsXG4gIEluamVjdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDbG91ZGluYXJ5IH0gZnJvbSAnLi9jbG91ZGluYXJ5LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xvdWRpbmFyeVRyYW5zZm9ybWF0aW9uRGlyZWN0aXZlIH0gZnJvbSAnLi9jbG91ZGluYXJ5LXRyYW5zZm9ybWF0aW9uLmRpcmVjdGl2ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NsLXZpZGVvJyxcbiAgdGVtcGxhdGU6ICc8dmlkZW8+PC92aWRlbz4nXG59KVxuLy8gU2VlIGFsc28gdmlkZW8gcmVmZXJlbmNlIC0gaHR0cDovL2Nsb3VkaW5hcnkuY29tL2RvY3VtZW50YXRpb24vdmlkZW9fbWFuaXB1bGF0aW9uX2FuZF9kZWxpdmVyeSN2aWRlb190cmFuc2Zvcm1hdGlvbnNfcmVmZXJlbmNlXG5leHBvcnQgY2xhc3MgQ2xvdWRpbmFyeVZpZGVvXG4gIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgncHVibGljLWlkJykgcHVibGljSWQ6IHN0cmluZztcblxuICBAQ29udGVudENoaWxkcmVuKENsb3VkaW5hcnlUcmFuc2Zvcm1hdGlvbkRpcmVjdGl2ZSlcbiAgdHJhbnNmb3JtYXRpb25zOiBRdWVyeUxpc3Q8Q2xvdWRpbmFyeVRyYW5zZm9ybWF0aW9uRGlyZWN0aXZlPjtcblxuICBvYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlcjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIGNsb3VkaW5hcnk6IENsb3VkaW5hcnksIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0KSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0eXBlb2YgTXV0YXRpb25PYnNlcnZlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIENyZWF0ZSBhbiBvYnNlcnZlciBpbnN0YW5jZVxuICAgICAgdGhpcy5vYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgdGhpcy5sb2FkVmlkZW8odGhpcy5wdWJsaWNJZCk7XG4gICAgICB9KTtcbiAgICAgIC8vIE9ic2VydmUgY2hhbmdlcyB0byBhdHRyaWJ1dGVzIG9yIGNoaWxkIHRyYW5zZm9ybWF0aW9ucyB0byByZS1yZW5kZXIgdGhlIGltYWdlXG4gICAgICBjb25zdCBjb25maWcgPSB7IGF0dHJpYnV0ZXM6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZSB9O1xuXG4gICAgICAvLyBwYXNzIGluIHRoZSB0YXJnZXQgbm9kZSwgYXMgd2VsbCBhcyB0aGUgb2JzZXJ2ZXIgb3B0aW9uc1xuICAgICAgdGhpcy5vYnNlcnZlci5vYnNlcnZlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgY29uZmlnKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgLy8gTGlzdGVuIHRvIGNoYW5nZXMgb24gdGhlIGRhdGEtYm91bmQgcHJvcGVydHkgJ3B1YmxpY0lkJy5cbiAgICAvLyBVcGRhdGUgY29tcG9uZW50IHVubGVzcyB0aGlzIGlzIHRoZSBmaXJzdCB2YWx1ZSBhc3NpZ25lZC5cbiAgICBpZiAoY2hhbmdlcy5wdWJsaWNJZCAmJiAhY2hhbmdlcy5wdWJsaWNJZC5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMubG9hZFZpZGVvKGNoYW5nZXMucHVibGljSWQuY3VycmVudFZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vYnNlcnZlciAmJiB0aGlzLm9ic2VydmVyLmRpc2Nvbm5lY3QpIHtcbiAgICAgIHRoaXMub2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBpZiAoIXRoaXMucHVibGljSWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1lvdSBtdXN0IHNldCB0aGUgcHVibGljIGlkIG9mIHRoZSB2aWRlbyB0byBsb2FkLCBlLmcuIDxjbC12aWRlbyBwdWJsaWMtaWQ9e3t2aWRlby5wdWJsaWNfaWR9fS4uLj48L2NsLXZpZGVvPidcbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMubG9hZFZpZGVvKHRoaXMucHVibGljSWQpO1xuICB9XG5cbiAgbG9hZFZpZGVvKHB1YmxpY0lkOiBzdHJpbmcpIHtcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci91bml2ZXJzYWwjdW5pdmVyc2FsLWdvdGNoYXNcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcbiAgICAgIGNvbnN0IHZpZGVvID0gbmF0aXZlRWxlbWVudC5jaGlsZHJlblswXTtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmNsb3VkaW5hcnkudG9DbG91ZGluYXJ5QXR0cmlidXRlcyhcbiAgICAgICAgbmF0aXZlRWxlbWVudC5hdHRyaWJ1dGVzLFxuICAgICAgICB0aGlzLnRyYW5zZm9ybWF0aW9uc1xuICAgICAgKTtcblxuICAgICAgY29uc3QgdmlkZW9UYWcgPSB0aGlzLmNsb3VkaW5hcnkudmlkZW9UYWcocHVibGljSWQsIG9wdGlvbnMpO1xuXG4gICAgICAvLyBSZXBsYWNlIHRlbXBsYXRlIHdpdGggdGhlIGN1c3RvbSB2aWRlbyB0YWcgY3JlYXRlZCBieSBDbG91ZGluYXJ5XG4gICAgICB0aGlzLmFwcGVuZFNvdXJjZUVsZW1lbnRzKHZpZGVvLCB2aWRlb1RhZy5jb250ZW50KCkpO1xuICAgICAgLy8gQWRkIGF0dHJpYnV0ZXNcbiAgICAgIHRoaXMuc2V0RWxlbWVudEF0dHJpYnV0ZXModmlkZW8sIHZpZGVvVGFnLmF0dHJpYnV0ZXMoKSk7XG4gICAgfVxuICB9XG5cbiAgc2V0RWxlbWVudEF0dHJpYnV0ZXMoZWxlbWVudCwgYXR0cmlidXRlc0xpdGVyYWwpIHtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzTGl0ZXJhbCkuZm9yRWFjaChhdHRyTmFtZSA9PiB7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0cmlidXRlc0xpdGVyYWxbYXR0ck5hbWVdKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFwcGVuZFNvdXJjZUVsZW1lbnRzKGVsZW1lbnQsIGh0bWwpIHtcbiAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGh0bWw7XG5cbiAgICB3aGlsZSAoZWxlbWVudC5jaGlsZE5vZGVzWzBdKSB7XG4gICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChlbGVtZW50LmNoaWxkTm9kZXNbMF0pO1xuICAgIH1cbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKGZyYWdtZW50KTtcbiAgfVxufVxuIl19