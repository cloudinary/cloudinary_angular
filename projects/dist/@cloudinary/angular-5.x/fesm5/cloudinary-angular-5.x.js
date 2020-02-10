import { __spread } from 'tslib';
import { Directive, ElementRef, Component, HostBinding, Input, EventEmitter, Output, ContentChildren, ContentChild, PLATFORM_ID, Inject, Renderer2, NgModule, InjectionToken } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

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
var isJsonLikeString = function (str) {
    // [\s\S] allows the string to contain new lines
    return str && typeof str === 'string' && (str.trim().match(/^{[\s\S]*?}$/) !== null);
};
/** @type {?} */
var isNamedNodeMap = function (obj) {
    return obj && (obj.constructor.name === 'NamedNodeMap' || obj instanceof NamedNodeMap);
};
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
        return (_a = this._cloudinaryInstance).url.apply(_a, __spread(parameters));
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
        return (_a = this._cloudinaryInstance).imageTag.apply(_a, __spread(parameters));
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
        return (_a = this._cloudinaryInstance).videoTag.apply(_a, __spread(parameters));
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
    return Cloudinary;
}());
/**
 * @param {?} cloudinaryJsLib
 * @param {?} configuration
 * @return {?}
 */
function provideCloudinary(cloudinaryJsLib, configuration) {
    return { provide: Cloudinary, useFactory: function () { return new Cloudinary(cloudinaryJsLib, configuration); } };
}
/** @type {?} */
var isBrowser = function () {
    return typeof window !== 'undefined';
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var CloudinaryTransformationDirective = /** @class */ (function () {
    function CloudinaryTransformationDirective(el) {
        this.el = el;
    }
    /**
     * @return {?}
     */
    CloudinaryTransformationDirective.prototype.getAttributes = /**
     * @return {?}
     */
    function () {
        return this.el.nativeElement.attributes;
    };
    CloudinaryTransformationDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'cl-transformation'
                },] },
    ];
    /** @nocollapse */
    CloudinaryTransformationDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    return CloudinaryTransformationDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var CloudinaryImageSourceDirective = /** @class */ (function () {
    function CloudinaryImageSourceDirective(el, cloudinary) {
        this.el = el;
        this.cloudinary = cloudinary;
    }
    /**
     * @return {?}
     */
    CloudinaryImageSourceDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        if (isBrowser()) {
            /** @type {?} */
            var attrName = void 0;
            /** @type {?} */
            var propertyValue = void 0;
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
            var isSvg = false;
            if (this.clHref &&
                toString.call(this.el.nativeElement['href'] === '[object SVGAnimatedString]')) {
                this.el.nativeElement.setAttribute('xlinkHref', 'xlink:href');
                isSvg = true;
            }
            if (!attrName || !propertyValue) {
                throw new Error('Directive value is missing for clHref/clSrc/clSrcset');
            }
            /** @type {?} */
            var nativeElement = this.el.nativeElement;
            /** @type {?} */
            var options = this.cloudinary.toCloudinaryAttributes(nativeElement.attributes, this.transformations);
            /** @type {?} */
            var attrValue = this.cloudinary.url(propertyValue, options);
            this.el.nativeElement.setAttribute(attrName, attrValue);
            /** @type {?} */
            var msie = this.el.nativeElement.ownerDocument.documentMode;
            if (msie && !isSvg) {
                // IE logic here
                this.el.nativeElement[attrName] = attrValue;
            }
        }
    };
    CloudinaryImageSourceDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[clHref], [clSrc], [clSrcset]'
                },] },
    ];
    /** @nocollapse */
    CloudinaryImageSourceDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Cloudinary }
    ]; };
    CloudinaryImageSourceDirective.propDecorators = {
        clHref: [{ type: Input }],
        clSrc: [{ type: Input }],
        clSrcset: [{ type: Input }],
        transformations: [{ type: ContentChildren, args: [CloudinaryTransformationDirective,] }]
    };
    return CloudinaryImageSourceDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var CloudinaryBackgroundImageDirective = /** @class */ (function () {
    function CloudinaryBackgroundImageDirective(renderer, el, cloudinary) {
        this.renderer = renderer;
        this.el = el;
        this.cloudinary = cloudinary;
    }
    /**
     * @return {?}
     */
    CloudinaryBackgroundImageDirective.prototype.isBrowser = /**
     * @return {?}
     */
    function () {
        return typeof window !== 'undefined';
    };
    /**
     * @return {?}
     */
    CloudinaryBackgroundImageDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        if (this.isBrowser()) {
            /** @type {?} */
            var nativeElement = this.el.nativeElement;
            /** @type {?} */
            var options = this.cloudinary.toCloudinaryAttributes(nativeElement.attributes, this.transformations);
            /** @type {?} */
            var imageUrl = this.cloudinary.url(this.clBackgroundImage, options);
            this.renderer.setStyle(nativeElement, 'background-image', "url('" + imageUrl + "')");
            this.renderer.setStyle(nativeElement, 'background-repeat', 'no-repeat');
            this.renderer.setStyle(nativeElement, 'background-position', 'center');
        }
    };
    CloudinaryBackgroundImageDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[clBackgroundImage]'
                },] },
    ];
    /** @nocollapse */
    CloudinaryBackgroundImageDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: Cloudinary }
    ]; };
    CloudinaryBackgroundImageDirective.propDecorators = {
        clBackgroundImage: [{ type: Input }],
        transformations: [{ type: ContentChildren, args: [CloudinaryTransformationDirective,] }]
    };
    return CloudinaryBackgroundImageDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var CLOUDINARY_LIB = new InjectionToken('CLOUDINARY_LIB');
/** @type {?} */
var CLOUDINARY_CONFIGURATION = new InjectionToken('CLOUDINARY_CONFIGURATION');
/**
 * @param {?} cloudinaryJsLib
 * @param {?} configuration
 * @return {?}
 */
