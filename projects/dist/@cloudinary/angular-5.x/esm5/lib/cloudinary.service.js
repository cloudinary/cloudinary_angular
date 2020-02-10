/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/** *
 * Returns true if the given string begins with a left curly brace and ends with a right curly brace, e.g.
 * "{asdas d}" will return true, "asdasd}" will return false.
 *
 * this function does not validate the correctness of the string content other than the first and last character
 * \@param str
 * \@return boolean
  @type {?} */
var isJsonLikeString = function (str) {
    // [\s\S] allows the string to contain new lines
    return str && typeof str === 'string' && (str.trim().match(/^{[\s\S]*?}$/) !== null);
};
var ɵ0 = isJsonLikeString;
/** @type {?} */
var isNamedNodeMap = function (obj) {
    return obj && (obj.constructor.name === 'NamedNodeMap' || obj instanceof NamedNodeMap);
};
var ɵ1 = isNamedNodeMap;
/** @type {?} */
var namedNodeMapToObject = function (source) {
    /** @type {?} */
    var target = {};
    Object.keys(source).forEach(function (index) {
        /** @type {?} */
        var name = source[index].name;
        /** @type {?} */
        var value = source[index].value;
        target[name] = value;
    });
    return target;
};
var ɵ2 = namedNodeMapToObject;
/** @type {?} */
var transformKeyNames = function (obj) {
    /** @type {?} */
    var _obj = obj;
    if (isJsonLikeString(obj)) {
        // Given attribute value is in the form of a JSON object -
        // Transforms the string into an object, as the Javascript API expects
        _obj = JSON.parse(obj);
    }
    else if (isNamedNodeMap(obj)) {
        _obj = namedNodeMapToObject(obj);
    }
    if (Array.isArray(_obj)) {
        // Transform all the array values (e.g. transformation array)
        _obj = _obj.map(function (currentValue) {
            return transformKeyNames(currentValue);
        });
    }
    else if (typeof _obj === 'object') {
        Object.keys(_obj).forEach(function (key) {
            /** @type {?} */
            var kebabKey = key.replace(/-/g, '_').toLocaleLowerCase().replace(/^cld(-|_)?/, '');
            /** @type {?} */
            var kebabValue = transformKeyNames(_obj[key]);
            delete _obj[key];
            _obj[kebabKey] = kebabValue;
        });
    }
    return _obj;
};
var ɵ3 = transformKeyNames;
var Cloudinary = /** @class */ (function () {
    function Cloudinary(cloudinaryJsLib, configuration) {
        // Cloudinary JS already clones the given configuration so no need to clone it here too
        if (cloudinaryJsLib.CloudinaryJQuery) {
            this._cloudinaryInstance = new cloudinaryJsLib.CloudinaryJQuery(configuration);
        }
        else {
            this._cloudinaryInstance = new cloudinaryJsLib.Cloudinary(configuration);
        }
    }
    Object.defineProperty(Cloudinary.prototype, "cloudinaryInstance", {
        get: /**
         * @return {?}
         */
        function () {
            return this._cloudinaryInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Cloudinary.prototype.config = /**
     * @return {?}
     */
    function () {
        return this._cloudinaryInstance.config();
    };
    /**
     * @param {...?} parameters
     * @return {?}
     */
    Cloudinary.prototype.url = /**
     * @param {...?} parameters
     * @return {?}
     */
    function () {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        var _a;
        return (_a = this._cloudinaryInstance).url.apply(_a, tslib_1.__spread(parameters));
    };
    /**
     * @param {...?} parameters
     * @return {?}
     */
    Cloudinary.prototype.imageTag = /**
     * @param {...?} parameters
     * @return {?}
     */
    function () {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        var _a;
        return (_a = this._cloudinaryInstance).imageTag.apply(_a, tslib_1.__spread(parameters));
    };
    /**
     * @param {...?} parameters
     * @return {?}
     */
    Cloudinary.prototype.videoTag = /**
     * @param {...?} parameters
     * @return {?}
     */
    function () {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        var _a;
        return (_a = this._cloudinaryInstance).videoTag.apply(_a, tslib_1.__spread(parameters));
    };
    /**
     * @param {?} img
     * @param {?} options
     * @return {?}
     */
    Cloudinary.prototype.responsive = /**
     * @param {?} img
     * @param {?} options
     * @return {?}
     */
    function (img, options) {
        // Cloudinary underlying JS library will handle responsive behavior
        this._cloudinaryInstance.cloudinary_update(img, options);
        this._cloudinaryInstance.responsive(options, false);
    };
    /**
     * Transforms a set of attributes and chained transformations to an options object that can be consumed by Cloudinary JS API
     * @param attributes HTML element attributes
     * @param childTransformations QueryList with the element's <cl-transformation> children for chained transformations
     * @param cloudinary Cloudinary service
     * @returns An options object that can be consumed by Cloudinary JS API
     */
    /**
     * Transforms a set of attributes and chained transformations to an options object that can be consumed by Cloudinary JS API
     * @param {?} attributes HTML element attributes
     * @param {?=} childTransformations QueryList with the element's <cl-transformation> children for chained transformations
     * @return {?} An options object that can be consumed by Cloudinary JS API
     */
    Cloudinary.prototype.toCloudinaryAttributes = /**
     * Transforms a set of attributes and chained transformations to an options object that can be consumed by Cloudinary JS API
     * @param {?} attributes HTML element attributes
     * @param {?=} childTransformations QueryList with the element's <cl-transformation> children for chained transformations
     * @return {?} An options object that can be consumed by Cloudinary JS API
     */
    function (attributes, childTransformations) {
        var _this = this;
        /** @type {?} */
        var options = transformKeyNames(attributes);
        // Add chained transformations
        if (childTransformations && childTransformations.length > 0) {
            options.transformation = [];
            // Support chained transformations
            childTransformations.forEach(function (transformation) {
                options.transformation.push(_this.toCloudinaryAttributes(transformation.getAttributes()));
            });
        }
        // Add responsiveness
        if (options.responsive === '' || options.responsive === 'true' || options.responsive === true) {
            options.responsive = true;
        }
        return options;
    };
    ;
    return Cloudinary;
}());
export { Cloudinary };
if (false) {
    /** @type {?} */
    Cloudinary.prototype._cloudinaryInstance;
}
/**
 * @param {?} cloudinaryJsLib
 * @param {?} configuration
 * @return {?}
 */
export function provideCloudinary(cloudinaryJsLib, configuration) {
    return { provide: Cloudinary, useFactory: function () { return new Cloudinary(cloudinaryJsLib, configuration); } };
}
;
/** @type {?} */
var isBrowser = function () {
    return typeof window !== 'undefined';
};
var ɵ4 = isBrowser;
export { isJsonLikeString, isNamedNodeMap, transformKeyNames, namedNodeMapToObject, isBrowser };
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWRpbmFyeS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsb3VkaW5hcnkvYW5ndWxhci01LngvIiwic291cmNlcyI6WyJsaWIvY2xvdWRpbmFyeS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFZQSxJQUFNLGdCQUFnQixHQUFHLFVBQVUsR0FBUTs7SUFFekMsT0FBTyxHQUFHLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztDQUN0RixDQUFDOzs7QUFFRixJQUFNLGNBQWMsR0FBRyxVQUFVLEdBQVE7SUFDdkMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxjQUFjLElBQUksR0FBRyxZQUFZLFlBQVksQ0FBQyxDQUFDO0NBQ3hGLENBQUM7OztBQUVGLElBQU0sb0JBQW9CLEdBQUcsVUFBVSxNQUFvQjs7SUFDekQsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSzs7UUFDL0IsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQzs7UUFDaEMsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO0tBQ3RCLENBQUMsQ0FBQztJQUNILE9BQU8sTUFBTSxDQUFDO0NBQ2YsQ0FBQzs7O0FBRUYsSUFBTSxpQkFBaUIsR0FBRyxVQUFVLEdBQVE7O0lBQzFDLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQztJQUNmLElBQUksZ0JBQWdCLENBQUMsR0FBRyxDQUFDLEVBQUU7OztRQUd6QixJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUN4QjtTQUFNLElBQUksY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQzlCLElBQUksR0FBRyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNsQztJQUVELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTs7UUFFdkIsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQSxZQUFZO1lBQzFCLE9BQU8saUJBQWlCLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDeEMsQ0FBQyxDQUFDO0tBQ0o7U0FBTSxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7O1lBRzNCLElBQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLGlCQUFpQixFQUFFLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQzs7WUFDdEYsSUFBTSxVQUFVLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDaEQsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFVBQVUsQ0FBQztTQUM3QixDQUFDLENBQUM7S0FDSjtJQUNELE9BQU8sSUFBSSxDQUFDO0NBQ2IsQ0FBQzs7QUFFRixJQUFBO0lBR0Usb0JBQVksZUFBb0IsRUFBRSxhQUFzQzs7UUFFdEUsSUFBSSxlQUFlLENBQUMsZ0JBQWdCLEVBQUU7WUFDcEMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksZUFBZSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ2hGO2FBQU07WUFDTCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxlQUFlLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQzFFO0tBQ0Y7SUFFRCxzQkFBSSwwQ0FBa0I7Ozs7UUFBdEI7WUFDRSxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztTQUNqQzs7O09BQUE7Ozs7SUFFRCwyQkFBTTs7O0lBQU47UUFDRSxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUMxQzs7Ozs7SUFFRCx3QkFBRzs7OztJQUFIO1FBQUksb0JBQWE7YUFBYixVQUFhLEVBQWIscUJBQWEsRUFBYixJQUFhO1lBQWIsK0JBQWE7OztRQUNmLE9BQU8sQ0FBQSxLQUFBLElBQUksQ0FBQyxtQkFBbUIsQ0FBQSxDQUFDLEdBQUcsNEJBQUksVUFBVSxHQUFFO0tBQ3BEOzs7OztJQUVELDZCQUFROzs7O0lBQVI7UUFBUyxvQkFBYTthQUFiLFVBQWEsRUFBYixxQkFBYSxFQUFiLElBQWE7WUFBYiwrQkFBYTs7O1FBQ3BCLE9BQU8sQ0FBQSxLQUFBLElBQUksQ0FBQyxtQkFBbUIsQ0FBQSxDQUFDLFFBQVEsNEJBQUksVUFBVSxHQUFFO0tBQ3pEOzs7OztJQUVELDZCQUFROzs7O0lBQVI7UUFBUyxvQkFBYTthQUFiLFVBQWEsRUFBYixxQkFBYSxFQUFiLElBQWE7WUFBYiwrQkFBYTs7O1FBQ3BCLE9BQU8sQ0FBQSxLQUFBLElBQUksQ0FBQyxtQkFBbUIsQ0FBQSxDQUFDLFFBQVEsNEJBQUksVUFBVSxHQUFFO0tBQ3pEOzs7Ozs7SUFFRCwrQkFBVTs7Ozs7SUFBVixVQUFXLEdBQXFCLEVBQUUsT0FBWTs7UUFFNUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztLQUNyRDtJQUdEOzs7Ozs7T0FNRzs7Ozs7OztJQUNILDJDQUFzQjs7Ozs7O0lBQXRCLFVBQXVCLFVBQXdCLEVBQzdDLG9CQUFtRTtRQURyRSxpQkFtQkM7O1FBakJDLElBQU0sT0FBTyxHQUFHLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDOztRQUc5QyxJQUFJLG9CQUFvQixJQUFJLG9CQUFvQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDM0QsT0FBTyxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7O1lBRTVCLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxVQUFBLGNBQWM7Z0JBQ3pDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQzFGLENBQUMsQ0FBQztTQUNKOztRQUdELElBQUksT0FBTyxDQUFDLFVBQVUsS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLFVBQVUsS0FBSyxNQUFNLElBQUksT0FBTyxDQUFDLFVBQVUsS0FBSyxJQUFJLEVBQUU7WUFDN0YsT0FBTyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7U0FDM0I7UUFDRCxPQUFPLE9BQU8sQ0FBQztLQUVoQjtJQUFBLENBQUM7cUJBNUhKO0lBNkhDLENBQUE7QUFsRUQsc0JBa0VDOzs7Ozs7Ozs7O0FBR0QsTUFBTSw0QkFBNEIsZUFBb0IsRUFBRSxhQUFzQztJQUM1RixPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsY0FBTSxPQUFBLElBQUksVUFBVSxDQUFDLGVBQWUsRUFBRSxhQUFhLENBQUMsRUFBOUMsQ0FBOEMsRUFBRSxDQUFDO0NBQ2xHO0FBQUEsQ0FBQzs7QUFFRixJQUFNLFNBQVMsR0FBRztJQUNoQixPQUFPLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQztDQUN0QyxDQUFBOztBQUdELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBDbG91ZGluYXJ5Q29uZmlndXJhdGlvbiBmcm9tICcuL2Nsb3VkaW5hcnktY29uZmlndXJhdGlvbi5jbGFzcyc7XG5pbXBvcnQgeyBDbG91ZGluYXJ5VHJhbnNmb3JtYXRpb25EaXJlY3RpdmUgfSBmcm9tICcuL2Nsb3VkaW5hcnktdHJhbnNmb3JtYXRpb24uZGlyZWN0aXZlJztcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIHN0cmluZyBiZWdpbnMgd2l0aCBhIGxlZnQgY3VybHkgYnJhY2UgYW5kIGVuZHMgd2l0aCBhIHJpZ2h0IGN1cmx5IGJyYWNlLCBlLmcuXG4gKiBcInthc2RhcyBkfVwiIHdpbGwgcmV0dXJuIHRydWUsIFwiYXNkYXNkfVwiIHdpbGwgcmV0dXJuIGZhbHNlLlxuICpcbiAqIHRoaXMgZnVuY3Rpb24gZG9lcyBub3QgdmFsaWRhdGUgdGhlIGNvcnJlY3RuZXNzIG9mIHRoZSBzdHJpbmcgY29udGVudCBvdGhlciB0aGFuIHRoZSBmaXJzdCBhbmQgbGFzdCBjaGFyYWN0ZXJcbiAqIEBwYXJhbSBzdHJcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuY29uc3QgaXNKc29uTGlrZVN0cmluZyA9IGZ1bmN0aW9uIChzdHI6IGFueSk6IGJvb2xlYW4ge1xuICAvLyBbXFxzXFxTXSBhbGxvd3MgdGhlIHN0cmluZyB0byBjb250YWluIG5ldyBsaW5lc1xuICByZXR1cm4gc3RyICYmIHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnICYmIChzdHIudHJpbSgpLm1hdGNoKC9ee1tcXHNcXFNdKj99JC8pICE9PSBudWxsKTtcbn07XG5cbmNvbnN0IGlzTmFtZWROb2RlTWFwID0gZnVuY3Rpb24gKG9iajogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiBvYmogJiYgKG9iai5jb25zdHJ1Y3Rvci5uYW1lID09PSAnTmFtZWROb2RlTWFwJyB8fCBvYmogaW5zdGFuY2VvZiBOYW1lZE5vZGVNYXApO1xufTtcblxuY29uc3QgbmFtZWROb2RlTWFwVG9PYmplY3QgPSBmdW5jdGlvbiAoc291cmNlOiBOYW1lZE5vZGVNYXApOiBhbnkge1xuICBsZXQgdGFyZ2V0ID0ge307XG4gIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChpbmRleCA9PiB7XG4gICAgY29uc3QgbmFtZSA9IHNvdXJjZVtpbmRleF0ubmFtZTtcbiAgICBjb25zdCB2YWx1ZSA9IHNvdXJjZVtpbmRleF0udmFsdWU7XG4gICAgdGFyZ2V0W25hbWVdID0gdmFsdWU7XG4gIH0pO1xuICByZXR1cm4gdGFyZ2V0O1xufTtcblxuY29uc3QgdHJhbnNmb3JtS2V5TmFtZXMgPSBmdW5jdGlvbiAob2JqOiBhbnkpOiBhbnkge1xuICBsZXQgX29iaiA9IG9iajtcbiAgaWYgKGlzSnNvbkxpa2VTdHJpbmcob2JqKSkge1xuICAgIC8vIEdpdmVuIGF0dHJpYnV0ZSB2YWx1ZSBpcyBpbiB0aGUgZm9ybSBvZiBhIEpTT04gb2JqZWN0IC1cbiAgICAvLyBUcmFuc2Zvcm1zIHRoZSBzdHJpbmcgaW50byBhbiBvYmplY3QsIGFzIHRoZSBKYXZhc2NyaXB0IEFQSSBleHBlY3RzXG4gICAgX29iaiA9IEpTT04ucGFyc2Uob2JqKTtcbiAgfSBlbHNlIGlmIChpc05hbWVkTm9kZU1hcChvYmopKSB7XG4gICAgX29iaiA9IG5hbWVkTm9kZU1hcFRvT2JqZWN0KG9iaik7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShfb2JqKSkge1xuICAgIC8vIFRyYW5zZm9ybSBhbGwgdGhlIGFycmF5IHZhbHVlcyAoZS5nLiB0cmFuc2Zvcm1hdGlvbiBhcnJheSlcbiAgICBfb2JqID0gX29iai5tYXAoY3VycmVudFZhbHVlID0+IHtcbiAgICAgIHJldHVybiB0cmFuc2Zvcm1LZXlOYW1lcyhjdXJyZW50VmFsdWUpO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBfb2JqID09PSAnb2JqZWN0Jykge1xuICAgIE9iamVjdC5rZXlzKF9vYmopLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIC8vIFJlcGxhY2UgdGhlIGtleSBuYW1lIHdpdGggdGhlIHNuYWtlX2Nhc2VcbiAgICAgIC8vIFRoZW4gc3RyaXAgY2xkIHByZWZpeCBpZiBpdCBleGlzdHMgKHdpdGggYW4gb3B0aW9uYWwgZGFzaCBvciB1bmRlcnNjb3JlKVxuICAgICAgY29uc3Qga2ViYWJLZXkgPSBrZXkucmVwbGFjZSgvLS9nLCAnXycpLnRvTG9jYWxlTG93ZXJDYXNlKCkucmVwbGFjZSgvXmNsZCgtfF8pPy8sICcnKTtcbiAgICAgIGNvbnN0IGtlYmFiVmFsdWUgPSB0cmFuc2Zvcm1LZXlOYW1lcyhfb2JqW2tleV0pO1xuICAgICAgZGVsZXRlIF9vYmpba2V5XTtcbiAgICAgIF9vYmpba2ViYWJLZXldID0ga2ViYWJWYWx1ZTtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gX29iajtcbn07XG5cbmV4cG9ydCBjbGFzcyBDbG91ZGluYXJ5IHtcbiAgX2Nsb3VkaW5hcnlJbnN0YW5jZTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKGNsb3VkaW5hcnlKc0xpYjogYW55LCBjb25maWd1cmF0aW9uOiBDbG91ZGluYXJ5Q29uZmlndXJhdGlvbikge1xuICAgIC8vIENsb3VkaW5hcnkgSlMgYWxyZWFkeSBjbG9uZXMgdGhlIGdpdmVuIGNvbmZpZ3VyYXRpb24gc28gbm8gbmVlZCB0byBjbG9uZSBpdCBoZXJlIHRvb1xuICAgIGlmIChjbG91ZGluYXJ5SnNMaWIuQ2xvdWRpbmFyeUpRdWVyeSkge1xuICAgICAgdGhpcy5fY2xvdWRpbmFyeUluc3RhbmNlID0gbmV3IGNsb3VkaW5hcnlKc0xpYi5DbG91ZGluYXJ5SlF1ZXJ5KGNvbmZpZ3VyYXRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9jbG91ZGluYXJ5SW5zdGFuY2UgPSBuZXcgY2xvdWRpbmFyeUpzTGliLkNsb3VkaW5hcnkoY29uZmlndXJhdGlvbik7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGNsb3VkaW5hcnlJbnN0YW5jZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9jbG91ZGluYXJ5SW5zdGFuY2U7XG4gIH1cblxuICBjb25maWcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Nsb3VkaW5hcnlJbnN0YW5jZS5jb25maWcoKTtcbiAgfVxuXG4gIHVybCguLi5wYXJhbWV0ZXJzKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fY2xvdWRpbmFyeUluc3RhbmNlLnVybCguLi5wYXJhbWV0ZXJzKTtcbiAgfVxuXG4gIGltYWdlVGFnKC4uLnBhcmFtZXRlcnMpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9jbG91ZGluYXJ5SW5zdGFuY2UuaW1hZ2VUYWcoLi4ucGFyYW1ldGVycyk7XG4gIH1cblxuICB2aWRlb1RhZyguLi5wYXJhbWV0ZXJzKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fY2xvdWRpbmFyeUluc3RhbmNlLnZpZGVvVGFnKC4uLnBhcmFtZXRlcnMpO1xuICB9XG5cbiAgcmVzcG9uc2l2ZShpbWc6IEhUTUxJbWFnZUVsZW1lbnQsIG9wdGlvbnM6IGFueSk6IHZvaWQge1xuICAgIC8vIENsb3VkaW5hcnkgdW5kZXJseWluZyBKUyBsaWJyYXJ5IHdpbGwgaGFuZGxlIHJlc3BvbnNpdmUgYmVoYXZpb3JcbiAgICB0aGlzLl9jbG91ZGluYXJ5SW5zdGFuY2UuY2xvdWRpbmFyeV91cGRhdGUoaW1nLCBvcHRpb25zKTtcbiAgICB0aGlzLl9jbG91ZGluYXJ5SW5zdGFuY2UucmVzcG9uc2l2ZShvcHRpb25zLCBmYWxzZSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBUcmFuc2Zvcm1zIGEgc2V0IG9mIGF0dHJpYnV0ZXMgYW5kIGNoYWluZWQgdHJhbnNmb3JtYXRpb25zIHRvIGFuIG9wdGlvbnMgb2JqZWN0IHRoYXQgY2FuIGJlIGNvbnN1bWVkIGJ5IENsb3VkaW5hcnkgSlMgQVBJXG4gICAqIEBwYXJhbSBhdHRyaWJ1dGVzIEhUTUwgZWxlbWVudCBhdHRyaWJ1dGVzXG4gICAqIEBwYXJhbSBjaGlsZFRyYW5zZm9ybWF0aW9ucyBRdWVyeUxpc3Qgd2l0aCB0aGUgZWxlbWVudCdzIDxjbC10cmFuc2Zvcm1hdGlvbj4gY2hpbGRyZW4gZm9yIGNoYWluZWQgdHJhbnNmb3JtYXRpb25zXG4gICAqIEBwYXJhbSBjbG91ZGluYXJ5IENsb3VkaW5hcnkgc2VydmljZVxuICAgKiBAcmV0dXJucyBBbiBvcHRpb25zIG9iamVjdCB0aGF0IGNhbiBiZSBjb25zdW1lZCBieSBDbG91ZGluYXJ5IEpTIEFQSVxuICAgKi9cbiAgdG9DbG91ZGluYXJ5QXR0cmlidXRlcyhhdHRyaWJ1dGVzOiBOYW1lZE5vZGVNYXAsXG4gICAgY2hpbGRUcmFuc2Zvcm1hdGlvbnM/OiBRdWVyeUxpc3Q8Q2xvdWRpbmFyeVRyYW5zZm9ybWF0aW9uRGlyZWN0aXZlPik6IGFueSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHRyYW5zZm9ybUtleU5hbWVzKGF0dHJpYnV0ZXMpO1xuXG4gICAgLy8gQWRkIGNoYWluZWQgdHJhbnNmb3JtYXRpb25zXG4gICAgaWYgKGNoaWxkVHJhbnNmb3JtYXRpb25zICYmIGNoaWxkVHJhbnNmb3JtYXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIG9wdGlvbnMudHJhbnNmb3JtYXRpb24gPSBbXTtcbiAgICAgIC8vIFN1cHBvcnQgY2hhaW5lZCB0cmFuc2Zvcm1hdGlvbnNcbiAgICAgIGNoaWxkVHJhbnNmb3JtYXRpb25zLmZvckVhY2godHJhbnNmb3JtYXRpb24gPT4ge1xuICAgICAgICBvcHRpb25zLnRyYW5zZm9ybWF0aW9uLnB1c2godGhpcy50b0Nsb3VkaW5hcnlBdHRyaWJ1dGVzKHRyYW5zZm9ybWF0aW9uLmdldEF0dHJpYnV0ZXMoKSkpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHJlc3BvbnNpdmVuZXNzXG4gICAgaWYgKG9wdGlvbnMucmVzcG9uc2l2ZSA9PT0gJycgfHwgb3B0aW9ucy5yZXNwb25zaXZlID09PSAndHJ1ZScgfHwgb3B0aW9ucy5yZXNwb25zaXZlID09PSB0cnVlKSB7XG4gICAgICBvcHRpb25zLnJlc3BvbnNpdmUgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gb3B0aW9ucztcblxuICB9O1xufVxuXG4vKiBSZXR1cm4gYSBwcm92aWRlciBvYmplY3QgdGhhdCBjcmVhdGVzIG91ciBjb25maWd1cmFibGUgc2VydmljZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVDbG91ZGluYXJ5KGNsb3VkaW5hcnlKc0xpYjogYW55LCBjb25maWd1cmF0aW9uOiBDbG91ZGluYXJ5Q29uZmlndXJhdGlvbikge1xuICByZXR1cm4geyBwcm92aWRlOiBDbG91ZGluYXJ5LCB1c2VGYWN0b3J5OiAoKSA9PiBuZXcgQ2xvdWRpbmFyeShjbG91ZGluYXJ5SnNMaWIsIGNvbmZpZ3VyYXRpb24pIH07XG59O1xuXG5jb25zdCBpc0Jyb3dzZXIgPSBmdW5jdGlvbiAoKTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJztcbn1cblxuLy8gRm9yIHVuaXQgdGVzdHNcbmV4cG9ydCB7IGlzSnNvbkxpa2VTdHJpbmcsIGlzTmFtZWROb2RlTWFwLCB0cmFuc2Zvcm1LZXlOYW1lcywgbmFtZWROb2RlTWFwVG9PYmplY3QsIGlzQnJvd3NlciB9O1xuIl19