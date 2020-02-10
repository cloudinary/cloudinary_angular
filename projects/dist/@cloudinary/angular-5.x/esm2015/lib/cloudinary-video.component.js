/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ElementRef, Input, ContentChildren, QueryList, PLATFORM_ID, Inject, } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Cloudinary } from './cloudinary.service';
import { CloudinaryTransformationDirective } from './cloudinary-transformation.directive';
// See also video reference - http://cloudinary.com/documentation/video_manipulation_and_delivery#video_transformations_reference
export class CloudinaryVideo {
    /**
     * @param {?} el
     * @param {?} cloudinary
     * @param {?} platformId
     */
    constructor(el, cloudinary, platformId) {
        this.el = el;
        this.cloudinary = cloudinary;
        this.platformId = platformId;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (typeof MutationObserver !== 'undefined') {
            // Create an observer instance
            this.observer = new MutationObserver(() => {
                this.loadVideo(this.publicId);
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
            this.loadVideo(changes["publicId"].currentValue);
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
        if (!this.publicId) {
            throw new Error('You must set the public id of the video to load, e.g. <cl-video public-id={{video.public_id}}...></cl-video>');
        }
        this.loadVideo(this.publicId);
    }
    /**
     * @param {?} publicId
     * @return {?}
     */
    loadVideo(publicId) {
        // https://github.com/angular/universal#universal-gotchas
        if (isPlatformBrowser(this.platformId)) {
            /** @type {?} */
            const nativeElement = this.el.nativeElement;
            /** @type {?} */
            const video = nativeElement.children[0];
            /** @type {?} */
            const options = this.cloudinary.toCloudinaryAttributes(nativeElement.attributes, this.transformations);
            /** @type {?} */
            const videoTag = this.cloudinary.videoTag(publicId, options);
            // Replace template with the custom video tag created by Cloudinary
            this.appendSourceElements(video, videoTag.content());
            // Add attributes
            this.setElementAttributes(video, videoTag.attributes());
        }
    }
    /**
     * @param {?} element
     * @param {?} attributesLiteral
     * @return {?}
     */
    setElementAttributes(element, attributesLiteral) {
        Object.keys(attributesLiteral).forEach(attrName => {
            element.setAttribute(attrName, attributesLiteral[attrName]);
        });
    }
    /**
     * @param {?} element
     * @param {?} html
     * @return {?}
     */
    appendSourceElements(element, html) {
        /** @type {?} */
        const fragment = document.createDocumentFragment();
        element.innerHTML = html;
        while (element.childNodes[0]) {
            fragment.appendChild(element.childNodes[0]);
        }
        element.appendChild(fragment);
    }
}
CloudinaryVideo.decorators = [
    { type: Component, args: [{
                selector: 'cl-video',
                template: '<video></video>'
            },] },
];
/** @nocollapse */
CloudinaryVideo.ctorParameters = () => [
    { type: ElementRef },
    { type: Cloudinary },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
CloudinaryVideo.propDecorators = {
    publicId: [{ type: Input, args: ['public-id',] }],
    transformations: [{ type: ContentChildren, args: [CloudinaryTransformationDirective,] }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWRpbmFyeS12aWRlby5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xvdWRpbmFyeS9hbmd1bGFyLTUueC8iLCJzb3VyY2VzIjpbImxpYi9jbG91ZGluYXJ5LXZpZGVvLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLGVBQWUsRUFDZixTQUFTLEVBTVQsV0FBVyxFQUNYLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFFMUY7QUFLQSxNQUFNOzs7Ozs7SUFTSixZQUFvQixFQUFjLEVBQVUsVUFBc0IsRUFBK0IsVUFBa0I7UUFBL0YsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFVLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBK0IsZUFBVSxHQUFWLFVBQVUsQ0FBUTtLQUFJOzs7O0lBRXZILFFBQVE7UUFDTixJQUFJLE9BQU8sZ0JBQWdCLEtBQUssV0FBVyxFQUFFOztZQUUzQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksZ0JBQWdCLENBQUMsR0FBRyxFQUFFO2dCQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUMvQixDQUFDLENBQUM7O1lBRUgsTUFBTSxNQUFNLEdBQUcsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7WUFHckQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDdEQ7S0FDRjs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBc0I7OztRQUdoQyxJQUFJLE9BQU8sZ0JBQWEsQ0FBQyxPQUFPLGFBQVUsYUFBYSxFQUFFLEVBQUU7WUFDekQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLGFBQVUsWUFBWSxDQUFDLENBQUM7U0FDL0M7S0FDRjs7OztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUU7WUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUM1QjtLQUNGOzs7O0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQ2IsOEdBQThHLENBQy9HLENBQUM7U0FDSDtRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQy9COzs7OztJQUVELFNBQVMsQ0FBQyxRQUFnQjs7UUFFeEIsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7O1lBQ3RDLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDOztZQUM1QyxNQUFNLEtBQUssR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUN4QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLHNCQUFzQixDQUNwRCxhQUFhLENBQUMsVUFBVSxFQUN4QixJQUFJLENBQUMsZUFBZSxDQUNyQixDQUFDOztZQUVGLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQzs7WUFHN0QsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQzs7WUFFckQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztTQUN6RDtLQUNGOzs7Ozs7SUFFRCxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsaUJBQWlCO1FBQzdDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDaEQsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztTQUM3RCxDQUFDLENBQUM7S0FDSjs7Ozs7O0lBRUQsb0JBQW9CLENBQUMsT0FBTyxFQUFFLElBQUk7O1FBQ2hDLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQ25ELE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBRXpCLE9BQU8sT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM1QixRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3QztRQUNELE9BQU8sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDL0I7OztZQXRGRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLFFBQVEsRUFBRSxpQkFBaUI7YUFDNUI7Ozs7WUFuQkMsVUFBVTtZQWFILFVBQVU7WUFpQjRGLE1BQU0sdUJBQTlDLE1BQU0sU0FBQyxXQUFXOzs7dUJBUHRGLEtBQUssU0FBQyxXQUFXOzhCQUVqQixlQUFlLFNBQUMsaUNBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBRdWVyeUxpc3QsXG4gIEFmdGVyVmlld0luaXQsXG4gIE9uSW5pdCxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIFBMQVRGT1JNX0lELFxuICBJbmplY3QsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ2xvdWRpbmFyeSB9IGZyb20gJy4vY2xvdWRpbmFyeS5zZXJ2aWNlJztcbmltcG9ydCB7IENsb3VkaW5hcnlUcmFuc2Zvcm1hdGlvbkRpcmVjdGl2ZSB9IGZyb20gJy4vY2xvdWRpbmFyeS10cmFuc2Zvcm1hdGlvbi5kaXJlY3RpdmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbC12aWRlbycsXG4gIHRlbXBsYXRlOiAnPHZpZGVvPjwvdmlkZW8+J1xufSlcbi8vIFNlZSBhbHNvIHZpZGVvIHJlZmVyZW5jZSAtIGh0dHA6Ly9jbG91ZGluYXJ5LmNvbS9kb2N1bWVudGF0aW9uL3ZpZGVvX21hbmlwdWxhdGlvbl9hbmRfZGVsaXZlcnkjdmlkZW9fdHJhbnNmb3JtYXRpb25zX3JlZmVyZW5jZVxuZXhwb3J0IGNsYXNzIENsb3VkaW5hcnlWaWRlb1xuICBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICBASW5wdXQoJ3B1YmxpYy1pZCcpIHB1YmxpY0lkOiBzdHJpbmc7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihDbG91ZGluYXJ5VHJhbnNmb3JtYXRpb25EaXJlY3RpdmUpXG4gIHRyYW5zZm9ybWF0aW9uczogUXVlcnlMaXN0PENsb3VkaW5hcnlUcmFuc2Zvcm1hdGlvbkRpcmVjdGl2ZT47XG5cbiAgb2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXI7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBjbG91ZGluYXJ5OiBDbG91ZGluYXJ5LCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodHlwZW9mIE11dGF0aW9uT2JzZXJ2ZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBDcmVhdGUgYW4gb2JzZXJ2ZXIgaW5zdGFuY2VcbiAgICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICAgIHRoaXMubG9hZFZpZGVvKHRoaXMucHVibGljSWQpO1xuICAgICAgfSk7XG4gICAgICAvLyBPYnNlcnZlIGNoYW5nZXMgdG8gYXR0cmlidXRlcyBvciBjaGlsZCB0cmFuc2Zvcm1hdGlvbnMgdG8gcmUtcmVuZGVyIHRoZSBpbWFnZVxuICAgICAgY29uc3QgY29uZmlnID0geyBhdHRyaWJ1dGVzOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUgfTtcblxuICAgICAgLy8gcGFzcyBpbiB0aGUgdGFyZ2V0IG5vZGUsIGFzIHdlbGwgYXMgdGhlIG9ic2VydmVyIG9wdGlvbnNcbiAgICAgIHRoaXMub2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIGNvbmZpZyk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIC8vIExpc3RlbiB0byBjaGFuZ2VzIG9uIHRoZSBkYXRhLWJvdW5kIHByb3BlcnR5ICdwdWJsaWNJZCcuXG4gICAgLy8gVXBkYXRlIGNvbXBvbmVudCB1bmxlc3MgdGhpcyBpcyB0aGUgZmlyc3QgdmFsdWUgYXNzaWduZWQuXG4gICAgaWYgKGNoYW5nZXMucHVibGljSWQgJiYgIWNoYW5nZXMucHVibGljSWQuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLmxvYWRWaWRlbyhjaGFuZ2VzLnB1YmxpY0lkLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub2JzZXJ2ZXIgJiYgdGhpcy5vYnNlcnZlci5kaXNjb25uZWN0KSB7XG4gICAgICB0aGlzLm9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKCF0aGlzLnB1YmxpY0lkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdZb3UgbXVzdCBzZXQgdGhlIHB1YmxpYyBpZCBvZiB0aGUgdmlkZW8gdG8gbG9hZCwgZS5nLiA8Y2wtdmlkZW8gcHVibGljLWlkPXt7dmlkZW8ucHVibGljX2lkfX0uLi4+PC9jbC12aWRlbz4nXG4gICAgICApO1xuICAgIH1cbiAgICB0aGlzLmxvYWRWaWRlbyh0aGlzLnB1YmxpY0lkKTtcbiAgfVxuXG4gIGxvYWRWaWRlbyhwdWJsaWNJZDogc3RyaW5nKSB7XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvdW5pdmVyc2FsI3VuaXZlcnNhbC1nb3RjaGFzXG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIGNvbnN0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICBjb25zdCB2aWRlbyA9IG5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF07XG4gICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5jbG91ZGluYXJ5LnRvQ2xvdWRpbmFyeUF0dHJpYnV0ZXMoXG4gICAgICAgIG5hdGl2ZUVsZW1lbnQuYXR0cmlidXRlcyxcbiAgICAgICAgdGhpcy50cmFuc2Zvcm1hdGlvbnNcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IHZpZGVvVGFnID0gdGhpcy5jbG91ZGluYXJ5LnZpZGVvVGFnKHB1YmxpY0lkLCBvcHRpb25zKTtcblxuICAgICAgLy8gUmVwbGFjZSB0ZW1wbGF0ZSB3aXRoIHRoZSBjdXN0b20gdmlkZW8gdGFnIGNyZWF0ZWQgYnkgQ2xvdWRpbmFyeVxuICAgICAgdGhpcy5hcHBlbmRTb3VyY2VFbGVtZW50cyh2aWRlbywgdmlkZW9UYWcuY29udGVudCgpKTtcbiAgICAgIC8vIEFkZCBhdHRyaWJ1dGVzXG4gICAgICB0aGlzLnNldEVsZW1lbnRBdHRyaWJ1dGVzKHZpZGVvLCB2aWRlb1RhZy5hdHRyaWJ1dGVzKCkpO1xuICAgIH1cbiAgfVxuXG4gIHNldEVsZW1lbnRBdHRyaWJ1dGVzKGVsZW1lbnQsIGF0dHJpYnV0ZXNMaXRlcmFsKSB7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlc0xpdGVyYWwpLmZvckVhY2goYXR0ck5hbWUgPT4ge1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGF0dHJpYnV0ZXNMaXRlcmFsW2F0dHJOYW1lXSk7XG4gICAgfSk7XG4gIH1cblxuICBhcHBlbmRTb3VyY2VFbGVtZW50cyhlbGVtZW50LCBodG1sKSB7XG4gICAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBodG1sO1xuXG4gICAgd2hpbGUgKGVsZW1lbnQuY2hpbGROb2Rlc1swXSkge1xuICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudC5jaGlsZE5vZGVzWzBdKTtcbiAgICB9XG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZChmcmFnbWVudCk7XG4gIH1cbn1cbiJdfQ==