function createCloudinary(cloudinaryJsLib, configuration) {
    return new Cloudinary(cloudinaryJsLib, configuration);
}
var CloudinaryModule = /** @class */ (function () {
    function CloudinaryModule() {
    }
    /**
     * @param {?} cloudinaryJsLib
     * @param {?} cloudinaryConfiguration
     * @return {?}
     */
    CloudinaryModule.forRoot = /**
     * @param {?} cloudinaryJsLib
     * @param {?} cloudinaryConfiguration
     * @return {?}
     */
    function (cloudinaryJsLib, cloudinaryConfiguration) {
        return {
            ngModule: CloudinaryModule,
            providers: [
                { provide: CLOUDINARY_LIB, useValue: cloudinaryJsLib },
                { provide: CLOUDINARY_CONFIGURATION, useValue: cloudinaryConfiguration },
                {
                    provide: Cloudinary,
                    useFactory: createCloudinary,
                    deps: [CLOUDINARY_LIB, CLOUDINARY_CONFIGURATION]
                }
            ]
        };
    };
    CloudinaryModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                    ],
                    declarations: [
                        CloudinaryImageSourceDirective,
                        CloudinaryBackgroundImageDirective,
                        CloudinaryImage,
                        CloudinaryVideo,
                        CloudinaryTransformationDirective,
                        LazyLoadDirective,
                        CloudinaryPlaceHolder,
                    ],
                    exports: [
                        CloudinaryImageSourceDirective,
                        CloudinaryBackgroundImageDirective,
                        CloudinaryImage,
                        CloudinaryVideo,
                        CloudinaryTransformationDirective,
                        LazyLoadDirective,
                        CloudinaryPlaceHolder
                    ]
                },] },
    ];
    return CloudinaryModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { provideCloudinary, Cloudinary, isJsonLikeString, isNamedNodeMap, transformKeyNames, namedNodeMapToObject, isBrowser, createCloudinary, CloudinaryImage, CloudinaryVideo, CloudinaryTransformationDirective, CloudinaryImageSourceDirective, CloudinaryBackgroundImageDirective, LazyLoadDirective, CloudinaryPlaceHolder, CLOUDINARY_LIB, CLOUDINARY_CONFIGURATION, CloudinaryModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWRpbmFyeS1hbmd1bGFyLTUueC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGNsb3VkaW5hcnkvYW5ndWxhci01LngvbGliL2Nsb3VkaW5hcnkuc2VydmljZS50cyIsIm5nOi8vQGNsb3VkaW5hcnkvYW5ndWxhci01LngvbGliL2Nsb3VkaW5hcnktdHJhbnNmb3JtYXRpb24uZGlyZWN0aXZlLnRzIiwibmc6Ly9AY2xvdWRpbmFyeS9hbmd1bGFyLTUueC9saWIvY2xvdWRpbmFyeS1wbGFjZWhvbGRlci5jb21wb25lbnQudHMiLCJuZzovL0BjbG91ZGluYXJ5L2FuZ3VsYXItNS54L2xpYi9jbG91ZGluYXJ5LWltYWdlLmNvbXBvbmVudC50cyIsIm5nOi8vQGNsb3VkaW5hcnkvYW5ndWxhci01LngvbGliL2Nsb3VkaW5hcnktdmlkZW8uY29tcG9uZW50LnRzIiwibmc6Ly9AY2xvdWRpbmFyeS9hbmd1bGFyLTUueC9saWIvY2xvdWRpbmFyeS1pbWFnZS1zb3VyY2UuZGlyZWN0aXZlLnRzIiwibmc6Ly9AY2xvdWRpbmFyeS9hbmd1bGFyLTUueC9saWIvY2xvdWRpbmFyeS1iYWNrZ3JvdW5kLWltYWdlLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGNsb3VkaW5hcnkvYW5ndWxhci01LngvbGliL2Nsb3VkaW5hcnktbGF6eS1sb2FkLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGNsb3VkaW5hcnkvYW5ndWxhci01LngvbGliL2Nsb3VkaW5hcnkubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IENsb3VkaW5hcnlDb25maWd1cmF0aW9uIGZyb20gJy4vY2xvdWRpbmFyeS1jb25maWd1cmF0aW9uLmNsYXNzJztcbmltcG9ydCB7IENsb3VkaW5hcnlUcmFuc2Zvcm1hdGlvbkRpcmVjdGl2ZSB9IGZyb20gJy4vY2xvdWRpbmFyeS10cmFuc2Zvcm1hdGlvbi5kaXJlY3RpdmUnO1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gc3RyaW5nIGJlZ2lucyB3aXRoIGEgbGVmdCBjdXJseSBicmFjZSBhbmQgZW5kcyB3aXRoIGEgcmlnaHQgY3VybHkgYnJhY2UsIGUuZy5cbiAqIFwie2FzZGFzIGR9XCIgd2lsbCByZXR1cm4gdHJ1ZSwgXCJhc2Rhc2R9XCIgd2lsbCByZXR1cm4gZmFsc2UuXG4gKlxuICogdGhpcyBmdW5jdGlvbiBkb2VzIG5vdCB2YWxpZGF0ZSB0aGUgY29ycmVjdG5lc3Mgb2YgdGhlIHN0cmluZyBjb250ZW50IG90aGVyIHRoYW4gdGhlIGZpcnN0IGFuZCBsYXN0IGNoYXJhY3RlclxuICogQHBhcmFtIHN0clxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5jb25zdCBpc0pzb25MaWtlU3RyaW5nID0gZnVuY3Rpb24gKHN0cjogYW55KTogYm9vbGVhbiB7XG4gIC8vIFtcXHNcXFNdIGFsbG93cyB0aGUgc3RyaW5nIHRvIGNvbnRhaW4gbmV3IGxpbmVzXG4gIHJldHVybiBzdHIgJiYgdHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgJiYgKHN0ci50cmltKCkubWF0Y2goL157W1xcc1xcU10qP30kLykgIT09IG51bGwpO1xufTtcblxuY29uc3QgaXNOYW1lZE5vZGVNYXAgPSBmdW5jdGlvbiAob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIG9iaiAmJiAob2JqLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdOYW1lZE5vZGVNYXAnIHx8IG9iaiBpbnN0YW5jZW9mIE5hbWVkTm9kZU1hcCk7XG59O1xuXG5jb25zdCBuYW1lZE5vZGVNYXBUb09iamVjdCA9IGZ1bmN0aW9uIChzb3VyY2U6IE5hbWVkTm9kZU1hcCk6IGFueSB7XG4gIGxldCB0YXJnZXQgPSB7fTtcbiAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGluZGV4ID0+IHtcbiAgICBjb25zdCBuYW1lID0gc291cmNlW2luZGV4XS5uYW1lO1xuICAgIGNvbnN0IHZhbHVlID0gc291cmNlW2luZGV4XS52YWx1ZTtcbiAgICB0YXJnZXRbbmFtZV0gPSB2YWx1ZTtcbiAgfSk7XG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG5jb25zdCB0cmFuc2Zvcm1LZXlOYW1lcyA9IGZ1bmN0aW9uIChvYmo6IGFueSk6IGFueSB7XG4gIGxldCBfb2JqID0gb2JqO1xuICBpZiAoaXNKc29uTGlrZVN0cmluZyhvYmopKSB7XG4gICAgLy8gR2l2ZW4gYXR0cmlidXRlIHZhbHVlIGlzIGluIHRoZSBmb3JtIG9mIGEgSlNPTiBvYmplY3QgLVxuICAgIC8vIFRyYW5zZm9ybXMgdGhlIHN0cmluZyBpbnRvIGFuIG9iamVjdCwgYXMgdGhlIEphdmFzY3JpcHQgQVBJIGV4cGVjdHNcbiAgICBfb2JqID0gSlNPTi5wYXJzZShvYmopO1xuICB9IGVsc2UgaWYgKGlzTmFtZWROb2RlTWFwKG9iaikpIHtcbiAgICBfb2JqID0gbmFtZWROb2RlTWFwVG9PYmplY3Qob2JqKTtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KF9vYmopKSB7XG4gICAgLy8gVHJhbnNmb3JtIGFsbCB0aGUgYXJyYXkgdmFsdWVzIChlLmcuIHRyYW5zZm9ybWF0aW9uIGFycmF5KVxuICAgIF9vYmogPSBfb2JqLm1hcChjdXJyZW50VmFsdWUgPT4ge1xuICAgICAgcmV0dXJuIHRyYW5zZm9ybUtleU5hbWVzKGN1cnJlbnRWYWx1ZSk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIF9vYmogPT09ICdvYmplY3QnKSB7XG4gICAgT2JqZWN0LmtleXMoX29iaikuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgLy8gUmVwbGFjZSB0aGUga2V5IG5hbWUgd2l0aCB0aGUgc25ha2VfY2FzZVxuICAgICAgLy8gVGhlbiBzdHJpcCBjbGQgcHJlZml4IGlmIGl0IGV4aXN0cyAod2l0aCBhbiBvcHRpb25hbCBkYXNoIG9yIHVuZGVyc2NvcmUpXG4gICAgICBjb25zdCBrZWJhYktleSA9IGtleS5yZXBsYWNlKC8tL2csICdfJykudG9Mb2NhbGVMb3dlckNhc2UoKS5yZXBsYWNlKC9eY2xkKC18Xyk/LywgJycpO1xuICAgICAgY29uc3Qga2ViYWJWYWx1ZSA9IHRyYW5zZm9ybUtleU5hbWVzKF9vYmpba2V5XSk7XG4gICAgICBkZWxldGUgX29ialtrZXldO1xuICAgICAgX29ialtrZWJhYktleV0gPSBrZWJhYlZhbHVlO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBfb2JqO1xufTtcblxuZXhwb3J0IGNsYXNzIENsb3VkaW5hcnkge1xuICBfY2xvdWRpbmFyeUluc3RhbmNlOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoY2xvdWRpbmFyeUpzTGliOiBhbnksIGNvbmZpZ3VyYXRpb246IENsb3VkaW5hcnlDb25maWd1cmF0aW9uKSB7XG4gICAgLy8gQ2xvdWRpbmFyeSBKUyBhbHJlYWR5IGNsb25lcyB0aGUgZ2l2ZW4gY29uZmlndXJhdGlvbiBzbyBubyBuZWVkIHRvIGNsb25lIGl0IGhlcmUgdG9vXG4gICAgaWYgKGNsb3VkaW5hcnlKc0xpYi5DbG91ZGluYXJ5SlF1ZXJ5KSB7XG4gICAgICB0aGlzLl9jbG91ZGluYXJ5SW5zdGFuY2UgPSBuZXcgY2xvdWRpbmFyeUpzTGliLkNsb3VkaW5hcnlKUXVlcnkoY29uZmlndXJhdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2Nsb3VkaW5hcnlJbnN0YW5jZSA9IG5ldyBjbG91ZGluYXJ5SnNMaWIuQ2xvdWRpbmFyeShjb25maWd1cmF0aW9uKTtcbiAgICB9XG4gIH1cblxuICBnZXQgY2xvdWRpbmFyeUluc3RhbmNlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2Nsb3VkaW5hcnlJbnN0YW5jZTtcbiAgfVxuXG4gIGNvbmZpZygpIHtcbiAgICByZXR1cm4gdGhpcy5fY2xvdWRpbmFyeUluc3RhbmNlLmNvbmZpZygpO1xuICB9XG5cbiAgdXJsKC4uLnBhcmFtZXRlcnMpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9jbG91ZGluYXJ5SW5zdGFuY2UudXJsKC4uLnBhcmFtZXRlcnMpO1xuICB9XG5cbiAgaW1hZ2VUYWcoLi4ucGFyYW1ldGVycyk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2Nsb3VkaW5hcnlJbnN0YW5jZS5pbWFnZVRhZyguLi5wYXJhbWV0ZXJzKTtcbiAgfVxuXG4gIHZpZGVvVGFnKC4uLnBhcmFtZXRlcnMpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9jbG91ZGluYXJ5SW5zdGFuY2UudmlkZW9UYWcoLi4ucGFyYW1ldGVycyk7XG4gIH1cblxuICByZXNwb25zaXZlKGltZzogSFRNTEltYWdlRWxlbWVudCwgb3B0aW9uczogYW55KTogdm9pZCB7XG4gICAgLy8gQ2xvdWRpbmFyeSB1bmRlcmx5aW5nIEpTIGxpYnJhcnkgd2lsbCBoYW5kbGUgcmVzcG9uc2l2ZSBiZWhhdmlvclxuICAgIHRoaXMuX2Nsb3VkaW5hcnlJbnN0YW5jZS5jbG91ZGluYXJ5X3VwZGF0ZShpbWcsIG9wdGlvbnMpO1xuICAgIHRoaXMuX2Nsb3VkaW5hcnlJbnN0YW5jZS5yZXNwb25zaXZlKG9wdGlvbnMsIGZhbHNlKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFRyYW5zZm9ybXMgYSBzZXQgb2YgYXR0cmlidXRlcyBhbmQgY2hhaW5lZCB0cmFuc2Zvcm1hdGlvbnMgdG8gYW4gb3B0aW9ucyBvYmplY3QgdGhhdCBjYW4gYmUgY29uc3VtZWQgYnkgQ2xvdWRpbmFyeSBKUyBBUElcbiAgICogQHBhcmFtIGF0dHJpYnV0ZXMgSFRNTCBlbGVtZW50IGF0dHJpYnV0ZXNcbiAgICogQHBhcmFtIGNoaWxkVHJhbnNmb3JtYXRpb25zIFF1ZXJ5TGlzdCB3aXRoIHRoZSBlbGVtZW50J3MgPGNsLXRyYW5zZm9ybWF0aW9uPiBjaGlsZHJlbiBmb3IgY2hhaW5lZCB0cmFuc2Zvcm1hdGlvbnNcbiAgICogQHBhcmFtIGNsb3VkaW5hcnkgQ2xvdWRpbmFyeSBzZXJ2aWNlXG4gICAqIEByZXR1cm5zIEFuIG9wdGlvbnMgb2JqZWN0IHRoYXQgY2FuIGJlIGNvbnN1bWVkIGJ5IENsb3VkaW5hcnkgSlMgQVBJXG4gICAqL1xuICB0b0Nsb3VkaW5hcnlBdHRyaWJ1dGVzKGF0dHJpYnV0ZXM6IE5hbWVkTm9kZU1hcCxcbiAgICBjaGlsZFRyYW5zZm9ybWF0aW9ucz86IFF1ZXJ5TGlzdDxDbG91ZGluYXJ5VHJhbnNmb3JtYXRpb25EaXJlY3RpdmU+KTogYW55IHtcbiAgICBjb25zdCBvcHRpb25zID0gdHJhbnNmb3JtS2V5TmFtZXMoYXR0cmlidXRlcyk7XG5cbiAgICAvLyBBZGQgY2hhaW5lZCB0cmFuc2Zvcm1hdGlvbnNcbiAgICBpZiAoY2hpbGRUcmFuc2Zvcm1hdGlvbnMgJiYgY2hpbGRUcmFuc2Zvcm1hdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgb3B0aW9ucy50cmFuc2Zvcm1hdGlvbiA9IFtdO1xuICAgICAgLy8gU3VwcG9ydCBjaGFpbmVkIHRyYW5zZm9ybWF0aW9uc1xuICAgICAgY2hpbGRUcmFuc2Zvcm1hdGlvbnMuZm9yRWFjaCh0cmFuc2Zvcm1hdGlvbiA9PiB7XG4gICAgICAgIG9wdGlvbnMudHJhbnNmb3JtYXRpb24ucHVzaCh0aGlzLnRvQ2xvdWRpbmFyeUF0dHJpYnV0ZXModHJhbnNmb3JtYXRpb24uZ2V0QXR0cmlidXRlcygpKSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2l2ZW5lc3NcbiAgICBpZiAob3B0aW9ucy5yZXNwb25zaXZlID09PSAnJyB8fCBvcHRpb25zLnJlc3BvbnNpdmUgPT09ICd0cnVlJyB8fCBvcHRpb25zLnJlc3BvbnNpdmUgPT09IHRydWUpIHtcbiAgICAgIG9wdGlvbnMucmVzcG9uc2l2ZSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xuXG4gIH07XG59XG5cbi8qIFJldHVybiBhIHByb3ZpZGVyIG9iamVjdCB0aGF0IGNyZWF0ZXMgb3VyIGNvbmZpZ3VyYWJsZSBzZXJ2aWNlICovXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZUNsb3VkaW5hcnkoY2xvdWRpbmFyeUpzTGliOiBhbnksIGNvbmZpZ3VyYXRpb246IENsb3VkaW5hcnlDb25maWd1cmF0aW9uKSB7XG4gIHJldHVybiB7IHByb3ZpZGU6IENsb3VkaW5hcnksIHVzZUZhY3Rvcnk6ICgpID0+IG5ldyBDbG91ZGluYXJ5KGNsb3VkaW5hcnlKc0xpYiwgY29uZmlndXJhdGlvbikgfTtcbn07XG5cbmNvbnN0IGlzQnJvd3NlciA9IGZ1bmN0aW9uICgpOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnO1xufVxuXG4vLyBGb3IgdW5pdCB0ZXN0c1xuZXhwb3J0IHsgaXNKc29uTGlrZVN0cmluZywgaXNOYW1lZE5vZGVNYXAsIHRyYW5zZm9ybUtleU5hbWVzLCBuYW1lZE5vZGVNYXBUb09iamVjdCwgaXNCcm93c2VyIH07XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnY2wtdHJhbnNmb3JtYXRpb24nXG59KVxuZXhwb3J0IGNsYXNzIENsb3VkaW5hcnlUcmFuc2Zvcm1hdGlvbkRpcmVjdGl2ZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikge1xuICB9XG5cbiAgZ2V0QXR0cmlidXRlcygpOiBOYW1lZE5vZGVNYXAge1xuICAgIHJldHVybiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYXR0cmlidXRlcztcbiAgfVxufVxuXG4iLCJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICBDb21wb25lbnQsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Nsb3VkaW5hcnl9IGZyb20gJy4vY2xvdWRpbmFyeS5zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ2NsLXBsYWNlaG9sZGVyJyxcbiAgdGVtcGxhdGU6IGA8aW1nIFtzcmNdPVwidGhpcy5wbGFjZWhvbGRlckltZ1wiIFtzdHlsZS53aWR0aC5weF09XCJ0aGlzLml0ZW1XaWR0aFwiIFtzdHlsZS5oZWlnaHQucHhdPVwidGhpcy5pdGVtSGVpZ2h0XCI+YFxuICAsXG59KVxuZXhwb3J0IGNsYXNzIENsb3VkaW5hcnlQbGFjZUhvbGRlciBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQge1xuICBASW5wdXQoJ3R5cGUnKSB0eXBlOiBzdHJpbmc7XG4gIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgnKSBpdGVtV2lkdGg7XG4gIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0JykgaXRlbUhlaWdodDtcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnB1YmxpYy1pZCcpIHB1YmxpY0lkO1xuXG4gIG9wdGlvbnM6IG9iamVjdCA9IHt9O1xuICBwbGFjZWhvbGRlckltZzogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2xvdWRpbmFyeTogQ2xvdWRpbmFyeSkge31cblxuICBzZXRXaWR0aCh3aWR0aCkge1xuICAgIHRoaXMuaXRlbVdpZHRoID0gd2lkdGg7XG4gIH1cblxuICBzZXRIZWlnaHQoaGVpZ2h0KSB7XG4gICAgdGhpcy5pdGVtSGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgc2V0UHVibGljSWQoaWQpIHtcbiAgICB0aGlzLnB1YmxpY0lkID0gaWQ7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgdGhpcy5wbGFjZWhvbGRlckltZyA9IHRoaXMuZ2V0UGxhY2Vob2xkZXJJbWFnZSgpO1xuICB9XG5cbiAgZ2V0UGxhY2Vob2xkZXJJbWFnZSgpIHtcbiAgICBjb25zdCBwbGFjZWhvbGRlckltYWdlT3B0aW9ucyA9IHtcbiAgICAgICd2ZWN0b3JpemUnOiB7ZWZmZWN0OiAndmVjdG9yaXplJywgcXVhbGl0eTogMX0sXG4gICAgICAncGl4ZWxhdGUnOiB7ZWZmZWN0OiAncGl4ZWxhdGUnLCBxdWFsaXR5OiAxLCBmZXRjaF9mb3JtYXQ6ICdhdXRvJ30sXG4gICAgICAnYmx1cic6IHtlZmZlY3Q6ICdibHVyOjIwMDAnLCBxdWFsaXR5OiAxLCBmZXRjaF9mb3JtYXQ6ICdhdXRvJ30sXG4gICAgICAnc29saWQnOiBbXG4gICAgICAgIHt3aWR0aDogJ2l3X2Rpdl8yJywgYXNwZWN0X3JhdGlvOiAxLCBjcm9wOiAncGFkJywgYmFja2dyb3VuZDogJ2F1dG8nfSxcbiAgICAgICAge2Nyb3A6ICdjcm9wJywgd2lkdGg6IDEwLCBoZWlnaHQ6IDEwLCBncmF2aXR5OiAnbm9ydGhfZWFzdCd9LFxuICAgICAgICB7d2lkdGg6ICdpdycsIGhlaWdodDogJ2loJywgY3JvcDogJ2ZpbGwnfSxcbiAgICAgICAge2ZldGNoX2Zvcm1hdDogJ2F1dG8nLCBxdWFsaXR5OiAnYXV0byd9XVxuICAgIH1cbiAgICBjb25zdCB0cmFuc2Zvcm1hdGlvbiA9IFtdLmNvbmNhdC5hcHBseShbXSwgW3RoaXMub3B0aW9ucywgcGxhY2Vob2xkZXJJbWFnZU9wdGlvbnNbdGhpcy50eXBlXSB8fCBwbGFjZWhvbGRlckltYWdlT3B0aW9uc1snYmx1ciddXSk7XG4gICAgY29uc3QgdGVzdCA9IHRoaXMuY2xvdWRpbmFyeS51cmwodGhpcy5wdWJsaWNJZCwge3RyYW5zZm9ybWF0aW9uOiB0cmFuc2Zvcm1hdGlvbn0pO1xuXG4gICAgcmV0dXJuIHRlc3Q7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIFF1ZXJ5TGlzdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgT25Jbml0LFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgQ29udGVudENoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENsb3VkaW5hcnkgfSBmcm9tICcuL2Nsb3VkaW5hcnkuc2VydmljZSc7XG5pbXBvcnQgeyBDbG91ZGluYXJ5VHJhbnNmb3JtYXRpb25EaXJlY3RpdmUgfSBmcm9tICcuL2Nsb3VkaW5hcnktdHJhbnNmb3JtYXRpb24uZGlyZWN0aXZlJztcbmltcG9ydCB7IENsb3VkaW5hcnlQbGFjZUhvbGRlciB9IGZyb20gJy4vY2xvdWRpbmFyeS1wbGFjZWhvbGRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgaXNCcm93c2VyIH0gZnJvbSAnLi9jbG91ZGluYXJ5LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbC1pbWFnZScsXG4gIHRlbXBsYXRlOiBgPGltZyBbbmdTdHlsZV09XCJ7b3BhY2l0eTogc2hvdWxkU2hvd1BsYWNlSG9sZGVyID8gJzAnIDogJzEnLCBwb3NpdGlvbjogc2hvdWxkU2hvd1BsYWNlSG9sZGVyID8gJ2Fic29sdXRlJyA6ICd1bnNldCd9XCIobG9hZCk9XCJoYXNMb2FkZWQoKVwiPlxuICA8ZGl2IFtzdHlsZS5kaXNwbGF5XT1cInNob3VsZFNob3dQbGFjZUhvbGRlciA/ICdpbmxpbmUnIDogJ25vbmUnXCI+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBDbG91ZGluYXJ5SW1hZ2VcbiAgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkluaXQsIEFmdGVyVmlld0luaXQsIEFmdGVyQ29udGVudENoZWNrZWQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgQElucHV0KCdwdWJsaWMtaWQnKSBwdWJsaWNJZDogc3RyaW5nO1xuICBASW5wdXQoJ2NsaWVudC1oaW50cycpIGNsaWVudEhpbnRzPzogYm9vbGVhbjtcbiAgQElucHV0KCdsb2FkaW5nJykgbG9hZGluZzogc3RyaW5nO1xuICBASW5wdXQoJ3dpZHRoJykgd2lkdGg/OiBzdHJpbmc7XG4gIEBJbnB1dCgnaGVpZ2h0JykgaGVpZ2h0Pzogc3RyaW5nO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oQ2xvdWRpbmFyeVRyYW5zZm9ybWF0aW9uRGlyZWN0aXZlKVxuICB0cmFuc2Zvcm1hdGlvbnM6IFF1ZXJ5TGlzdDxDbG91ZGluYXJ5VHJhbnNmb3JtYXRpb25EaXJlY3RpdmU+O1xuICBAQ29udGVudENoaWxkKENsb3VkaW5hcnlQbGFjZUhvbGRlcikgcGxhY2Vob2xkZXJDb21wb25lbnQ6IENsb3VkaW5hcnlQbGFjZUhvbGRlcjtcblxuICBAT3V0cHV0KCkgb25Mb2FkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7IC8vIENhbGxiYWNrIHdoZW4gYW4gaW1hZ2UgaXMgbG9hZGVkIHN1Y2Nlc3NmdWxseVxuICBAT3V0cHV0KCkgb25FcnJvcjogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpOyAvLyBDYWxsYmFjayB3aGVuIGFuIGltYWdlIGlzIGxvYWRlZCB3aXRoIGVycm9yXG5cbiAgb2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXI7XG4gIHNob3VsZFNob3dQbGFjZUhvbGRlciA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBjbG91ZGluYXJ5OiBDbG91ZGluYXJ5KSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmIChpc0Jyb3dzZXIoKSkge1xuICAgICAgLy8gQ3JlYXRlIGFuIG9ic2VydmVyIGluc3RhbmNlXG4gICAgICB0aGlzLm9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICB0aGlzLmxvYWRJbWFnZSgpO1xuICAgICAgfSk7XG4gICAgICAvLyBPYnNlcnZlIGNoYW5nZXMgdG8gYXR0cmlidXRlcyBvciBjaGlsZCB0cmFuc2Zvcm1hdGlvbnMgdG8gcmUtcmVuZGVyIHRoZSBpbWFnZVxuICAgICAgY29uc3QgY29uZmlnID0geyBhdHRyaWJ1dGVzOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUgfTtcblxuICAgICAgLy8gcGFzcyBpbiB0aGUgdGFyZ2V0IG5vZGUsIGFzIHdlbGwgYXMgdGhlIG9ic2VydmVyIG9wdGlvbnNcbiAgICAgIHRoaXMub2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIGNvbmZpZyk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIC8vIExpc3RlbiB0byBjaGFuZ2VzIG9uIHRoZSBkYXRhLWJvdW5kIHByb3BlcnR5ICdwdWJsaWNJZCcuXG4gICAgLy8gVXBkYXRlIGNvbXBvbmVudCB1bmxlc3MgdGhpcyBpcyB0aGUgZmlyc3QgdmFsdWUgYXNzaWduZWQuXG4gICAgaWYgKGNoYW5nZXMucHVibGljSWQgJiYgIWNoYW5nZXMucHVibGljSWQuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLmxvYWRJbWFnZSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9ic2VydmVyICYmIHRoaXMub2JzZXJ2ZXIuZGlzY29ubmVjdCkge1xuICAgICAgdGhpcy5vYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMubG9hZEltYWdlKCk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgaWYgKHRoaXMud2lkdGggJiYgdGhpcy5wbGFjZWhvbGRlckNvbXBvbmVudCkge1xuICAgICAgdGhpcy5wbGFjZWhvbGRlckNvbXBvbmVudC5zZXRXaWR0aCh0aGlzLndpZHRoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaGVpZ2h0ICYmIHRoaXMucGxhY2Vob2xkZXJDb21wb25lbnQpIHtcbiAgICAgIHRoaXMucGxhY2Vob2xkZXJDb21wb25lbnQuc2V0SGVpZ2h0KHRoaXMuaGVpZ2h0KTtcbiAgICB9XG4gICAgaWYgKHRoaXMucGxhY2Vob2xkZXJDb21wb25lbnQpIHtcbiAgICAgIHRoaXMucGxhY2Vob2xkZXJDb21wb25lbnQuc2V0UHVibGljSWQodGhpcy5wdWJsaWNJZCk7XG4gICAgfVxuICB9XG5cbiAgaGFzTG9hZGVkKCkge1xuICAgIHRoaXMuc2hvdWxkU2hvd1BsYWNlSG9sZGVyID0gZmFsc2U7XG4gIH1cblxuICBsb2FkSW1hZ2UoKSB7XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvdW5pdmVyc2FsI3VuaXZlcnNhbC1nb3RjaGFzXG4gICAgLy8gRmV0Y2ggdGhlIGltYWdlIG9ubHkgZm9yIGNsaWVudCBzaWRlIHJlbmRlcmluZyBieSB0aGUgYnJvd3NlclxuICAgIGlmIChpc0Jyb3dzZXIoKSkge1xuICAgICAgaWYgKCF0aGlzLnB1YmxpY0lkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnWW91IG11c3Qgc2V0IHRoZSBwdWJsaWMgaWQgb2YgdGhlIGltYWdlIHRvIGxvYWQsIGUuZy4gPGNsLWltYWdlIHB1YmxpYy1pZD17e3Bob3RvLnB1YmxpY19pZH19Li4uPjwvY2wtaW1hZ2U+J1xuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcbiAgICAgIGNvbnN0IGltYWdlID0gbmF0aXZlRWxlbWVudC5jaGlsZHJlblswXTtcbiAgICAgIC8vIEFkZCBvbmxvYWQgYW5kIG9uZXJyb3IgaGFuZGxlcnNcbiAgICAgIGltYWdlLm9ubG9hZCA9IGUgPT4ge1xuICAgICAgICB0aGlzLm9uTG9hZC5lbWl0KGUpO1xuICAgICAgfTtcbiAgICAgIGltYWdlLm9uZXJyb3IgPSBlID0+IHtcbiAgICAgICAgdGhpcy5vbkVycm9yLmVtaXQoZSk7XG4gICAgICB9O1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuY2xvdWRpbmFyeS50b0Nsb3VkaW5hcnlBdHRyaWJ1dGVzKFxuICAgICAgICBuYXRpdmVFbGVtZW50LmF0dHJpYnV0ZXMsXG4gICAgICAgIHRoaXMudHJhbnNmb3JtYXRpb25zXG4gICAgICApO1xuICAgICAgaWYgKHRoaXMuY2xpZW50SGludHMgfHwgKHR5cGVvZiB0aGlzLmNsaWVudEhpbnRzID09PSAndW5kZWZpbmVkJyAmJiB0aGlzLmNsb3VkaW5hcnkuY29uZmlnKCkuY2xpZW50X2hpbnRzKSkge1xuICAgICAgICBkZWxldGUgb3B0aW9uc1snY2xhc3MnXTtcbiAgICAgICAgZGVsZXRlIG9wdGlvbnNbJ2RhdGEtc3JjJ107XG4gICAgICAgIGRlbGV0ZSBvcHRpb25zWydyZXNwb25zaXZlJ107XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5wbGFjZWhvbGRlckNvbXBvbmVudCkge1xuICAgICAgICB0aGlzLnBsYWNlaG9sZGVySGFuZGxlcihvcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGltYWdlVGFnID0gdGhpcy5jbG91ZGluYXJ5LmltYWdlVGFnKHRoaXMucHVibGljSWQsIG9wdGlvbnMpO1xuXG4gICAgICB0aGlzLnNldEVsZW1lbnRBdHRyaWJ1dGVzKGltYWdlLCBpbWFnZVRhZy5hdHRyaWJ1dGVzKCkpO1xuICAgICAgaWYgKG9wdGlvbnMucmVzcG9uc2l2ZSkge1xuICAgICAgICB0aGlzLmNsb3VkaW5hcnkucmVzcG9uc2l2ZShpbWFnZSwgb3B0aW9ucyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0RWxlbWVudEF0dHJpYnV0ZXMoZWxlbWVudCwgYXR0cmlidXRlc0xpdGVyYWwpIHtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzTGl0ZXJhbCkuZm9yRWFjaChhdHRyTmFtZSA9PiB7XG4gICAgICBjb25zdCBhdHRyID0gYXR0ck5hbWUgPT09ICdzcmMnICYmIHRoaXMubG9hZGluZyA9PT0gJ2xhenknID8gJ2RhdGEtc3JjJyA6IGF0dHJOYW1lO1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0ciwgYXR0cmlidXRlc0xpdGVyYWxbYXR0ck5hbWVdKTtcbiAgICB9KTtcbiAgfVxuXG4gIHBsYWNlaG9sZGVySGFuZGxlcihvcHRpb25zKSB7XG4gICAgY29uc3QgcGxhY2Vob2xkZXJPcHRpb25zID0ge307XG5cbiAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgcGxhY2Vob2xkZXJPcHRpb25zW25hbWVdID0gKG5hbWUgPT09ICd3aWR0aCcgJiYgIW9wdGlvbnNbbmFtZV0uc3RhcnRzV2l0aCgnYXV0bycpIHx8IG5hbWUgPT09ICdoZWlnaHQnKSA/IE1hdGguZmxvb3IocGFyc2VJbnQob3B0aW9uc1tuYW1lXSwgMTApICogMC4xKSA6IG9wdGlvbnNbbmFtZV07XG4gICAgfSk7XG4gICAgdGhpcy5wbGFjZWhvbGRlckNvbXBvbmVudC5vcHRpb25zID0gcGxhY2Vob2xkZXJPcHRpb25zO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIFF1ZXJ5TGlzdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgT25Jbml0LFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgUExBVEZPUk1fSUQsXG4gIEluamVjdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDbG91ZGluYXJ5IH0gZnJvbSAnLi9jbG91ZGluYXJ5LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xvdWRpbmFyeVRyYW5zZm9ybWF0aW9uRGlyZWN0aXZlIH0gZnJvbSAnLi9jbG91ZGluYXJ5LXRyYW5zZm9ybWF0aW9uLmRpcmVjdGl2ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NsLXZpZGVvJyxcbiAgdGVtcGxhdGU6ICc8dmlkZW8+PC92aWRlbz4nXG59KVxuLy8gU2VlIGFsc28gdmlkZW8gcmVmZXJlbmNlIC0gaHR0cDovL2Nsb3VkaW5hcnkuY29tL2RvY3VtZW50YXRpb24vdmlkZW9fbWFuaXB1bGF0aW9uX2FuZF9kZWxpdmVyeSN2aWRlb190cmFuc2Zvcm1hdGlvbnNfcmVmZXJlbmNlXG5leHBvcnQgY2xhc3MgQ2xvdWRpbmFyeVZpZGVvXG4gIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgncHVibGljLWlkJykgcHVibGljSWQ6IHN0cmluZztcblxuICBAQ29udGVudENoaWxkcmVuKENsb3VkaW5hcnlUcmFuc2Zvcm1hdGlvbkRpcmVjdGl2ZSlcbiAgdHJhbnNmb3JtYXRpb25zOiBRdWVyeUxpc3Q8Q2xvdWRpbmFyeVRyYW5zZm9ybWF0aW9uRGlyZWN0aXZlPjtcblxuICBvYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlcjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIGNsb3VkaW5hcnk6IENsb3VkaW5hcnksIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0KSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0eXBlb2YgTXV0YXRpb25PYnNlcnZlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIENyZWF0ZSBhbiBvYnNlcnZlciBpbnN0YW5jZVxuICAgICAgdGhpcy5vYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgdGhpcy5sb2FkVmlkZW8odGhpcy5wdWJsaWNJZCk7XG4gICAgICB9KTtcbiAgICAgIC8vIE9ic2VydmUgY2hhbmdlcyB0byBhdHRyaWJ1dGVzIG9yIGNoaWxkIHRyYW5zZm9ybWF0aW9ucyB0byByZS1yZW5kZXIgdGhlIGltYWdlXG4gICAgICBjb25zdCBjb25maWcgPSB7IGF0dHJpYnV0ZXM6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZSB9O1xuXG4gICAgICAvLyBwYXNzIGluIHRoZSB0YXJnZXQgbm9kZSwgYXMgd2VsbCBhcyB0aGUgb2JzZXJ2ZXIgb3B0aW9uc1xuICAgICAgdGhpcy5vYnNlcnZlci5vYnNlcnZlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgY29uZmlnKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgLy8gTGlzdGVuIHRvIGNoYW5nZXMgb24gdGhlIGRhdGEtYm91bmQgcHJvcGVydHkgJ3B1YmxpY0lkJy5cbiAgICAvLyBVcGRhdGUgY29tcG9uZW50IHVubGVzcyB0aGlzIGlzIHRoZSBmaXJzdCB2YWx1ZSBhc3NpZ25lZC5cbiAgICBpZiAoY2hhbmdlcy5wdWJsaWNJZCAmJiAhY2hhbmdlcy5wdWJsaWNJZC5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMubG9hZFZpZGVvKGNoYW5nZXMucHVibGljSWQuY3VycmVudFZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vYnNlcnZlciAmJiB0aGlzLm9ic2VydmVyLmRpc2Nvbm5lY3QpIHtcbiAgICAgIHRoaXMub2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBpZiAoIXRoaXMucHVibGljSWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1lvdSBtdXN0IHNldCB0aGUgcHVibGljIGlkIG9mIHRoZSB2aWRlbyB0byBsb2FkLCBlLmcuIDxjbC12aWRlbyBwdWJsaWMtaWQ9e3t2aWRlby5wdWJsaWNfaWR9fS4uLj48L2NsLXZpZGVvPidcbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMubG9hZFZpZGVvKHRoaXMucHVibGljSWQpO1xuICB9XG5cbiAgbG9hZFZpZGVvKHB1YmxpY0lkOiBzdHJpbmcpIHtcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci91bml2ZXJzYWwjdW5pdmVyc2FsLWdvdGNoYXNcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcbiAgICAgIGNvbnN0IHZpZGVvID0gbmF0aXZlRWxlbWVudC5jaGlsZHJlblswXTtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmNsb3VkaW5hcnkudG9DbG91ZGluYXJ5QXR0cmlidXRlcyhcbiAgICAgICAgbmF0aXZlRWxlbWVudC5hdHRyaWJ1dGVzLFxuICAgICAgICB0aGlzLnRyYW5zZm9ybWF0aW9uc1xuICAgICAgKTtcblxuICAgICAgY29uc3QgdmlkZW9UYWcgPSB0aGlzLmNsb3VkaW5hcnkudmlkZW9UYWcocHVibGljSWQsIG9wdGlvbnMpO1xuXG4gICAgICAvLyBSZXBsYWNlIHRlbXBsYXRlIHdpdGggdGhlIGN1c3RvbSB2aWRlbyB0YWcgY3JlYXRlZCBieSBDbG91ZGluYXJ5XG4gICAgICB0aGlzLmFwcGVuZFNvdXJjZUVsZW1lbnRzKHZpZGVvLCB2aWRlb1RhZy5jb250ZW50KCkpO1xuICAgICAgLy8gQWRkIGF0dHJpYnV0ZXNcbiAgICAgIHRoaXMuc2V0RWxlbWVudEF0dHJpYnV0ZXModmlkZW8sIHZpZGVvVGFnLmF0dHJpYnV0ZXMoKSk7XG4gICAgfVxuICB9XG5cbiAgc2V0RWxlbWVudEF0dHJpYnV0ZXMoZWxlbWVudCwgYXR0cmlidXRlc0xpdGVyYWwpIHtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzTGl0ZXJhbCkuZm9yRWFjaChhdHRyTmFtZSA9PiB7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0cmlidXRlc0xpdGVyYWxbYXR0ck5hbWVdKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFwcGVuZFNvdXJjZUVsZW1lbnRzKGVsZW1lbnQsIGh0bWwpIHtcbiAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGh0bWw7XG5cbiAgICB3aGlsZSAoZWxlbWVudC5jaGlsZE5vZGVzWzBdKSB7XG4gICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChlbGVtZW50LmNoaWxkTm9kZXNbMF0pO1xuICAgIH1cbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKGZyYWdtZW50KTtcbiAgfVxufVxuIiwiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEFmdGVyVmlld0luaXQsIElucHV0LCBRdWVyeUxpc3QsIENvbnRlbnRDaGlsZHJlbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Nsb3VkaW5hcnl9IGZyb20gJy4vY2xvdWRpbmFyeS5zZXJ2aWNlJztcbmltcG9ydCB7Q2xvdWRpbmFyeVRyYW5zZm9ybWF0aW9uRGlyZWN0aXZlfSBmcm9tICcuL2Nsb3VkaW5hcnktdHJhbnNmb3JtYXRpb24uZGlyZWN0aXZlJztcbmltcG9ydCB7IGlzQnJvd3NlciB9IGZyb20gJy4vY2xvdWRpbmFyeS5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbY2xIcmVmXSwgW2NsU3JjXSwgW2NsU3Jjc2V0XSdcbn0pXG5leHBvcnQgY2xhc3MgQ2xvdWRpbmFyeUltYWdlU291cmNlRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICBASW5wdXQoKSBjbEhyZWY6IHN0cmluZztcbiAgICBASW5wdXQoKSBjbFNyYzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGNsU3Jjc2V0OiBzdHJpbmc7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKENsb3VkaW5hcnlUcmFuc2Zvcm1hdGlvbkRpcmVjdGl2ZSlcbiAgICB0cmFuc2Zvcm1hdGlvbnM6IFF1ZXJ5TGlzdDxDbG91ZGluYXJ5VHJhbnNmb3JtYXRpb25EaXJlY3RpdmU+O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBjbG91ZGluYXJ5OiBDbG91ZGluYXJ5KSB7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgaWYgKGlzQnJvd3NlcigpKSB7XG4gICAgICAgIGxldCBhdHRyTmFtZTogc3RyaW5nO1xuICAgICAgICBsZXQgcHJvcGVydHlWYWx1ZTogc3RyaW5nO1xuICAgICAgICBpZiAodGhpcy5jbEhyZWYpIHtcbiAgICAgICAgICAgIGF0dHJOYW1lID0gJ2hyZWYnO1xuICAgICAgICAgICAgcHJvcGVydHlWYWx1ZSA9IHRoaXMuY2xIcmVmO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2xTcmMpIHtcbiAgICAgICAgICAgIGF0dHJOYW1lID0gJ3NyYyc7XG4gICAgICAgICAgICBwcm9wZXJ0eVZhbHVlID0gdGhpcy5jbFNyYztcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNsU3Jjc2V0KSB7XG4gICAgICAgICAgICBhdHRyTmFtZSA9ICdzcmNzZXQnO1xuICAgICAgICAgICAgcHJvcGVydHlWYWx1ZSA9IHRoaXMuY2xTcmNzZXQ7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaXNTdmcgPSBmYWxzZTtcblxuICAgICAgICBpZiAodGhpcy5jbEhyZWYgJiZcbiAgICAgICAgICAgIHRvU3RyaW5nLmNhbGwodGhpcy5lbC5uYXRpdmVFbGVtZW50WydocmVmJ10gPT09ICdbb2JqZWN0IFNWR0FuaW1hdGVkU3RyaW5nXScpKSB7XG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCd4bGlua0hyZWYnLCAneGxpbms6aHJlZicpO1xuICAgICAgICAgICAgaXNTdmcgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFhdHRyTmFtZSB8fCAhcHJvcGVydHlWYWx1ZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEaXJlY3RpdmUgdmFsdWUgaXMgbWlzc2luZyBmb3IgY2xIcmVmL2NsU3JjL2NsU3Jjc2V0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuYXRpdmVFbGVtZW50ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5jbG91ZGluYXJ5LnRvQ2xvdWRpbmFyeUF0dHJpYnV0ZXMobmF0aXZlRWxlbWVudC5hdHRyaWJ1dGVzLCB0aGlzLnRyYW5zZm9ybWF0aW9ucyk7XG5cbiAgICAgICAgY29uc3QgYXR0clZhbHVlID0gdGhpcy5jbG91ZGluYXJ5LnVybChwcm9wZXJ0eVZhbHVlLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKTtcblxuICAgICAgICAvKlxuICAgICAgICAgb24gSUUsIGlmIFwibmdTcmNcIiBkaXJlY3RpdmUgZGVjbGFyYXRpb24gaXMgdXNlZCBhbmQgXCJzcmNcIiBhdHRyaWJ1dGUgZG9lc24ndCBleGlzdFxuICAgICAgICAgdGhlbiBjYWxsaW5nIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdzcmMnLCAnZm9vJykgZG9lc24ndCBkbyBhbnl0aGluZywgc28gd2UgbmVlZFxuICAgICAgICAgdG8gc2V0IHRoZSBwcm9wZXJ0eSBhcyB3ZWxsIHRvIGFjaGlldmUgdGhlIGRlc2lyZWQgZWZmZWN0LlxuXG4gICAgICAgICBDaGVjayBmb3IgSUU6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzMyMTM5Mzc1LzE5ODA5NVxuICAgICAgICAgaWYgaXMgSUUgdGhlbiBkb2N1bWVudE1vZGUgY29udGFpbnMgSUUgdmVyc2lvblxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgbXNpZSA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5vd25lckRvY3VtZW50LmRvY3VtZW50TW9kZTtcbiAgICAgICAgaWYgKG1zaWUgJiYgIWlzU3ZnKSB7XG4gICAgICAgICAgICAvLyBJRSBsb2dpYyBoZXJlXG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnRbYXR0ck5hbWVdID0gYXR0clZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbn1cbiIsImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBSZW5kZXJlcjIsIEFmdGVyVmlld0luaXQsIElucHV0LCBRdWVyeUxpc3QsIENvbnRlbnRDaGlsZHJlbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Nsb3VkaW5hcnl9IGZyb20gJy4vY2xvdWRpbmFyeS5zZXJ2aWNlJztcbmltcG9ydCB7Q2xvdWRpbmFyeVRyYW5zZm9ybWF0aW9uRGlyZWN0aXZlfSBmcm9tICcuL2Nsb3VkaW5hcnktdHJhbnNmb3JtYXRpb24uZGlyZWN0aXZlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbY2xCYWNrZ3JvdW5kSW1hZ2VdJ1xufSlcbmV4cG9ydCBjbGFzcyBDbG91ZGluYXJ5QmFja2dyb3VuZEltYWdlRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICBASW5wdXQoKSBjbEJhY2tncm91bmRJbWFnZTogc3RyaW5nO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihDbG91ZGluYXJ5VHJhbnNmb3JtYXRpb25EaXJlY3RpdmUpXG4gICAgdHJhbnNmb3JtYXRpb25zOiBRdWVyeUxpc3Q8Q2xvdWRpbmFyeVRyYW5zZm9ybWF0aW9uRGlyZWN0aXZlPjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBjbG91ZGluYXJ5OiBDbG91ZGluYXJ5KSB7XG4gICAgfVxuXG4gICAgaXNCcm93c2VyKCk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgIGlmICh0aGlzLmlzQnJvd3NlcigpKSB7XG4gICAgICAgIGNvbnN0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmNsb3VkaW5hcnkudG9DbG91ZGluYXJ5QXR0cmlidXRlcyhuYXRpdmVFbGVtZW50LmF0dHJpYnV0ZXMsIHRoaXMudHJhbnNmb3JtYXRpb25zKTtcbiAgICAgICAgY29uc3QgaW1hZ2VVcmwgPSB0aGlzLmNsb3VkaW5hcnkudXJsKHRoaXMuY2xCYWNrZ3JvdW5kSW1hZ2UsIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKG5hdGl2ZUVsZW1lbnQsICdiYWNrZ3JvdW5kLWltYWdlJywgYHVybCgnJHtpbWFnZVVybH0nKWApO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKG5hdGl2ZUVsZW1lbnQsICdiYWNrZ3JvdW5kLXJlcGVhdCcsICduby1yZXBlYXQnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShuYXRpdmVFbGVtZW50LCAnYmFja2dyb3VuZC1wb3NpdGlvbicsICdjZW50ZXInKTtcbiAgICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2NsLWltYWdlW2xvYWRpbmc9bGF6eV0nXG59KVxuZXhwb3J0IGNsYXNzIExhenlMb2FkRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICBpZiAoIXRoaXMuaXNOYXRpdmVMYXp5TG9hZFN1cHBvcnRlZCgpICYmIHRoaXMuaXNMYXp5TG9hZFN1cHBvcnRlZCgpKSB7XG4gICAgICAgIHRoaXMubGF6eUxvYWQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubG9hZEltYWdlKCk7XG4gICAgICB9XG4gIH1cblxuICBsb2FkSW1hZ2UoKSB7XG4gICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBpbWFnZSA9IG5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF07XG4gICAgaW1hZ2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBpbWFnZS5kYXRhc2V0LnNyYyk7XG4gIH1cblxuICBpc0xhenlMb2FkU3VwcG9ydGVkKCkge1xuICAgIHJldHVybiB3aW5kb3cgJiYgJ0ludGVyc2VjdGlvbk9ic2VydmVyJyBpbiB3aW5kb3c7XG4gIH1cblxuICBpc05hdGl2ZUxhenlMb2FkU3VwcG9ydGVkKCkge1xuICAgIHJldHVybiAnbG9hZGluZycgaW4gSFRNTEltYWdlRWxlbWVudC5wcm90b3R5cGU7IC8vIGNoZWNrIGxvYWRpbmcgcHJvcGVydHkgaXMgZGVmaW5lZCBvbiBpbWFnZSBvciBpZnJhbWVcbiAgfVxuXG4gIGxhenlMb2FkKCkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICByb290TWFyZ2luOiBgMHB4IDBweCAtNTAlIDBweGAsIC8vIE1hcmdpbiBhcm91bmQgdGhlIHJvb3RcbiAgICB9O1xuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKFxuICAgIChlbnRyaWVzKSA9PiB7XG4gICAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgICAgICAgdGhpcy5sb2FkSW1hZ2UoKTtcbiAgICAgICAgICAgIG9ic2VydmVyLnVub2JzZXJ2ZShlbnRyeS50YXJnZXQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgICB9KTtcbiAgICBvYnNlcnZlci5vYnNlcnZlKHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0Jztcbi8qIEFwcCBNb2R1bGUgKi9cbmltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENsb3VkaW5hcnkgfSBmcm9tICcuL2Nsb3VkaW5hcnkuc2VydmljZSc7XG5pbXBvcnQgeyBDbG91ZGluYXJ5SW1hZ2UgfSBmcm9tICcuL2Nsb3VkaW5hcnktaW1hZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IENsb3VkaW5hcnlWaWRlbyB9IGZyb20gJy4vY2xvdWRpbmFyeS12aWRlby5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2xvdWRpbmFyeVRyYW5zZm9ybWF0aW9uRGlyZWN0aXZlIH0gZnJvbSAnLi9jbG91ZGluYXJ5LXRyYW5zZm9ybWF0aW9uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDbG91ZGluYXJ5SW1hZ2VTb3VyY2VEaXJlY3RpdmUgfSBmcm9tICcuL2Nsb3VkaW5hcnktaW1hZ2Utc291cmNlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDbG91ZGluYXJ5QmFja2dyb3VuZEltYWdlRGlyZWN0aXZlIH0gZnJvbSAnLi9jbG91ZGluYXJ5LWJhY2tncm91bmQtaW1hZ2UuZGlyZWN0aXZlJztcbmltcG9ydCBDbG91ZGluYXJ5Q29uZmlndXJhdGlvbiBmcm9tICcuL2Nsb3VkaW5hcnktY29uZmlndXJhdGlvbi5jbGFzcyc7XG5pbXBvcnQgeyBMYXp5TG9hZERpcmVjdGl2ZSB9IGZyb20gJy4vY2xvdWRpbmFyeS1sYXp5LWxvYWQuZGlyZWN0aXZlJztcbmltcG9ydCB7IENsb3VkaW5hcnlQbGFjZUhvbGRlciB9IGZyb20gJy4vY2xvdWRpbmFyeS1wbGFjZWhvbGRlci5jb21wb25lbnQnO1xuXG4vLyBFeHBvcnQgZm9yIGxpYiBjb25zdW1lcnNcbmV4cG9ydCB7IENsb3VkaW5hcnlJbWFnZSB9IGZyb20gJy4vY2xvdWRpbmFyeS1pbWFnZS5jb21wb25lbnQnO1xuZXhwb3J0IHsgQ2xvdWRpbmFyeVZpZGVvIH0gZnJvbSAnLi9jbG91ZGluYXJ5LXZpZGVvLmNvbXBvbmVudCc7XG5leHBvcnQgeyBDbG91ZGluYXJ5VHJhbnNmb3JtYXRpb25EaXJlY3RpdmUgfSBmcm9tICcuL2Nsb3VkaW5hcnktdHJhbnNmb3JtYXRpb24uZGlyZWN0aXZlJztcbmV4cG9ydCB7IENsb3VkaW5hcnlJbWFnZVNvdXJjZURpcmVjdGl2ZSB9IGZyb20gJy4vY2xvdWRpbmFyeS1pbWFnZS1zb3VyY2UuZGlyZWN0aXZlJztcbmV4cG9ydCB7IENsb3VkaW5hcnlCYWNrZ3JvdW5kSW1hZ2VEaXJlY3RpdmUgfSBmcm9tICcuL2Nsb3VkaW5hcnktYmFja2dyb3VuZC1pbWFnZS5kaXJlY3RpdmUnO1xuZXhwb3J0IHsgTGF6eUxvYWREaXJlY3RpdmUgfSBmcm9tICcuL2Nsb3VkaW5hcnktbGF6eS1sb2FkLmRpcmVjdGl2ZSc7XG5leHBvcnQgeyBDbG91ZGluYXJ5UGxhY2VIb2xkZXIgfSBmcm9tJy4vY2xvdWRpbmFyeS1wbGFjZWhvbGRlci5jb21wb25lbnQnO1xuXG5cbmV4cG9ydCB7IENsb3VkaW5hcnksIHByb3ZpZGVDbG91ZGluYXJ5IH0gZnJvbSAnLi9jbG91ZGluYXJ5LnNlcnZpY2UnO1xuXG5leHBvcnQgeyBDbG91ZGluYXJ5Q29uZmlndXJhdGlvbiB9O1xuXG5leHBvcnQgY29uc3QgQ0xPVURJTkFSWV9MSUIgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ0NMT1VESU5BUllfTElCJyk7XG5leHBvcnQgY29uc3QgQ0xPVURJTkFSWV9DT05GSUdVUkFUSU9OID0gbmV3IEluamVjdGlvblRva2VuKCdDTE9VRElOQVJZX0NPTkZJR1VSQVRJT04nKTtcblxuLy8gRXhwb3J0IHRoaXMgZnVuY3Rpb24gdG8gQW5ndWxhcidzIEFPVCB0byB3b3JrXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ2xvdWRpbmFyeShjbG91ZGluYXJ5SnNMaWI6IG9iamVjdCwgY29uZmlndXJhdGlvbjogQ2xvdWRpbmFyeUNvbmZpZ3VyYXRpb24pIHtcbiAgcmV0dXJuIG5ldyBDbG91ZGluYXJ5KGNsb3VkaW5hcnlKc0xpYiwgY29uZmlndXJhdGlvbik7XG59O1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBDbG91ZGluYXJ5SW1hZ2VTb3VyY2VEaXJlY3RpdmUsXG4gICAgQ2xvdWRpbmFyeUJhY2tncm91bmRJbWFnZURpcmVjdGl2ZSxcbiAgICBDbG91ZGluYXJ5SW1hZ2UsXG4gICAgQ2xvdWRpbmFyeVZpZGVvLFxuICAgIENsb3VkaW5hcnlUcmFuc2Zvcm1hdGlvbkRpcmVjdGl2ZSxcbiAgICBMYXp5TG9hZERpcmVjdGl2ZSxcbiAgICBDbG91ZGluYXJ5UGxhY2VIb2xkZXIsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBDbG91ZGluYXJ5SW1hZ2VTb3VyY2VEaXJlY3RpdmUsXG4gICAgQ2xvdWRpbmFyeUJhY2tncm91bmRJbWFnZURpcmVjdGl2ZSxcbiAgICBDbG91ZGluYXJ5SW1hZ2UsXG4gICAgQ2xvdWRpbmFyeVZpZGVvLFxuICAgIENsb3VkaW5hcnlUcmFuc2Zvcm1hdGlvbkRpcmVjdGl2ZSxcbiAgICBMYXp5TG9hZERpcmVjdGl2ZSxcbiAgICBDbG91ZGluYXJ5UGxhY2VIb2xkZXJcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBDbG91ZGluYXJ5TW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY2xvdWRpbmFyeUpzTGliOiBvYmplY3QsIGNsb3VkaW5hcnlDb25maWd1cmF0aW9uOiBDbG91ZGluYXJ5Q29uZmlndXJhdGlvbik6IE1vZHVsZVdpdGhQcm92aWRlcnM8Q2xvdWRpbmFyeU1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQ2xvdWRpbmFyeU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IENMT1VESU5BUllfTElCLCB1c2VWYWx1ZTogY2xvdWRpbmFyeUpzTGliIH0sXG4gICAgICAgIHsgcHJvdmlkZTogQ0xPVURJTkFSWV9DT05GSUdVUkFUSU9OLCB1c2VWYWx1ZTogY2xvdWRpbmFyeUNvbmZpZ3VyYXRpb24gfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IENsb3VkaW5hcnksXG4gICAgICAgICAgdXNlRmFjdG9yeTogY3JlYXRlQ2xvdWRpbmFyeSxcbiAgICAgICAgICBkZXBzOiBbQ0xPVURJTkFSWV9MSUIsIENMT1VESU5BUllfQ09ORklHVVJBVElPTl1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBWUEsSUFBTSxnQkFBZ0IsR0FBRyxVQUFVLEdBQVE7O0lBRXpDLE9BQU8sR0FBRyxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsS0FBSyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO0NBQ3RGLENBQUM7O0FBRUYsSUFBTSxjQUFjLEdBQUcsVUFBVSxHQUFRO0lBQ3ZDLE9BQU8sR0FBRyxLQUFLLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLGNBQWMsSUFBSSxHQUFHLFlBQVksWUFBWSxDQUFDLENBQUM7Q0FDeEYsQ0FBQzs7QUFFRixJQUFNLG9CQUFvQixHQUFHLFVBQVUsTUFBb0I7O0lBQ3pELElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7O1FBQy9CLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUM7O1FBQ2hDLElBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztLQUN0QixDQUFDLENBQUM7SUFDSCxPQUFPLE1BQU0sQ0FBQztDQUNmLENBQUM7O0FBRUYsSUFBTSxpQkFBaUIsR0FBRyxVQUFVLEdBQVE7O0lBQzFDLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQztJQUNm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