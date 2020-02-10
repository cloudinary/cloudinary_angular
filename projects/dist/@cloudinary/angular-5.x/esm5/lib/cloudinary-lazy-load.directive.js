/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ElementRef } from '@angular/core';
var LazyLoadDirective = /** @class */ (function () {
    function LazyLoadDirective(el) {
        this.el = el;
    }
    /**
     * @return {?}
     */
    LazyLoadDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        if (!this.isNativeLazyLoadSupported() && this.isLazyLoadSupported()) {
            this.lazyLoad();
        }
        else {
            this.loadImage();
        }
    };
    /**
     * @return {?}
     */
    LazyLoadDirective.prototype.loadImage = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var nativeElement = this.el.nativeElement;
        /** @type {?} */
        var image = nativeElement.children[0];
        image.setAttribute('src', image.dataset.src);
    };
    /**
     * @return {?}
     */
    LazyLoadDirective.prototype.isLazyLoadSupported = /**
     * @return {?}
     */
    function () {
        return window && 'IntersectionObserver' in window;
    };
    /**
     * @return {?}
     */
    LazyLoadDirective.prototype.isNativeLazyLoadSupported = /**
     * @return {?}
     */
    function () {
        return 'loading' in HTMLImageElement.prototype; // check loading property is defined on image or iframe
    };
    /**
     * @return {?}
     */
    LazyLoadDirective.prototype.lazyLoad = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var options = {
            rootMargin: "0px 0px -50% 0px",
        };
        /** @type {?} */
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    _this.loadImage();
                    observer.unobserve(entry.target);
                }
            }, options);
        });
        observer.observe(this.el.nativeElement);
    };
    LazyLoadDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'cl-image[loading=lazy]'
                },] },
    ];
    /** @nocollapse */
    LazyLoadDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    return LazyLoadDirective;
}());
export { LazyLoadDirective };
if (false) {
    /** @type {?} */
    LazyLoadDirective.prototype.el;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWRpbmFyeS1sYXp5LWxvYWQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsb3VkaW5hcnkvYW5ndWxhci01LngvIiwic291cmNlcyI6WyJsaWIvY2xvdWRpbmFyeS1sYXp5LWxvYWQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWdCLFNBQVMsRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7O0lBUWpFLDJCQUFvQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtLQUFJOzs7O0lBRXRDLDJDQUFlOzs7SUFBZjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMseUJBQXlCLEVBQUUsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBRTtZQUNuRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDakI7YUFBTTtZQUNMLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNsQjtLQUNKOzs7O0lBRUQscUNBQVM7OztJQUFUOztRQUNFLElBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDOztRQUM1QyxJQUFNLEtBQUssR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDOUM7Ozs7SUFFRCwrQ0FBbUI7OztJQUFuQjtRQUNFLE9BQU8sTUFBTSxJQUFJLHNCQUFzQixJQUFJLE1BQU0sQ0FBQztLQUNuRDs7OztJQUVELHFEQUF5Qjs7O0lBQXpCO1FBQ0UsT0FBTyxTQUFTLElBQUksZ0JBQWdCLENBQUMsU0FBUyxDQUFDO0tBQ2hEOzs7O0lBRUQsb0NBQVE7OztJQUFSO1FBQUEsaUJBY0M7O1FBYkMsSUFBTSxPQUFPLEdBQUc7WUFDZCxVQUFVLEVBQUUsa0JBQWtCO1NBQy9CLENBQUM7O1FBQ0YsSUFBTSxRQUFRLEdBQUcsSUFBSSxvQkFBb0IsQ0FDekMsVUFBQyxPQUFPO1lBQ04sT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7Z0JBQ2pCLElBQUksS0FBSyxDQUFDLGNBQWMsRUFBRTtvQkFDeEIsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUNqQixRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDbEM7YUFDRixFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ2IsQ0FBQyxDQUFDO1FBQ0wsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0tBQ3pDOztnQkEzQ0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx3QkFBd0I7aUJBQ25DOzs7O2dCQUxpQyxVQUFVOzs0QkFBNUM7O1NBTWEsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2NsLWltYWdlW2xvYWRpbmc9bGF6eV0nXG59KVxuZXhwb3J0IGNsYXNzIExhenlMb2FkRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICBpZiAoIXRoaXMuaXNOYXRpdmVMYXp5TG9hZFN1cHBvcnRlZCgpICYmIHRoaXMuaXNMYXp5TG9hZFN1cHBvcnRlZCgpKSB7XG4gICAgICAgIHRoaXMubGF6eUxvYWQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubG9hZEltYWdlKCk7XG4gICAgICB9XG4gIH1cblxuICBsb2FkSW1hZ2UoKSB7XG4gICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBpbWFnZSA9IG5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF07XG4gICAgaW1hZ2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBpbWFnZS5kYXRhc2V0LnNyYyk7XG4gIH1cblxuICBpc0xhenlMb2FkU3VwcG9ydGVkKCkge1xuICAgIHJldHVybiB3aW5kb3cgJiYgJ0ludGVyc2VjdGlvbk9ic2VydmVyJyBpbiB3aW5kb3c7XG4gIH1cblxuICBpc05hdGl2ZUxhenlMb2FkU3VwcG9ydGVkKCkge1xuICAgIHJldHVybiAnbG9hZGluZycgaW4gSFRNTEltYWdlRWxlbWVudC5wcm90b3R5cGU7IC8vIGNoZWNrIGxvYWRpbmcgcHJvcGVydHkgaXMgZGVmaW5lZCBvbiBpbWFnZSBvciBpZnJhbWVcbiAgfVxuXG4gIGxhenlMb2FkKCkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICByb290TWFyZ2luOiBgMHB4IDBweCAtNTAlIDBweGAsIC8vIE1hcmdpbiBhcm91bmQgdGhlIHJvb3RcbiAgICB9O1xuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKFxuICAgIChlbnRyaWVzKSA9PiB7XG4gICAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgICAgICAgdGhpcy5sb2FkSW1hZ2UoKTtcbiAgICAgICAgICAgIG9ic2VydmVyLnVub2JzZXJ2ZShlbnRyeS50YXJnZXQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgICB9KTtcbiAgICBvYnNlcnZlci5vYnNlcnZlKHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gIH1cbn1cbiJdfQ==