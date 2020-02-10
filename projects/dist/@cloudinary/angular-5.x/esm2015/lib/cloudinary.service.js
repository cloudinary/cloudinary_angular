/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * Returns true if the given string begins with a left curly brace and ends with a right curly brace, e.g.
 * "{asdas d}" will return true, "asdasd}" will return false.
 *
 * this function does not validate the correctness of the string content other than the first and last character
 * \@param str
 * \@return boolean
  @type {?} */
const isJsonLikeString = function (str) {
    // [\s\S] allows the string to contain new lines
    return str && typeof str === 'string' && (str.trim().match(/^{[\s\S]*?}$/) !== null);
};
const ɵ0 = isJsonLikeString;
/** @type {?} */
const isNamedNodeMap = function (obj) {
    return obj && (obj.constructor.name === 'NamedNodeMap' || obj instanceof NamedNodeMap);
};
const ɵ1 = isNamedNodeMap;
/** @type {?} */
const namedNodeMapToObject = function (source) {
    /** @type {?} */
    let target = {};
    Object.keys(source).forEach(index => {
        /** @type {?} */
        const name = source[index].name;
        /** @type {?} */
        const value = source[index].value;
        target[name] = value;
    });
    return target;
};
const ɵ2 = namedNodeMapToObject;
/** @type {?} */
const transformKeyNames = function (obj) {
    /** @type {?} */
    let _obj = obj;
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
        _obj = _obj.map(currentValue => {
            return transformKeyNames(currentValue);
        });
    }
    else if (typeof _obj === 'object') {
        Object.keys(_obj).forEach(key => {
            /** @type {?} */
            const kebabKey = key.replace(/-/g, '_').toLocaleLowerCase().replace(/^cld(-|_)?/, '');
            /** @type {?} */
            const kebabValue = transformKeyNames(_obj[key]);
            delete _obj[key];
            _obj[kebabKey] = kebabValue;
        });
    }
    return _obj;
};
const ɵ3 = transformKeyNames;
export class Cloudinary {
    /**
     * @param {?} cloudinaryJsLib
     * @param {?} configuration
     */
    constructor(cloudinaryJsLib, configuration) {
        // Cloudinary JS already clones the given configuration so no need to clone it here too
        if (cloudinaryJsLib.CloudinaryJQuery) {
            this._cloudinaryInstance = new cloudinaryJsLib.CloudinaryJQuery(configuration);
        }
        else {
            this._cloudinaryInstance = new cloudinaryJsLib.Cloudinary(configuration);
        }
    }
    /**
     * @return {?}
     */
    get cloudinaryInstance() {
        return this._cloudinaryInstance;
    }
    /**
     * @return {?}
     */
    config() {
        return this._cloudinaryInstance.config();
    }
    /**
     * @param {...?} parameters
     * @return {?}
     */
    url(...parameters) {
        return this._cloudinaryInstance.url(...parameters);
    }
    /**
     * @param {...?} parameters
     * @return {?}
     */
    imageTag(...parameters) {
        return this._cloudinaryInstance.imageTag(...parameters);
    }
    /**
     * @param {...?} parameters
     * @return {?}
     */
    videoTag(...parameters) {
        return this._cloudinaryInstance.videoTag(...parameters);
    }
    /**
     * @param {?} img
     * @param {?} options
     * @return {?}
     */
    responsive(img, options) {
        // Cloudinary underlying JS library will handle responsive behavior
        this._cloudinaryInstance.cloudinary_update(img, options);
        this._cloudinaryInstance.responsive(options, false);
    }
    /**
     * Transforms a set of attributes and chained transformations to an options object that can be consumed by Cloudinary JS API
     * @param {?} attributes HTML element attributes
     * @param {?=} childTransformations QueryList with the element's <cl-transformation> children for chained transformations
     * @return {?} An options object that can be consumed by Cloudinary JS API
     */
    toCloudinaryAttributes(attributes, childTransformations) {
        /** @type {?} */
        const options = transformKeyNames(attributes);
        // Add chained transformations
        if (childTransformations && childTransformations.length > 0) {
            options.transformation = [];
            // Support chained transformations
            childTransformations.forEach(transformation => {
                options.transformation.push(this.toCloudinaryAttributes(transformation.getAttributes()));
            });
        }
        // Add responsiveness
        if (options.responsive === '' || options.responsive === 'true' || options.responsive === true) {
            options.responsive = true;
        }
        return options;
    }
    ;
}
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
    return { provide: Cloudinary, useFactory: () => new Cloudinary(cloudinaryJsLib, configuration) };
}
;
/** @type {?} */
const isBrowser = function () {
    return typeof window !== 'undefined';
};
const ɵ4 = isBrowser;
export { isJsonLikeString, isNamedNodeMap, transformKeyNames, namedNodeMapToObject, isBrowser };
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWRpbmFyeS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsb3VkaW5hcnkvYW5ndWxhci01LngvIiwic291cmNlcyI6WyJsaWIvY2xvdWRpbmFyeS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVlBLE1BQU0sZ0JBQWdCLEdBQUcsVUFBVSxHQUFROztJQUV6QyxPQUFPLEdBQUcsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO0NBQ3RGLENBQUM7OztBQUVGLE1BQU0sY0FBYyxHQUFHLFVBQVUsR0FBUTtJQUN2QyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLGNBQWMsSUFBSSxHQUFHLFlBQVksWUFBWSxDQUFDLENBQUM7Q0FDeEYsQ0FBQzs7O0FBRUYsTUFBTSxvQkFBb0IsR0FBRyxVQUFVLE1BQW9COztJQUN6RCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7O1FBQ2xDLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUM7O1FBQ2hDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztLQUN0QixDQUFDLENBQUM7SUFDSCxPQUFPLE1BQU0sQ0FBQztDQUNmLENBQUM7OztBQUVGLE1BQU0saUJBQWlCLEdBQUcsVUFBVSxHQUFROztJQUMxQyxJQUFJLElBQUksR0FBRyxHQUFHLENBQUM7SUFDZixJQUFJLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxFQUFFOzs7UUFH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QUFDLHNCQUFzQixDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDMUYsQ0FBQyxDQUFDO1NBQ0o7O1FBR0QsSUFBSSxPQUFPLENBQUMsVUFBVSxLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsVUFBVSxLQUFLLE1BQU0sSUFBSSxPQUFPLENBQUMsVUFBVSxLQUFLLElBQUksRUFBRTtZQUM3RixPQUFPLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztTQUMzQjtRQUNELE9BQU8sT0FBTyxDQUFDO0tBRWhCO0lBQUEsQ0FBQztDQUNIOzs7Ozs7Ozs7O0FBR0QsTUFBTSw0QkFBNEIsZUFBb0IsRUFBRSxhQUFzQztJQUM1RixPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxVQUFVLENBQUMsZUFBZSxFQUFFLGFBQWEsQ0FBQyxFQUFFLENBQUM7Q0FDbEc7QUFBQSxDQUFDOztBQUVGLE1BQU0sU0FBUyxHQUFHO0lBQ2hCLE9BQU8sT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDO0NBQ3RDLENBQUE7O0FBR0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IENsb3VkaW5hcnlDb25maWd1cmF0aW9uIGZyb20gJy4vY2xvdWRpbmFyeS1jb25maWd1cmF0aW9uLmNsYXNzJztcbmltcG9ydCB7IENsb3VkaW5hcnlUcmFuc2Zvcm1hdGlvbkRpcmVjdGl2ZSB9IGZyb20gJy4vY2xvdWRpbmFyeS10cmFuc2Zvcm1hdGlvbi5kaXJlY3RpdmUnO1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gc3RyaW5nIGJlZ2lucyB3aXRoIGEgbGVmdCBjdXJseSBicmFjZSBhbmQgZW5kcyB3aXRoIGEgcmlnaHQgY3VybHkgYnJhY2UsIGUuZy5cbiAqIFwie2FzZGFzIGR9XCIgd2lsbCByZXR1cm4gdHJ1ZSwgXCJhc2Rhc2R9XCIgd2lsbCByZXR1cm4gZmFsc2UuXG4gKlxuICogdGhpcyBmdW5jdGlvbiBkb2VzIG5vdCB2YWxpZGF0ZSB0aGUgY29ycmVjdG5lc3Mgb2YgdGhlIHN0cmluZyBjb250ZW50IG90aGVyIHRoYW4gdGhlIGZpcnN0IGFuZCBsYXN0IGNoYXJhY3RlclxuICogQHBhcmFtIHN0clxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5jb25zdCBpc0pzb25MaWtlU3RyaW5nID0gZnVuY3Rpb24gKHN0cjogYW55KTogYm9vbGVhbiB7XG4gIC8vIFtcXHNcXFNdIGFsbG93cyB0aGUgc3RyaW5nIHRvIGNvbnRhaW4gbmV3IGxpbmVzXG4gIHJldHVybiBzdHIgJiYgdHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgJiYgKHN0ci50cmltKCkubWF0Y2goL157W1xcc1xcU10qP30kLykgIT09IG51bGwpO1xufTtcblxuY29uc3QgaXNOYW1lZE5vZGVNYXAgPSBmdW5jdGlvbiAob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIG9iaiAmJiAob2JqLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdOYW1lZE5vZGVNYXAnIHx8IG9iaiBpbnN0YW5jZW9mIE5hbWVkTm9kZU1hcCk7XG59O1xuXG5jb25zdCBuYW1lZE5vZGVNYXBUb09iamVjdCA9IGZ1bmN0aW9uIChzb3VyY2U6IE5hbWVkTm9kZU1hcCk6IGFueSB7XG4gIGxldCB0YXJnZXQgPSB7fTtcbiAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGluZGV4ID0+IHtcbiAgICBjb25zdCBuYW1lID0gc291cmNlW2luZGV4XS5uYW1lO1xuICAgIGNvbnN0IHZhbHVlID0gc291cmNlW2luZGV4XS52YWx1ZTtcbiAgICB0YXJnZXRbbmFtZV0gPSB2YWx1ZTtcbiAgfSk7XG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG5jb25zdCB0cmFuc2Zvcm1LZXlOYW1lcyA9IGZ1bmN0aW9uIChvYmo6IGFueSk6IGFueSB7XG4gIGxldCBfb2JqID0gb2JqO1xuICBpZiAoaXNKc29uTGlrZVN0cmluZyhvYmopKSB7XG4gICAgLy8gR2l2ZW4gYXR0cmlidXRlIHZhbHVlIGlzIGluIHRoZSBmb3JtIG9mIGEgSlNPTiBvYmplY3QgLVxuICAgIC8vIFRyYW5zZm9ybXMgdGhlIHN0cmluZyBpbnRvIGFuIG9iamVjdCwgYXMgdGhlIEphdmFzY3JpcHQgQVBJIGV4cGVjdHNcbiAgICBfb2JqID0gSlNPTi5wYXJzZShvYmopO1xuICB9IGVsc2UgaWYgKGlzTmFtZWROb2RlTWFwKG9iaikpIHtcbiAgICBfb2JqID0gbmFtZWROb2RlTWFwVG9PYmplY3Qob2JqKTtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KF9vYmopKSB7XG4gICAgLy8gVHJhbnNmb3JtIGFsbCB0aGUgYXJyYXkgdmFsdWVzIChlLmcuIHRyYW5zZm9ybWF0aW9uIGFycmF5KVxuICAgIF9vYmogPSBfb2JqLm1hcChjdXJyZW50VmFsdWUgPT4ge1xuICAgICAgcmV0dXJuIHRyYW5zZm9ybUtleU5hbWVzKGN1cnJlbnRWYWx1ZSk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIF9vYmogPT09ICdvYmplY3QnKSB7XG4gICAgT2JqZWN0LmtleXMoX29iaikuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgLy8gUmVwbGFjZSB0aGUga2V5IG5hbWUgd2l0aCB0aGUgc25ha2VfY2FzZVxuICAgICAgLy8gVGhlbiBzdHJpcCBjbGQgcHJlZml4IGlmIGl0IGV4aXN0cyAod2l0aCBhbiBvcHRpb25hbCBkYXNoIG9yIHVuZGVyc2NvcmUpXG4gICAgICBjb25zdCBrZWJhYktleSA9IGtleS5yZXBsYWNlKC8tL2csICdfJykudG9Mb2NhbGVMb3dlckNhc2UoKS5yZXBsYWNlKC9eY2xkKC18Xyk/LywgJycpO1xuICAgICAgY29uc3Qga2ViYWJWYWx1ZSA9IHRyYW5zZm9ybUtleU5hbWVzKF9vYmpba2V5XSk7XG4gICAgICBkZWxldGUgX29ialtrZXldO1xuICAgICAgX29ialtrZWJhYktleV0gPSBrZWJhYlZhbHVlO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBfb2JqO1xufTtcblxuZXhwb3J0IGNsYXNzIENsb3VkaW5hcnkge1xuICBfY2xvdWRpbmFyeUluc3RhbmNlOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoY2xvdWRpbmFyeUpzTGliOiBhbnksIGNvbmZpZ3VyYXRpb246IENsb3VkaW5hcnlDb25maWd1cmF0aW9uKSB7XG4gICAgLy8gQ2xvdWRpbmFyeSBKUyBhbHJlYWR5IGNsb25lcyB0aGUgZ2l2ZW4gY29uZmlndXJhdGlvbiBzbyBubyBuZWVkIHRvIGNsb25lIGl0IGhlcmUgdG9vXG4gICAgaWYgKGNsb3VkaW5hcnlKc0xpYi5DbG91ZGluYXJ5SlF1ZXJ5KSB7XG4gICAgICB0aGlzLl9jbG91ZGluYXJ5SW5zdGFuY2UgPSBuZXcgY2xvdWRpbmFyeUpzTGliLkNsb3VkaW5hcnlKUXVlcnkoY29uZmlndXJhdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2Nsb3VkaW5hcnlJbnN0YW5jZSA9IG5ldyBjbG91ZGluYXJ5SnNMaWIuQ2xvdWRpbmFyeShjb25maWd1cmF0aW9uKTtcbiAgICB9XG4gIH1cblxuICBnZXQgY2xvdWRpbmFyeUluc3RhbmNlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2Nsb3VkaW5hcnlJbnN0YW5jZTtcbiAgfVxuXG4gIGNvbmZpZygpIHtcbiAgICByZXR1cm4gdGhpcy5fY2xvdWRpbmFyeUluc3RhbmNlLmNvbmZpZygpO1xuICB9XG5cbiAgdXJsKC4uLnBhcmFtZXRlcnMpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9jbG91ZGluYXJ5SW5zdGFuY2UudXJsKC4uLnBhcmFtZXRlcnMpO1xuICB9XG5cbiAgaW1hZ2VUYWcoLi4ucGFyYW1ldGVycyk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2Nsb3VkaW5hcnlJbnN0YW5jZS5pbWFnZVRhZyguLi5wYXJhbWV0ZXJzKTtcbiAgfVxuXG4gIHZpZGVvVGFnKC4uLnBhcmFtZXRlcnMpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9jbG91ZGluYXJ5SW5zdGFuY2UudmlkZW9UYWcoLi4ucGFyYW1ldGVycyk7XG4gIH1cblxuICByZXNwb25zaXZlKGltZzogSFRNTEltYWdlRWxlbWVudCwgb3B0aW9uczogYW55KTogdm9pZCB7XG4gICAgLy8gQ2xvdWRpbmFyeSB1bmRlcmx5aW5nIEpTIGxpYnJhcnkgd2lsbCBoYW5kbGUgcmVzcG9uc2l2ZSBiZWhhdmlvclxuICAgIHRoaXMuX2Nsb3VkaW5hcnlJbnN0YW5jZS5jbG91ZGluYXJ5X3VwZGF0ZShpbWcsIG9wdGlvbnMpO1xuICAgIHRoaXMuX2Nsb3VkaW5hcnlJbnN0YW5jZS5yZXNwb25zaXZlKG9wdGlvbnMsIGZhbHNlKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFRyYW5zZm9ybXMgYSBzZXQgb2YgYXR0cmlidXRlcyBhbmQgY2hhaW5lZCB0cmFuc2Zvcm1hdGlvbnMgdG8gYW4gb3B0aW9ucyBvYmplY3QgdGhhdCBjYW4gYmUgY29uc3VtZWQgYnkgQ2xvdWRpbmFyeSBKUyBBUElcbiAgICogQHBhcmFtIGF0dHJpYnV0ZXMgSFRNTCBlbGVtZW50IGF0dHJpYnV0ZXNcbiAgICogQHBhcmFtIGNoaWxkVHJhbnNmb3JtYXRpb25zIFF1ZXJ5TGlzdCB3aXRoIHRoZSBlbGVtZW50J3MgPGNsLXRyYW5zZm9ybWF0aW9uPiBjaGlsZHJlbiBmb3IgY2hhaW5lZCB0cmFuc2Zvcm1hdGlvbnNcbiAgICogQHBhcmFtIGNsb3VkaW5hcnkgQ2xvdWRpbmFyeSBzZXJ2aWNlXG4gICAqIEByZXR1cm5zIEFuIG9wdGlvbnMgb2JqZWN0IHRoYXQgY2FuIGJlIGNvbnN1bWVkIGJ5IENsb3VkaW5hcnkgSlMgQVBJXG4gICAqL1xuICB0b0Nsb3VkaW5hcnlBdHRyaWJ1dGVzKGF0dHJpYnV0ZXM6IE5hbWVkTm9kZU1hcCxcbiAgICBjaGlsZFRyYW5zZm9ybWF0aW9ucz86IFF1ZXJ5TGlzdDxDbG91ZGluYXJ5VHJhbnNmb3JtYXRpb25EaXJlY3RpdmU+KTogYW55IHtcbiAgICBjb25zdCBvcHRpb25zID0gdHJhbnNmb3JtS2V5TmFtZXMoYXR0cmlidXRlcyk7XG5cbiAgICAvLyBBZGQgY2hhaW5lZCB0cmFuc2Zvcm1hdGlvbnNcbiAgICBpZiAoY2hpbGRUcmFuc2Zvcm1hdGlvbnMgJiYgY2hpbGRUcmFuc2Zvcm1hdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgb3B0aW9ucy50cmFuc2Zvcm1hdGlvbiA9IFtdO1xuICAgICAgLy8gU3VwcG9ydCBjaGFpbmVkIHRyYW5zZm9ybWF0aW9uc1xuICAgICAgY2hpbGRUcmFuc2Zvcm1hdGlvbnMuZm9yRWFjaCh0cmFuc2Zvcm1hdGlvbiA9PiB7XG4gICAgICAgIG9wdGlvbnMudHJhbnNmb3JtYXRpb24ucHVzaCh0aGlzLnRvQ2xvdWRpbmFyeUF0dHJpYnV0ZXModHJhbnNmb3JtYXRpb24uZ2V0QXR0cmlidXRlcygpKSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2l2ZW5lc3NcbiAgICBpZiAob3B0aW9ucy5yZXNwb25zaXZlID09PSAnJyB8fCBvcHRpb25zLnJlc3BvbnNpdmUgPT09ICd0cnVlJyB8fCBvcHRpb25zLnJlc3BvbnNpdmUgPT09IHRydWUpIHtcbiAgICAgIG9wdGlvbnMucmVzcG9uc2l2ZSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xuXG4gIH07XG59XG5cbi8qIFJldHVybiBhIHByb3ZpZGVyIG9iamVjdCB0aGF0IGNyZWF0ZXMgb3VyIGNvbmZpZ3VyYWJsZSBzZXJ2aWNlICovXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZUNsb3VkaW5hcnkoY2xvdWRpbmFyeUpzTGliOiBhbnksIGNvbmZpZ3VyYXRpb246IENsb3VkaW5hcnlDb25maWd1cmF0aW9uKSB7XG4gIHJldHVybiB7IHByb3ZpZGU6IENsb3VkaW5hcnksIHVzZUZhY3Rvcnk6ICgpID0+IG5ldyBDbG91ZGluYXJ5KGNsb3VkaW5hcnlKc0xpYiwgY29uZmlndXJhdGlvbikgfTtcbn07XG5cbmNvbnN0IGlzQnJvd3NlciA9IGZ1bmN0aW9uICgpOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnO1xufVxuXG4vLyBGb3IgdW5pdCB0ZXN0c1xuZXhwb3J0IHsgaXNKc29uTGlrZVN0cmluZywgaXNOYW1lZE5vZGVNYXAsIHRyYW5zZm9ybUtleU5hbWVzLCBuYW1lZE5vZGVNYXBUb09iamVjdCwgaXNCcm93c2VyIH07XG4iXX0=