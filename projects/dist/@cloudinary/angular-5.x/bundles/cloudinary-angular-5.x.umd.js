(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@cloudinary/angular-5.x', ['exports', '@angular/core', '@angular/common'], factory) :
    (factory((global.cloudinary = global.cloudinary || {}, global.cloudinary['angular-5'] = global.cloudinary['angular-5'] || {}, global.cloudinary['angular-5'].x = {}),global.ng.core,global.ng.common));
}(this, (function (exports,core,common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

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
             */ function () {
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
            { type: core.Directive, args: [{
                        selector: 'cl-transformation'
                    },] },
        ];
        /** @nocollapse */
        CloudinaryTransformationDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef }
            ];
        };
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
            { type: core.Component, args: [{
                        // tslint:disable-next-line:component-selector
                        selector: 'cl-placeholder',
                        template: "<img [src]=\"this.placeholderImg\" [style.width.px]=\"this.itemWidth\" [style.height.px]=\"this.itemHeight\">",
                    },] },
        ];
        /** @nocollapse */
        CloudinaryPlaceHolder.ctorParameters = function () {
            return [
                { type: Cloudinary }
            ];
        };
        CloudinaryPlaceHolder.propDecorators = {
            type: [{ type: core.Input, args: ['type',] }],
            itemWidth: [{ type: core.HostBinding, args: ['style.width',] }],
            itemHeight: [{ type: core.HostBinding, args: ['style.height',] }],
            publicId: [{ type: core.HostBinding, args: ['attr.public-id',] }]
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
            this.onLoad = new core.EventEmitter();
            this.onError = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'cl-image',
                        template: "<img [ngStyle]=\"{opacity: shouldShowPlaceHolder ? '0' : '1', position: shouldShowPlaceHolder ? 'absolute' : 'unset'}\"(load)=\"hasLoaded()\">\n  <div [style.display]=\"shouldShowPlaceHolder ? 'inline' : 'none'\">\n      <ng-content></ng-content>\n  </div>\n  ",
                    },] },
        ];
        /** @nocollapse */
        CloudinaryImage.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: Cloudinary }
            ];
        };
        CloudinaryImage.propDecorators = {
            publicId: [{ type: core.Input, args: ['public-id',] }],
            clientHints: [{ type: core.Input, args: ['client-hints',] }],
            loading: [{ type: core.Input, args: ['loading',] }],
            width: [{ type: core.Input, args: ['width',] }],
            height: [{ type: core.Input, args: ['height',] }],
            transformations: [{ type: core.ContentChildren, args: [CloudinaryTransformationDirective,] }],
            placeholderComponent: [{ type: core.ContentChild, args: [CloudinaryPlaceHolder,] }],
            onLoad: [{ type: core.Output }],
            onError: [{ type: core.Output }]
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
                if (common.isPlatformBrowser(this.platformId)) {
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
            { type: core.Component, args: [{
                        selector: 'cl-video',
                        template: '<video></video>'
                    },] },
        ];
        /** @nocollapse */
        CloudinaryVideo.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: Cloudinary },
                { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] }
            ];
        };
        CloudinaryVideo.propDecorators = {
            publicId: [{ type: core.Input, args: ['public-id',] }],
            transformations: [{ type: core.ContentChildren, args: [CloudinaryTransformationDirective,] }]
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
            { type: core.Directive, args: [{
                        selector: '[clHref], [clSrc], [clSrcset]'
                    },] },
        ];
        /** @nocollapse */
        CloudinaryImageSourceDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: Cloudinary }
            ];
        };
        CloudinaryImageSourceDirective.propDecorators = {
            clHref: [{ type: core.Input }],
            clSrc: [{ type: core.Input }],
            clSrcset: [{ type: core.Input }],
            transformations: [{ type: core.ContentChildren, args: [CloudinaryTransformationDirective,] }]
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
            { type: core.Directive, args: [{
                        selector: '[clBackgroundImage]'
                    },] },
        ];
        /** @nocollapse */
        CloudinaryBackgroundImageDirective.ctorParameters = function () {
            return [
                { type: core.Renderer2 },
                { type: core.ElementRef },
                { type: Cloudinary }
            ];
        };
        CloudinaryBackgroundImageDirective.propDecorators = {
            clBackgroundImage: [{ type: core.Input }],
            transformations: [{ type: core.ContentChildren, args: [CloudinaryTransformationDirective,] }]
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
            { type: core.Directive, args: [{
                        selector: 'cl-image[loading=lazy]'
                    },] },
        ];
        /** @nocollapse */
        LazyLoadDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef }
            ];
        };
        return LazyLoadDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var CLOUDINARY_LIB = new core.InjectionToken('CLOUDINARY_LIB');
    /** @type {?} */
    var CLOUDINARY_CONFIGURATION = new core.InjectionToken('CLOUDINARY_CONFIGURATION');
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
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
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

    exports.provideCloudinary = provideCloudinary;
    exports.Cloudinary = Cloudinary;
    exports.isJsonLikeString = isJsonLikeString;
    exports.isNamedNodeMap = isNamedNodeMap;
    exports.transformKeyNames = transformKeyNames;
    exports.namedNodeMapToObject = namedNodeMapToObject;
    exports.isBrowser = isBrowser;
    exports.createCloudinary = createCloudinary;
    exports.CloudinaryImage = CloudinaryImage;
    exports.CloudinaryVideo = CloudinaryVideo;
    exports.CloudinaryTransformationDirective = CloudinaryTransformationDirective;
    exports.CloudinaryImageSourceDirective = CloudinaryImageSourceDirective;
    exports.CloudinaryBackgroundImageDirective = CloudinaryBackgroundImageDirective;
    exports.LazyLoadDirective = LazyLoadDirective;
    exports.CloudinaryPlaceHolder = CloudinaryPlaceHolder;
    exports.CLOUDINARY_LIB = CLOUDINARY_LIB;
    exports.CLOUDINARY_CONFIGURATION = CLOUDINARY_CONFIGURATION;
    exports.CloudinaryModule = CloudinaryModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWRpbmFyeS1hbmd1bGFyLTUueC51bWQuanMubWFwIiwic291cmNlcyI6W251bGwsIm5nOi8vQGNsb3VkaW5hcnkvYW5ndWxhci01LngvbGliL2Nsb3VkaW5hcnkuc2VydmljZS50cyIsIm5nOi8vQGNsb3VkaW5hcnkvYW5ndWxhci01LngvbGliL2Nsb3VkaW5hcnktdHJhbnNmb3JtYXRpb24uZGlyZWN0aXZlLnRzIiwibmc6Ly9AY2xvdWRpbmFyeS9hbmd1bGFyLTUueC9saWIvY2xvdWRpbmFyeS1wbGFjZWhvbGRlci5jb21wb25lbnQudHMiLCJuZzovL0BjbG91ZGluYXJ5L2FuZ3VsYXItNS54L2xpYi9jbG91ZGluYXJ5LWltYWdlLmNvbXBvbmVudC50cyIsIm5nOi8vQGNsb3VkaW5hcnkvYW5ndWxhci01LngvbGliL2Nsb3VkaW5hcnktdmlkZW8uY29tcG9uZW50LnRzIiwibmc6Ly9AY2xvdWRpbmFyeS9hbmd1bGFyLTUueC9saWIvY2xvdWRpbmFyeS1pbWFnZS1zb3VyY2UuZGlyZWN0aXZlLnRzIiwibmc6Ly9AY2xvdWRpbmFyeS9hbmd1bGFyLTUueC9saWIvY2xvdWRpbmFyeS1iYWNrZ3JvdW5kLWltYWdlLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGNsb3VkaW5hcnkvYW5ndWxhci01LngvbGliL2Nsb3VkaW5hcnktbGF6eS1sb2FkLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGNsb3VkaW5hcnkvYW5ndWxhci01LngvbGliL2Nsb3VkaW5hcnkubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IENsb3VkaW5hcnlDb25maWd1cmF0aW9uIGZyb20gJy4vY2xvdWRpbmFyeS1jb25maWd1cmF0aW9uLmNsYXNzJztcbmltcG9ydCB7IENsb3VkaW5hcnlUcmFuc2Zvcm1hdGlvbkRpcmVjdGl2ZSB9IGZyb20gJy4vY2xvdWRpbmFyeS10cmFuc2Zvcm1hdGlvbi5kaXJlY3RpdmUnO1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gc3RyaW5nIGJlZ2lucyB3aXRoIGEgbGVmdCBjdXJseSBicmFjZSBhbmQgZW5kcyB3aXRoIGEgcmlnaHQgY3VybHkgYnJhY2UsIGUuZy5cbiAqIFwie2FzZGFzIGR9XCIgd2lsbCByZXR1cm4gdHJ1ZSwgXCJhc2Rhc2R9XCIgd2lsbCByZXR1cm4gZmFsc2UuXG4gKlxuICogdGhpcyBmdW5jdGlvbiBkb2VzIG5vdCB2YWxpZGF0ZSB0aGUgY29ycmVjdG5lc3Mgb2YgdGhlIHN0cmluZyBjb250ZW50IG90aGVyIHRoYW4gdGhlIGZpcnN0IGFuZCBsYXN0IGNoYXJhY3RlclxuICogQHBhcmFtIHN0clxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5jb25zdCBpc0pzb25MaWtlU3RyaW5nID0gZnVuY3Rpb24gKHN0cjogYW55KTogYm9vbGVhbiB7XG4gIC8vIFtcXHNcXFNdIGFsbG93cyB0aGUgc3RyaW5nIHRvIGNvbnRhaW4gbmV3IGxpbmVzXG4gIHJldHVybiBzdHIgJiYgdHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgJiYgKHN0ci50cmltKCkubWF0Y2goL157W1xcc1xcU10qP30kLykgIT09IG51bGwpO1xufTtcblxuY29uc3QgaXNOYW1lZE5vZGVNYXAgPSBmdW5jdGlvbiAob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIG9iaiAmJiAob2JqLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdOYW1lZE5vZGVNYXAnIHx8IG9iaiBpbnN0YW5jZW9mIE5hbWVkTm9kZU1hcCk7XG59O1xuXG5jb25zdCBuYW1lZE5vZGVNYXBUb09iamVjdCA9IGZ1bmN0aW9uIChzb3VyY2U6IE5hbWVkTm9kZU1hcCk6IGFueSB7XG4gIGxldCB0YXJnZXQgPSB7fTtcbiAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGluZGV4ID0+IHtcbiAgICBjb25zdCBuYW1lID0gc291cmNlW2luZGV4XS5uYW1lO1xuICAgIGNvbnN0IHZhbHVlID0gc291cmNlW2luZGV4XS52YWx1ZTtcbiAgICB0YXJnZXRbbmFtZV0gPSB2YWx1ZTtcbiAgfSk7XG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG5jb25zdCB0cmFuc2Zvcm1LZXlOYW1lcyA9IGZ1bmN0aW9uIChvYmo6IGFueSk6IGFueSB7XG4gIGxldCBfb2JqID0gb2JqO1xuICBpZiAoaXNKc29uTGlrZVN0cmluZyhvYmopKSB7XG4gICAgLy8gR2l2ZW4gYXR0cmlidXRlIHZhbHVlIGlzIGluIHRoZSBmb3JtIG9mIGEgSlNPTiBvYmplY3QgLVxuICAgIC8vIFRyYW5zZm9ybXMgdGhlIHN0cmluZyBpbnRvIGFuIG9iamVjdCwgYXMgdGhlIEphdmFzY3JpcHQgQVBJIGV4cGVjdHNcbiAgICBfb2JqID0gSlNPTi5wYXJzZShvYmopO1xuICB9IGVsc2UgaWYgKGlzTmFtZWROb2RlTWFwKG9iaikpIHtcbiAgICBfb2JqID0gbmFtZWROb2RlTWFwVG9PYmplY3Qob2JqKTtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KF9vYmopKSB7XG4gICAgLy8gVHJhbnNmb3JtIGFsbCB0aGUgYXJyYXkgdmFsdWVzIChlLmcuIHRyYW5zZm9ybWF0aW9uIGFycmF5KVxuICAgIF9vYmogPSBfb2JqLm1hcChjdXJyZW50VmFsdWUgPT4ge1xuICAgICAgcmV0dXJuIHRyYW5zZm9ybUtleU5hbWVzKGN1cnJlbnRWYWx1ZSk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIF9vYmogPT09ICdvYmplY3QnKSB7XG4gICAgT2JqZWN0LmtleXMoX29iaikuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgLy8gUmVwbGFjZSB0aGUga2V5IG5hbWUgd2l0aCB0aGUgc25ha2VfY2FzZVxuICAgICAgLy8gVGhlbiBzdHJpcCBjbGQgcHJlZml4IGlmIGl0IGV4aXN0cyAod2l0aCBhbiBvcHRpb25hbCBkYXNoIG9yIHVuZGVyc2NvcmUpXG4gICAgICBjb25zdCBrZWJhYktleSA9IGtleS5yZXBsYWNlKC8tL2csICdfJykudG9Mb2NhbGVMb3dlckNhc2UoKS5yZXBsYWNlKC9eY2xkKC18Xyk/LywgJycpO1xuICAgICAgY29uc3Qga2ViYWJWYWx1ZSA9IHRyYW5zZm9ybUtleU5hbWVzKF9vYmpba2V5XSk7XG4gICAgICBkZWxldGUgX29ialtrZXldO1xuICAgICAgX29ialtrZWJhYktleV0gPSBrZWJhYlZhbHVlO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBfb2JqO1xufTtcblxuZXhwb3J0IGNsYXNzIENsb3VkaW5hcnkge1xuICBfY2xvdWRpbmFyeUluc3RhbmNlOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoY2xvdWRpbmFyeUpzTGliOiBhbnksIGNvbmZpZ3VyYXRpb246IENsb3VkaW5hcnlDb25maWd1cmF0aW9uKSB7XG4gICAgLy8gQ2xvdWRpbmFyeSBKUyBhbHJlYWR5IGNsb25lcyB0aGUgZ2l2ZW4gY29uZmlndXJhdGlvbiBzbyBubyBuZWVkIHRvIGNsb25lIGl0IGhlcmUgdG9vXG4gICAgaWYgKGNsb3VkaW5hcnlKc0xpYi5DbG91ZGluYXJ5SlF1ZXJ5KSB7XG4gICAgICB0aGlzLl9jbG91ZGluYXJ5SW5zdGFuY2UgPSBuZXcgY2xvdWRpbmFyeUpzTGliLkNsb3VkaW5hcnlKUXVlcnkoY29uZmlndXJhdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2Nsb3VkaW5hcnlJbnN0YW5jZSA9IG5ldyBjbG91ZGluYXJ5SnNMaWIuQ2xvdWRpbmFyeShjb25maWd1cmF0aW9uKTtcbiAgICB9XG4gIH1cblxuICBnZXQgY2xvdWRpbmFyeUluc3RhbmNlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2Nsb3VkaW5hcnlJbnN0YW5jZTtcbiAgfVxuXG4gIGNvbmZpZygpIHtcbiAgICByZXR1cm4gdGhpcy5fY2xvdWRpbmFyeUluc3RhbmNlLmNvbmZpZygpO1xuICB9XG5cbiAgdXJsKC4uLnBhcmFtZXRlcnMpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9jbG91ZGluYXJ5SW5zdGFuY2UudXJsKC4uLnBhcmFtZXRlcnMpO1xuICB9XG5cbiAgaW1hZ2VUYWcoLi4ucGFyYW1ldGVycyk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2Nsb3VkaW5hcnlJbnN0YW5jZS5pbWFnZVRhZyguLi5wYXJhbWV0ZXJzKTtcbiAgfVxuXG4gIHZpZGVvVGFnKC4uLnBhcmFtZXRlcnMpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9jbG91ZGluYXJ5SW5zdGFuY2UudmlkZW9UYWcoLi4ucGFyYW1ldGVycyk7XG4gIH1cblxuICByZXNwb25zaXZlKGltZzogSFRNTEltYWdlRWxlbWVudCwgb3B0aW9uczogYW55KTogdm9pZCB7XG4gICAgLy8gQ2xvdWRpbmFyeSB1bmRlcmx5aW5nIEpTIGxpYnJhcnkgd2lsbCBoYW5kbGUgcmVzcG9uc2l2ZSBiZWhhdmlvclxuICAgIHRoaXMuX2Nsb3VkaW5hcnlJbnN0YW5jZS5jbG91ZGluYXJ5X3VwZGF0ZShpbWcsIG9wdGlvbnMpO1xuICAgIHRoaXMuX2Nsb3VkaW5hcnlJbnN0YW5jZS5yZXNwb25zaXZlKG9wdGlvbnMsIGZhbHNlKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFRyYW5zZm9ybXMgYSBzZXQgb2YgYXR0cmlidXRlcyBhbmQgY2hhaW5lZCB0cmFuc2Zvcm1hdGlvbnMgdG8gYW4gb3B0aW9ucyBvYmplY3QgdGhhdCBjYW4gYmUgY29uc3VtZWQgYnkgQ2xvdWRpbmFyeSBKUyBBUElcbiAgICogQHBhcmFtIGF0dHJpYnV0ZXMgSFRNTCBlbGVtZW50IGF0dHJpYnV0ZXNcbiAgICogQHBhcmFtIGNoaWxkVHJhbnNmb3JtYXRpb25zIFF1ZXJ5TGlzdCB3aXRoIHRoZSBlbGVtZW50J3MgPGNsLXRyYW5zZm9ybWF0aW9uPiBjaGlsZHJlbiBmb3IgY2hhaW5lZCB0cmFuc2Zvcm1hdGlvbnNcbiAgICogQHBhcmFtIGNsb3VkaW5hcnkgQ2xvdWRpbmFyeSBzZXJ2aWNlXG4gICAqIEByZXR1cm5zIEFuIG9wdGlvbnMgb2JqZWN0IHRoYXQgY2FuIGJlIGNvbnN1bWVkIGJ5IENsb3VkaW5hcnkgSlMgQVBJXG4gICAqL1xuICB0b0Nsb3VkaW5hcnlBdHRyaWJ1dGVzKGF0dHJpYnV0ZXM6IE5hbWVkTm9kZU1hcCxcbiAgICBjaGlsZFRyYW5zZm9ybWF0aW9ucz86IFF1ZXJ5TGlzdDxDbG91ZGluYXJ5VHJhbnNmb3JtYXRpb25EaXJlY3RpdmU+KTogYW55IHtcbiAgICBjb25zdCBvcHRpb25zID0gdHJhbnNmb3JtS2V5TmFtZXMoYXR0cmlidXRlcyk7XG5cbiAgICAvLyBBZGQgY2hhaW5lZCB0cmFuc2Zvcm1hdGlvbnNcbiAgICBpZiAoY2hpbGRUcmFuc2Zvcm1hdGlvbnMgJiYgY2hpbGRUcmFuc2Zvcm1hdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgb3B0aW9ucy50cmFuc2Zvcm1hdGlvbiA9IFtdO1xuICAgICAgLy8gU3VwcG9ydCBjaGFpbmVkIHRyYW5zZm9ybWF0aW9uc1xuICAgICAgY2hpbGRUcmFuc2Zvcm1hdGlvbnMuZm9yRWFjaCh0cmFuc2Zvcm1hdGlvbiA9PiB7XG4gICAgICAgIG9wdGlvbnMudHJhbnNmb3JtYXRpb24ucHVzaCh0aGlzLnRvQ2xvdWRpbmFyeUF0dHJpYnV0ZXModHJhbnNmb3JtYXRpb24uZ2V0QXR0cmlidXRlcygpKSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2l2ZW5lc3NcbiAgICBpZiAob3B0aW9ucy5yZXNwb25zaXZlID09PSAnJyB8fCBvcHRpb25zLnJlc3BvbnNpdmUgPT09ICd0cnVlJyB8fCBvcHRpb25zLnJlc3BvbnNpdmUgPT09IHRydWUpIHtcbiAgICAgIG9wdGlvbnMucmVzcG9uc2l2ZSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xuXG4gIH07XG59XG5cbi8qIFJldHVybiBhIHByb3ZpZGVyIG9iamVjdCB0aGF0IGNyZWF0ZXMgb3VyIGNvbmZpZ3VyYWJsZSBzZXJ2aWNlICovXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZUNsb3VkaW5hcnkoY2xvdWRpbmFyeUpzTGliOiBhbnksIGNvbmZpZ3VyYXRpb246IENsb3VkaW5hcnlDb25maWd1cmF0aW9uKSB7XG4gIHJldHVybiB7IHByb3ZpZGU6IENsb3VkaW5hcnksIHVzZUZhY3Rvcnk6ICgpID0+IG5ldyBDbG91ZGluYXJ5KGNsb3VkaW5hcnlKc0xpYiwgY29uZmlndXJhdGlvbikgfTtcbn07XG5cbmNvbnN0IGlzQnJvd3NlciA9IGZ1bmN0aW9uICgpOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnO1xufVxuXG4vLyBGb3IgdW5pdCB0ZXN0c1xuZXhwb3J0IHsgaXNKc29uTGlrZVN0cmluZywgaXNOYW1lZE5vZGVNYXAsIHRyYW5zZm9ybUtleU5hbWVzLCBuYW1lZE5vZGVNYXBUb09iamVjdCwgaXNCcm93c2VyIH07XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnY2wtdHJhbnNmb3JtYXRpb24nXG59KVxuZXhwb3J0IGNsYXNzIENsb3VkaW5hcnlUcmFuc2Zvcm1hdGlvbkRpcmVjdGl2ZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikge1xuICB9XG5cbiAgZ2V0QXR0cmlidXRlcygpOiBOYW1lZE5vZGVNYXAge1xuICAgIHJldHVybiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYXR0cmlidXRlcztcbiAgfVxufVxuXG4iLCJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICBDb21wb25lbnQsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Nsb3VkaW5hcnl9IGZyb20gJy4vY2xvdWRpbmFyeS5zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ2NsLXBsYWNlaG9sZGVyJyxcbiAgdGVtcGxhdGU6IGA8aW1nIFtzcmNdPVwidGhpcy5wbGFjZWhvbGRlckltZ1wiIFtzdHlsZS53aWR0aC5weF09XCJ0aGlzLml0ZW1XaWR0aFwiIFtzdHlsZS5oZWlnaHQucHhdPVwidGhpcy5pdGVtSGVpZ2h0XCI+YFxuICAsXG59KVxuZXhwb3J0IGNsYXNzIENsb3VkaW5hcnlQbGFjZUhvbGRlciBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQge1xuICBASW5wdXQoJ3R5cGUnKSB0eXBlOiBzdHJpbmc7XG4gIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgnKSBpdGVtV2lkdGg7XG4gIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0JykgaXRlbUhlaWdodDtcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnB1YmxpYy1pZCcpIHB1YmxpY0lkO1xuXG4gIG9wdGlvbnM6IG9iamVjdCA9IHt9O1xuICBwbGFjZWhvbGRlckltZzogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2xvdWRpbmFyeTogQ2xvdWRpbmFyeSkge31cblxuICBzZXRXaWR0aCh3aWR0aCkge1xuICAgIHRoaXMuaXRlbVdpZHRoID0gd2lkdGg7XG4gIH1cblxuICBzZXRIZWlnaHQoaGVpZ2h0KSB7XG4gICAgdGhpcy5pdGVtSGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgc2V0UHVibGljSWQoaWQpIHtcbiAgICB0aGlzLnB1YmxpY0lkID0gaWQ7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgdGhpcy5wbGFjZWhvbGRlckltZyA9IHRoaXMuZ2V0UGxhY2Vob2xkZXJJbWFnZSgpO1xuICB9XG5cbiAgZ2V0UGxhY2Vob2xkZXJJbWFnZSgpIHtcbiAgICBjb25zdCBwbGFjZWhvbGRlckltYWdlT3B0aW9ucyA9IHtcbiAgICAgICd2ZWN0b3JpemUnOiB7ZWZmZWN0OiAndmVjdG9yaXplJywgcXVhbGl0eTogMX0sXG4gICAgICAncGl4ZWxhdGUnOiB7ZWZmZWN0OiAncGl4ZWxhdGUnLCBxdWFsaXR5OiAxLCBmZXRjaF9mb3JtYXQ6ICdhdXRvJ30sXG4gICAgICAnYmx1cic6IHtlZmZlY3Q6ICdibHVyOjIwMDAnLCBxdWFsaXR5OiAxLCBmZXRjaF9mb3JtYXQ6ICdhdXRvJ30sXG4gICAgICAnc29saWQnOiBbXG4gICAgICAgIHt3aWR0aDogJ2l3X2Rpdl8yJywgYXNwZWN0X3JhdGlvOiAxLCBjcm9wOiAncGFkJywgYmFja2dyb3VuZDogJ2F1dG8nfSxcbiAgICAgICAge2Nyb3A6ICdjcm9wJywgd2lkdGg6IDEwLCBoZWlnaHQ6IDEwLCBncmF2aXR5OiAnbm9ydGhfZWFzdCd9LFxuICAgICAgICB7d2lkdGg6ICdpdycsIGhlaWdodDogJ2loJywgY3JvcDogJ2ZpbGwnfSxcbiAgICAgICAge2ZldGNoX2Zvcm1hdDogJ2F1dG8nLCBxdWFsaXR5OiAnYXV0byd9XVxuICAgIH1cbiAgICBjb25zdCB0cmFuc2Zvcm1hdGlvbiA9IFtdLmNvbmNhdC5hcHBseShbXSwgW3RoaXMub3B0aW9ucywgcGxhY2Vob2xkZXJJbWFnZU9wdGlvbnNbdGhpcy50eXBlXSB8fCBwbGFjZWhvbGRlckltYWdlT3B0aW9uc1snYmx1ciddXSk7XG4gICAgY29uc3QgdGVzdCA9IHRoaXMuY2xvdWRpbmFyeS51cmwodGhpcy5wdWJsaWNJZCwge3RyYW5zZm9ybWF0aW9uOiB0cmFuc2Zvcm1hdGlvbn0pO1xuXG4gICAgcmV0dXJuIHRlc3Q7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIFF1ZXJ5TGlzdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgT25Jbml0LFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgQ29udGVudENoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENsb3VkaW5hcnkgfSBmcm9tICcuL2Nsb3VkaW5hcnkuc2VydmljZSc7XG5pbXBvcnQgeyBDbG91ZGluYXJ5VHJhbnNmb3JtYXRpb25EaXJlY3RpdmUgfSBmcm9tICcuL2Nsb3VkaW5hcnktdHJhbnNmb3JtYXRpb24uZGlyZWN0aXZlJztcbmltcG9ydCB7IENsb3VkaW5hcnlQbGFjZUhvbGRlciB9IGZyb20gJy4vY2xvdWRpbmFyeS1wbGFjZWhvbGRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgaXNCcm93c2VyIH0gZnJvbSAnLi9jbG91ZGluYXJ5LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbC1pbWFnZScsXG4gIHRlbXBsYXRlOiBgPGltZyBbbmdTdHlsZV09XCJ7b3BhY2l0eTogc2hvdWxkU2hvd1BsYWNlSG9sZGVyID8gJzAnIDogJzEnLCBwb3NpdGlvbjogc2hvdWxkU2hvd1BsYWNlSG9sZGVyID8gJ2Fic29sdXRlJyA6ICd1bnNldCd9XCIobG9hZCk9XCJoYXNMb2FkZWQoKVwiPlxuICA8ZGl2IFtzdHlsZS5kaXNwbGF5XT1cInNob3VsZFNob3dQbGFjZUhvbGRlciA/ICdpbmxpbmUnIDogJ25vbmUnXCI+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBDbG91ZGluYXJ5SW1hZ2VcbiAgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkluaXQsIEFmdGVyVmlld0luaXQsIEFmdGVyQ29udGVudENoZWNrZWQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgQElucHV0KCdwdWJsaWMtaWQnKSBwdWJsaWNJZDogc3RyaW5nO1xuICBASW5wdXQoJ2NsaWVudC1oaW50cycpIGNsaWVudEhpbnRzPzogYm9vbGVhbjtcbiAgQElucHV0KCdsb2FkaW5nJykgbG9hZGluZzogc3RyaW5nO1xuICBASW5wdXQoJ3dpZHRoJykgd2lkdGg/OiBzdHJpbmc7XG4gIEBJbnB1dCgnaGVpZ2h0JykgaGVpZ2h0Pzogc3RyaW5nO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oQ2xvdWRpbmFyeVRyYW5zZm9ybWF0aW9uRGlyZWN0aXZlKVxuICB0cmFuc2Zvcm1hdGlvbnM6IFF1ZXJ5TGlzdDxDbG91ZGluYXJ5VHJhbnNmb3JtYXRpb25EaXJlY3RpdmU+O1xuICBAQ29udGVudENoaWxkKENsb3VkaW5hcnlQbGFjZUhvbGRlcikgcGxhY2Vob2xkZXJDb21wb25lbnQ6IENsb3VkaW5hcnlQbGFjZUhvbGRlcjtcblxuICBAT3V0cHV0KCkgb25Mb2FkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7IC8vIENhbGxiYWNrIHdoZW4gYW4gaW1hZ2UgaXMgbG9hZGVkIHN1Y2Nlc3NmdWxseVxuICBAT3V0cHV0KCkgb25FcnJvcjogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpOyAvLyBDYWxsYmFjayB3aGVuIGFuIGltYWdlIGlzIGxvYWRlZCB3aXRoIGVycm9yXG5cbiAgb2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXI7XG4gIHNob3VsZFNob3dQbGFjZUhvbGRlciA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBjbG91ZGluYXJ5OiBDbG91ZGluYXJ5KSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmIChpc0Jyb3dzZXIoKSkge1xuICAgICAgLy8gQ3JlYXRlIGFuIG9ic2VydmVyIGluc3RhbmNlXG4gICAgICB0aGlzLm9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICB0aGlzLmxvYWRJbWFnZSgpO1xuICAgICAgfSk7XG4gICAgICAvLyBPYnNlcnZlIGNoYW5nZXMgdG8gYXR0cmlidXRlcyBvciBjaGlsZCB0cmFuc2Zvcm1hdGlvbnMgdG8gcmUtcmVuZGVyIHRoZSBpbWFnZVxuICAgICAgY29uc3QgY29uZmlnID0geyBhdHRyaWJ1dGVzOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUgfTtcblxuICAgICAgLy8gcGFzcyBpbiB0aGUgdGFyZ2V0IG5vZGUsIGFzIHdlbGwgYXMgdGhlIG9ic2VydmVyIG9wdGlvbnNcbiAgICAgIHRoaXMub2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIGNvbmZpZyk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIC8vIExpc3RlbiB0byBjaGFuZ2VzIG9uIHRoZSBkYXRhLWJvdW5kIHByb3BlcnR5ICdwdWJsaWNJZCcuXG4gICAgLy8gVXBkYXRlIGNvbXBvbmVudCB1bmxlc3MgdGhpcyBpcyB0aGUgZmlyc3QgdmFsdWUgYXNzaWduZWQuXG4gICAgaWYgKGNoYW5nZXMucHVibGljSWQgJiYgIWNoYW5nZXMucHVibGljSWQuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLmxvYWRJbWFnZSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9ic2VydmVyICYmIHRoaXMub2JzZXJ2ZXIuZGlzY29ubmVjdCkge1xuICAgICAgdGhpcy5vYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMubG9hZEltYWdlKCk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgaWYgKHRoaXMud2lkdGggJiYgdGhpcy5wbGFjZWhvbGRlckNvbXBvbmVudCkge1xuICAgICAgdGhpcy5wbGFjZWhvbGRlckNvbXBvbmVudC5zZXRXaWR0aCh0aGlzLndpZHRoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaGVpZ2h0ICYmIHRoaXMucGxhY2Vob2xkZXJDb21wb25lbnQpIHtcbiAgICAgIHRoaXMucGxhY2Vob2xkZXJDb21wb25lbnQuc2V0SGVpZ2h0KHRoaXMuaGVpZ2h0KTtcbiAgICB9XG4gICAgaWYgKHRoaXMucGxhY2Vob2xkZXJDb21wb25lbnQpIHtcbiAgICAgIHRoaXMucGxhY2Vob2xkZXJDb21wb25lbnQuc2V0UHVibGljSWQodGhpcy5wdWJsaWNJZCk7XG4gICAgfVxuICB9XG5cbiAgaGFzTG9hZGVkKCkge1xuICAgIHRoaXMuc2hvdWxkU2hvd1BsYWNlSG9sZGVyID0gZmFsc2U7XG4gIH1cblxuICBsb2FkSW1hZ2UoKSB7XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvdW5pdmVyc2FsI3VuaXZlcnNhbC1nb3RjaGFzXG4gICAgLy8gRmV0Y2ggdGhlIGltYWdlIG9ubHkgZm9yIGNsaWVudCBzaWRlIHJlbmRlcmluZyBieSB0aGUgYnJvd3NlclxuICAgIGlmIChpc0Jyb3dzZXIoKSkge1xuICAgICAgaWYgKCF0aGlzLnB1YmxpY0lkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnWW91IG11c3Qgc2V0IHRoZSBwdWJsaWMgaWQgb2YgdGhlIGltYWdlIHRvIGxvYWQsIGUuZy4gPGNsLWltYWdlIHB1YmxpYy1pZD17e3Bob3RvLnB1YmxpY19pZH19Li4uPjwvY2wtaW1hZ2U+J1xuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcbiAgICAgIGNvbnN0IGltYWdlID0gbmF0aXZlRWxlbWVudC5jaGlsZHJlblswXTtcbiAgICAgIC8vIEFkZCBvbmxvYWQgYW5kIG9uZXJyb3IgaGFuZGxlcnNcbiAgICAgIGltYWdlLm9ubG9hZCA9IGUgPT4ge1xuICAgICAgICB0aGlzLm9uTG9hZC5lbWl0KGUpO1xuICAgICAgfTtcbiAgICAgIGltYWdlLm9uZXJyb3IgPSBlID0+IHtcbiAgICAgICAgdGhpcy5vbkVycm9yLmVtaXQoZSk7XG4gICAgICB9O1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuY2xvdWRpbmFyeS50b0Nsb3VkaW5hcnlBdHRyaWJ1dGVzKFxuICAgICAgICBuYXRpdmVFbGVtZW50LmF0dHJpYnV0ZXMsXG4gICAgICAgIHRoaXMudHJhbnNmb3JtYXRpb25zXG4gICAgICApO1xuICAgICAgaWYgKHRoaXMuY2xpZW50SGludHMgfHwgKHR5cGVvZiB0aGlzLmNsaWVudEhpbnRzID09PSAndW5kZWZpbmVkJyAmJiB0aGlzLmNsb3VkaW5hcnkuY29uZmlnKCkuY2xpZW50X2hpbnRzKSkge1xuICAgICAgICBkZWxldGUgb3B0aW9uc1snY2xhc3MnXTtcbiAgICAgICAgZGVsZXRlIG9wdGlvbnNbJ2RhdGEtc3JjJ107XG4gICAgICAgIGRlbGV0ZSBvcHRpb25zWydyZXNwb25zaXZlJ107XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5wbGFjZWhvbGRlckNvbXBvbmVudCkge1xuICAgICAgICB0aGlzLnBsYWNlaG9sZGVySGFuZGxlcihvcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGltYWdlVGFnID0gdGhpcy5jbG91ZGluYXJ5LmltYWdlVGFnKHRoaXMucHVibGljSWQsIG9wdGlvbnMpO1xuXG4gICAgICB0aGlzLnNldEVsZW1lbnRBdHRyaWJ1dGVzKGltYWdlLCBpbWFnZVRhZy5hdHRyaWJ1dGVzKCkpO1xuICAgICAgaWYgKG9wdGlvbnMucmVzcG9uc2l2ZSkge1xuICAgICAgICB0aGlzLmNsb3VkaW5hcnkucmVzcG9uc2l2ZShpbWFnZSwgb3B0aW9ucyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0RWxlbWVudEF0dHJpYnV0ZXMoZWxlbWVudCwgYXR0cmlidXRlc0xpdGVyYWwpIHtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzTGl0ZXJhbCkuZm9yRWFjaChhdHRyTmFtZSA9PiB7XG4gICAgICBjb25zdCBhdHRyID0gYXR0ck5hbWUgPT09ICdzcmMnICYmIHRoaXMubG9hZGluZyA9PT0gJ2xhenknID8gJ2RhdGEtc3JjJyA6IGF0dHJOYW1lO1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0ciwgYXR0cmlidXRlc0xpdGVyYWxbYXR0ck5hbWVdKTtcbiAgICB9KTtcbiAgfVxuXG4gIHBsYWNlaG9sZGVySGFuZGxlcihvcHRpb25zKSB7XG4gICAgY29uc3QgcGxhY2Vob2xkZXJPcHRpb25zID0ge307XG5cbiAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgcGxhY2Vob2xkZXJPcHRpb25zW25hbWVdID0gKG5hbWUgPT09ICd3aWR0aCcgJiYgIW9wdGlvbnNbbmFtZV0uc3RhcnRzV2l0aCgnYXV0bycpIHx8IG5hbWUgPT09ICdoZWlnaHQnKSA/IE1hdGguZmxvb3IocGFyc2VJbnQob3B0aW9uc1tuYW1lXSwgMTApICogMC4xKSA6IG9wdGlvbnNbbmFtZV07XG4gICAgfSk7XG4gICAgdGhpcy5wbGFjZWhvbGRlckNvbXBvbmVudC5vcHRpb25zID0gcGxhY2Vob2xkZXJPcHRpb25zO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIFF1ZXJ5TGlzdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgT25Jbml0LFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgUExBVEZPUk1fSUQsXG4gIEluamVjdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDbG91ZGluYXJ5IH0gZnJvbSAnLi9jbG91ZGluYXJ5LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xvdWRpbmFyeVRyYW5zZm9ybWF0aW9uRGlyZWN0aXZlIH0gZnJvbSAnLi9jbG91ZGluYXJ5LXRyYW5zZm9ybWF0aW9uLmRpcmVjdGl2ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NsLXZpZGVvJyxcbiAgdGVtcGxhdGU6ICc8dmlkZW8+PC92aWRlbz4nXG59KVxuLy8gU2VlIGFsc28gdmlkZW8gcmVmZXJlbmNlIC0gaHR0cDovL2Nsb3VkaW5hcnkuY29tL2RvY3VtZW50YXRpb24vdmlkZW9fbWFuaXB1bGF0aW9uX2FuZF9kZWxpdmVyeSN2aWRlb190cmFuc2Zvcm1hdGlvbnNfcmVmZXJlbmNlXG5leHBvcnQgY2xhc3MgQ2xvdWRpbmFyeVZpZGVvXG4gIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgncHVibGljLWlkJykgcHVibGljSWQ6IHN0cmluZztcblxuICBAQ29udGVudENoaWxkcmVuKENsb3VkaW5hcnlUcmFuc2Zvcm1hdGlvbkRpcmVjdGl2ZSlcbiAgdHJhbnNmb3JtYXRpb25zOiBRdWVyeUxpc3Q8Q2xvdWRpbmFyeVRyYW5zZm9ybWF0aW9uRGlyZWN0aXZlPjtcblxuICBvYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlcjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIGNsb3VkaW5hcnk6IENsb3VkaW5hcnksIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0KSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0eXBlb2YgTXV0YXRpb25PYnNlcnZlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIENyZWF0ZSBhbiBvYnNlcnZlciBpbnN0YW5jZVxuICAgICAgdGhpcy5vYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgdGhpcy5sb2FkVmlkZW8odGhpcy5wdWJsaWNJZCk7XG4gICAgICB9KTtcbiAgICAgIC8vIE9ic2VydmUgY2hhbmdlcyB0byBhdHRyaWJ1dGVzIG9yIGNoaWxkIHRyYW5zZm9ybWF0aW9ucyB0byByZS1yZW5kZXIgdGhlIGltYWdlXG4gICAgICBjb25zdCBjb25maWcgPSB7IGF0dHJpYnV0ZXM6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZSB9O1xuXG4gICAgICAvLyBwYXNzIGluIHRoZSB0YXJnZXQgbm9kZSwgYXMgd2VsbCBhcyB0aGUgb2JzZXJ2ZXIgb3B0aW9uc1xuICAgICAgdGhpcy5vYnNlcnZlci5vYnNlcnZlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgY29uZmlnKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgLy8gTGlzdGVuIHRvIGNoYW5nZXMgb24gdGhlIGRhdGEtYm91bmQgcHJvcGVydHkgJ3B1YmxpY0lkJy5cbiAgICAvLyBVcGRhdGUgY29tcG9uZW50IHVubGVzcyB0aGlzIGlzIHRoZSBmaXJzdCB2YWx1ZSBhc3NpZ25lZC5cbiAgICBpZiAoY2hhbmdlcy5wdWJsaWNJZCAmJiAhY2hhbmdlcy5wdWJsaWNJZC5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMubG9hZFZpZGVvKGNoYW5nZXMucHVibGljSWQuY3VycmVudFZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vYnNlcnZlciAmJiB0aGlzLm9ic2VydmVyLmRpc2Nvbm5lY3QpIHtcbiAgICAgIHRoaXMub2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBpZiAoIXRoaXMucHVibGljSWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1lvdSBtdXN0IHNldCB0aGUgcHVibGljIGlkIG9mIHRoZSB2aWRlbyB0byBsb2FkLCBlLmcuIDxjbC12aWRlbyBwdWJsaWMtaWQ9e3t2aWRlby5wdWJsaWNfaWR9fS4uLj48L2NsLXZpZGVvPidcbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMubG9hZFZpZGVvKHRoaXMucHVibGljSWQpO1xuICB9XG5cbiAgbG9hZFZpZGVvKHB1YmxpY0lkOiBzdHJpbmcpIHtcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci91bml2ZXJzYWwjdW5pdmVyc2FsLWdvdGNoYXNcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcbiAgICAgIGNvbnN0IHZpZGVvID0gbmF0aXZlRWxlbWVudC5jaGlsZHJlblswXTtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmNsb3VkaW5hcnkudG9DbG91ZGluYXJ5QXR0cmlidXRlcyhcbiAgICAgICAgbmF0aXZlRWxlbWVudC5hdHRyaWJ1dGVzLFxuICAgICAgICB0aGlzLnRyYW5zZm9ybWF0aW9uc1xuICAgICAgKTtcblxuICAgICAgY29uc3QgdmlkZW9UYWcgPSB0aGlzLmNsb3VkaW5hcnkudmlkZW9UYWcocHVibGljSWQsIG9wdGlvbnMpO1xuXG4gICAgICAvLyBSZXBsYWNlIHRlbXBsYXRlIHdpdGggdGhlIGN1c3RvbSB2aWRlbyB0YWcgY3JlYXRlZCBieSBDbG91ZGluYXJ5XG4gICAgICB0aGlzLmFwcGVuZFNvdXJjZUVsZW1lbnRzKHZpZGVvLCB2aWRlb1RhZy5jb250ZW50KCkpO1xuICAgICAgLy8gQWRkIGF0dHJpYnV0ZXNcbiAgICAgIHRoaXMuc2V0RWxlbWVudEF0dHJpYnV0ZXModmlkZW8sIHZpZGVvVGFnLmF0dHJpYnV0ZXMoKSk7XG4gICAgfVxuICB9XG5cbiAgc2V0RWxlbWVudEF0dHJpYnV0ZXMoZWxlbWVudCwgYXR0cmlidXRlc0xpdGVyYWwpIHtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzTGl0ZXJhbCkuZm9yRWFjaChhdHRyTmFtZSA9PiB7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0cmlidXRlc0xpdGVyYWxbYXR0ck5hbWVdKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFwcGVuZFNvdXJjZUVsZW1lbnRzKGVsZW1lbnQsIGh0bWwpIHtcbiAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGh0bWw7XG5cbiAgICB3aGlsZSAoZWxlbWVudC5jaGlsZE5vZGVzWzBdKSB7XG4gICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChlbGVtZW50LmNoaWxkTm9kZXNbMF0pO1xuICAgIH1cbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKGZyYWdtZW50KTtcbiAgfVxufVxuIiwiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEFmdGVyVmlld0luaXQsIElucHV0LCBRdWVyeUxpc3QsIENvbnRlbnRDaGlsZHJlbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Nsb3VkaW5hcnl9IGZyb20gJy4vY2xvdWRpbmFyeS5zZXJ2aWNlJztcbmltcG9ydCB7Q2xvdWRpbmFyeVRyYW5zZm9ybWF0aW9uRGlyZWN0aXZlfSBmcm9tICcuL2Nsb3VkaW5hcnktdHJhbnNmb3JtYXRpb24uZGlyZWN0aXZlJztcbmltcG9ydCB7IGlzQnJvd3NlciB9IGZyb20gJy4vY2xvdWRpbmFyeS5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbY2xIcmVmXSwgW2NsU3JjXSwgW2NsU3Jjc2V0XSdcbn0pXG5leHBvcnQgY2xhc3MgQ2xvdWRpbmFyeUltYWdlU291cmNlRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICBASW5wdXQoKSBjbEhyZWY6IHN0cmluZztcbiAgICBASW5wdXQoKSBjbFNyYzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGNsU3Jjc2V0OiBzdHJpbmc7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKENsb3VkaW5hcnlUcmFuc2Zvcm1hdGlvbkRpcmVjdGl2ZSlcbiAgICB0cmFuc2Zvcm1hdGlvbnM6IFF1ZXJ5TGlzdDxDbG91ZGluYXJ5VHJhbnNmb3JtYXRpb25EaXJlY3RpdmU+O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBjbG91ZGluYXJ5OiBDbG91ZGluYXJ5KSB7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgaWYgKGlzQnJvd3NlcigpKSB7XG4gICAgICAgIGxldCBhdHRyTmFtZTogc3RyaW5nO1xuICAgICAgICBsZXQgcHJvcGVydHlWYWx1ZTogc3RyaW5nO1xuICAgICAgICBpZiAodGhpcy5jbEhyZWYpIHtcbiAgICAgICAgICAgIGF0dHJOYW1lID0gJ2hyZWYnO1xuICAgICAgICAgICAgcHJvcGVydHlWYWx1ZSA9IHRoaXMuY2xIcmVmO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2xTcmMpIHtcbiAgICAgICAgICAgIGF0dHJOYW1lID0gJ3NyYyc7XG4gICAgICAgICAgICBwcm9wZXJ0eVZhbHVlID0gdGhpcy5jbFNyYztcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNsU3Jjc2V0KSB7XG4gICAgICAgICAgICBhdHRyTmFtZSA9ICdzcmNzZXQnO1xuICAgICAgICAgICAgcHJvcGVydHlWYWx1ZSA9IHRoaXMuY2xTcmNzZXQ7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaXNTdmcgPSBmYWxzZTtcblxuICAgICAgICBpZiAodGhpcy5jbEhyZWYgJiZcbiAgICAgICAgICAgIHRvU3RyaW5nLmNhbGwodGhpcy5lbC5uYXRpdmVFbGVtZW50WydocmVmJ10gPT09ICdbb2JqZWN0IFNWR0FuaW1hdGVkU3RyaW5nXScpKSB7XG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCd4bGlua0hyZWYnLCAneGxpbms6aHJlZicpO1xuICAgICAgICAgICAgaXNTdmcgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFhdHRyTmFtZSB8fCAhcHJvcGVydHlWYWx1ZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEaXJlY3RpdmUgdmFsdWUgaXMgbWlzc2luZyBmb3IgY2xIcmVmL2NsU3JjL2NsU3Jjc2V0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuYXRpdmVFbGVtZW50ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5jbG91ZGluYXJ5LnRvQ2xvdWRpbmFyeUF0dHJpYnV0ZXMobmF0aXZlRWxlbWVudC5hdHRyaWJ1dGVzLCB0aGlzLnRyYW5zZm9ybWF0aW9ucyk7XG5cbiAgICAgICAgY29uc3QgYXR0clZhbHVlID0gdGhpcy5jbG91ZGluYXJ5LnVybChwcm9wZXJ0eVZhbHVlLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKTtcblxuICAgICAgICAvKlxuICAgICAgICAgb24gSUUsIGlmIFwibmdTcmNcIiBkaXJlY3RpdmUgZGVjbGFyYXRpb24gaXMgdXNlZCBhbmQgXCJzcmNcIiBhdHRyaWJ1dGUgZG9lc24ndCBleGlzdFxuICAgICAgICAgdGhlbiBjYWxsaW5nIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdzcmMnLCAnZm9vJykgZG9lc24ndCBkbyBhbnl0aGluZywgc28gd2UgbmVlZFxuICAgICAgICAgdG8gc2V0IHRoZSBwcm9wZXJ0eSBhcyB3ZWxsIHRvIGFjaGlldmUgdGhlIGRlc2lyZWQgZWZmZWN0LlxuXG4gICAgICAgICBDaGVjayBmb3IgSUU6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzMyMTM5Mzc1LzE5ODA5NVxuICAgICAgICAgaWYgaXMgSUUgdGhlbiBkb2N1bWVudE1vZGUgY29udGFpbnMgSUUgdmVyc2lvblxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgbXNpZSA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5vd25lckRvY3VtZW50LmRvY3VtZW50TW9kZTtcbiAgICAgICAgaWYgKG1zaWUgJiYgIWlzU3ZnKSB7XG4gICAgICAgICAgICAvLyBJRSBsb2dpYyBoZXJlXG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnRbYXR0ck5hbWVdID0gYXR0clZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbn1cbiIsImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBSZW5kZXJlcjIsIEFmdGVyVmlld0luaXQsIElucHV0LCBRdWVyeUxpc3QsIENvbnRlbnRDaGlsZHJlbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Nsb3VkaW5hcnl9IGZyb20gJy4vY2xvdWRpbmFyeS5zZXJ2aWNlJztcbmltcG9ydCB7Q2xvdWRpbmFyeVRyYW5zZm9ybWF0aW9uRGlyZWN0aXZlfSBmcm9tICcuL2Nsb3VkaW5hcnktdHJhbnNmb3JtYXRpb24uZGlyZWN0aXZlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbY2xCYWNrZ3JvdW5kSW1hZ2VdJ1xufSlcbmV4cG9ydCBjbGFzcyBDbG91ZGluYXJ5QmFja2dyb3VuZEltYWdlRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICBASW5wdXQoKSBjbEJhY2tncm91bmRJbWFnZTogc3RyaW5nO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihDbG91ZGluYXJ5VHJhbnNmb3JtYXRpb25EaXJlY3RpdmUpXG4gICAgdHJhbnNmb3JtYXRpb25zOiBRdWVyeUxpc3Q8Q2xvdWRpbmFyeVRyYW5zZm9ybWF0aW9uRGlyZWN0aXZlPjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBjbG91ZGluYXJ5OiBDbG91ZGluYXJ5KSB7XG4gICAgfVxuXG4gICAgaXNCcm93c2VyKCk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgIGlmICh0aGlzLmlzQnJvd3NlcigpKSB7XG4gICAgICAgIGNvbnN0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmNsb3VkaW5hcnkudG9DbG91ZGluYXJ5QXR0cmlidXRlcyhuYXRpdmVFbGVtZW50LmF0dHJpYnV0ZXMsIHRoaXMudHJhbnNmb3JtYXRpb25zKTtcbiAgICAgICAgY29uc3QgaW1hZ2VVcmwgPSB0aGlzLmNsb3VkaW5hcnkudXJsKHRoaXMuY2xCYWNrZ3JvdW5kSW1hZ2UsIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKG5hdGl2ZUVsZW1lbnQsICdiYWNrZ3JvdW5kLWltYWdlJywgYHVybCgnJHtpbWFnZVVybH0nKWApO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKG5hdGl2ZUVsZW1lbnQsICdiYWNrZ3JvdW5kLXJlcGVhdCcsICduby1yZXBlYXQnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShuYXRpdmVFbGVtZW50LCAnYmFja2dyb3VuZC1wb3NpdGlvbicsICdjZW50ZXInKTtcbiAgICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2NsLWltYWdlW2xvYWRpbmc9bGF6eV0nXG59KVxuZXhwb3J0IGNsYXNzIExhenlMb2FkRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICBpZiAoIXRoaXMuaXNOYXRpdmVMYXp5TG9hZFN1cHBvcnRlZCgpICYmIHRoaXMuaXNMYXp5TG9hZFN1cHBvcnRlZCgpKSB7XG4gICAgICAgIHRoaXMubGF6eUxvYWQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubG9hZEltYWdlKCk7XG4gICAgICB9XG4gIH1cblxuICBsb2FkSW1hZ2UoKSB7XG4gICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBpbWFnZSA9IG5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF07XG4gICAgaW1hZ2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBpbWFnZS5kYXRhc2V0LnNyYyk7XG4gIH1cblxuICBpc0xhenlMb2FkU3VwcG9ydGVkKCkge1xuICAgIHJldHVybiB3aW5kb3cgJiYgJ0ludGVyc2VjdGlvbk9ic2VydmVyJyBpbiB3aW5kb3c7XG4gIH1cblxuICBpc05hdGl2ZUxhenlMb2FkU3VwcG9ydGVkKCkge1xuICAgIHJldHVybiAnbG9hZGluZycgaW4gSFRNTEltYWdlRWxlbWVudC5wcm90b3R5cGU7IC8vIGNoZWNrIGxvYWRpbmcgcHJvcGVydHkgaXMgZGVmaW5lZCBvbiBpbWFnZSBvciBpZnJhbWVcbiAgfVxuXG4gIGxhenlMb2FkKCkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICByb290TWFyZ2luOiBgMHB4IDBweCAtNTAlIDBweGAsIC8vIE1hcmdpbiBhcm91bmQgdGhlIHJvb3RcbiAgICB9O1xuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKFxuICAgIChlbnRyaWVzKSA9PiB7XG4gICAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgICAgICAgdGhpcy5sb2FkSW1hZ2UoKTtcbiAgICAgICAgICAgIG9ic2VydmVyLnVub2JzZXJ2ZShlbnRyeS50YXJnZXQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgICB9KTtcbiAgICBvYnNlcnZlci5vYnNlcnZlKHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0Jztcbi8qIEFwcCBNb2R1bGUgKi9cbmltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENsb3VkaW5hcnkgfSBmcm9tICcuL2Nsb3VkaW5hcnkuc2VydmljZSc7XG5pbXBvcnQgeyBDbG91ZGluYXJ5SW1hZ2UgfSBmcm9tICcuL2Nsb3VkaW5hcnktaW1hZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IENsb3VkaW5hcnlWaWRlbyB9IGZyb20gJy4vY2xvdWRpbmFyeS12aWRlby5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2xvdWRpbmFyeVRyYW5zZm9ybWF0aW9uRGlyZWN0aXZlIH0gZnJvbSAnLi9jbG91ZGluYXJ5LXRyYW5zZm9ybWF0aW9uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDbG91ZGluYXJ5SW1hZ2VTb3VyY2VEaXJlY3RpdmUgfSBmcm9tICcuL2Nsb3VkaW5hcnktaW1hZ2Utc291cmNlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDbG91ZGluYXJ5QmFja2dyb3VuZEltYWdlRGlyZWN0aXZlIH0gZnJvbSAnLi9jbG91ZGluYXJ5LWJhY2tncm91bmQtaW1hZ2UuZGlyZWN0aXZlJztcbmltcG9ydCBDbG91ZGluYXJ5Q29uZmlndXJhdGlvbiBmcm9tICcuL2Nsb3VkaW5hcnktY29uZmlndXJhdGlvbi5jbGFzcyc7XG5pbXBvcnQgeyBMYXp5TG9hZERpcmVjdGl2ZSB9IGZyb20gJy4vY2xvdWRpbmFyeS1sYXp5LWxvYWQuZGlyZWN0aXZlJztcbmltcG9ydCB7IENsb3VkaW5hcnlQbGFjZUhvbGRlciB9IGZyb20gJy4vY2xvdWRpbmFyeS1wbGFjZWhvbGRlci5jb21wb25lbnQnO1xuXG4vLyBFeHBvcnQgZm9yIGxpYiBjb25zdW1lcnNcbmV4cG9ydCB7IENsb3VkaW5hcnlJbWFnZSB9IGZyb20gJy4vY2xvdWRpbmFyeS1pbWFnZS5jb21wb25lbnQnO1xuZXhwb3J0IHsgQ2xvdWRpbmFyeVZpZGVvIH0gZnJvbSAnLi9jbG91ZGluYXJ5LXZpZGVvLmNvbXBvbmVudCc7XG5leHBvcnQgeyBDbG91ZGluYXJ5VHJhbnNmb3JtYXRpb25EaXJlY3RpdmUgfSBmcm9tICcuL2Nsb3VkaW5hcnktdHJhbnNmb3JtYXRpb24uZGlyZWN0aXZlJztcbmV4cG9ydCB7IENsb3VkaW5hcnlJbWFnZVNvdXJjZURpcmVjdGl2ZSB9IGZyb20gJy4vY2xvdWRpbmFyeS1pbWFnZS1zb3VyY2UuZGlyZWN0aXZlJztcbmV4cG9ydCB7IENsb3VkaW5hcnlCYWNrZ3JvdW5kSW1hZ2VEaXJlY3RpdmUgfSBmcm9tICcuL2Nsb3VkaW5hcnktYmFja2dyb3VuZC1pbWFnZS5kaXJlY3RpdmUnO1xuZXhwb3J0IHsgTGF6eUxvYWREaXJlY3RpdmUgfSBmcm9tICcuL2Nsb3VkaW5hcnktbGF6eS1sb2FkLmRpcmVjdGl2ZSc7XG5leHBvcnQgeyBDbG91ZGluYXJ5UGxhY2VIb2xkZXIgfSBmcm9tJy4vY2xvdWRpbmFyeS1wbGFjZWhvbGRlci5jb21wb25lbnQnO1xuXG5cbmV4cG9ydCB7IENsb3VkaW5hcnksIHByb3ZpZGVDbG91ZGluYXJ5IH0gZnJvbSAnLi9jbG91ZGluYXJ5LnNlcnZpY2UnO1xuXG5leHBvcnQgeyBDbG91ZGluYXJ5Q29uZmlndXJhdGlvbiB9O1xuXG5leHBvcnQgY29uc3QgQ0xPVURJTkFSWV9MSUIgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ0NMT1VESU5BUllfTElCJyk7XG5leHBvcnQgY29uc3QgQ0xPVURJTkFSWV9DT05GSUdVUkFUSU9OID0gbmV3IEluamVjdGlvblRva2VuKCdDTE9VRElOQVJZX0NPTkZJR1VSQVRJT04nKTtcblxuLy8gRXhwb3J0IHRoaXMgZnVuY3Rpb24gdG8gQW5ndWxhcidzIEFPVCB0byB3b3JrXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ2xvdWRpbmFyeShjbG91ZGluYXJ5SnNMaWI6IG9iamVjdCwgY29uZmlndXJhdGlvbjogQ2xvdWRpbmFyeUNvbmZpZ3VyYXRpb24pIHtcbiAgcmV0dXJuIG5ldyBDbG91ZGluYXJ5KGNsb3VkaW5hcnlKc0xpYiwgY29uZmlndXJhdGlvbik7XG59O1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBDbG91ZGluYXJ5SW1hZ2VTb3VyY2VEaXJlY3RpdmUsXG4gICAgQ2xvdWRpbmFyeUJhY2tncm91bmRJbWFnZURpcmVjdGl2ZSxcbiAgICBDbG91ZGluYXJ5SW1hZ2UsXG4gICAgQ2xvdWRpbmFyeVZpZGVvLFxuICAgIENsb3VkaW5hcnlUcmFuc2Zvcm1hdGlvbkRpcmVjdGl2ZSxcbiAgICBMYXp5TG9hZERpcmVjdGl2ZSxcbiAgICBDbG91ZGluYXJ5UGxhY2VIb2xkZXIsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBDbG91ZGluYXJ5SW1hZ2VTb3VyY2VEaXJlY3RpdmUsXG4gICAgQ2xvdWRpbmFyeUJhY2tncm91bmRJbWFnZURpcmVjdGl2ZSxcbiAgICBDbG91ZGluYXJ5SW1hZ2UsXG4gICAgQ2xvdWRpbmFyeVZpZGVvLFxuICAgIENsb3VkaW5hcnlUcmFuc2Zvcm1hdGlvbkRpcmVjdGl2ZSxcbiAgICBMYXp5TG9hZERpcmVjdGl2ZSxcbiAgICBDbG91ZGluYXJ5UGxhY2VIb2xkZXJcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBDbG91ZGluYXJ5TW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY2xvdWRpbmFyeUpzTGliOiBvYmplY3QsIGNsb3VkaW5hcnlDb25maWd1cmF0aW9uOiBDbG91ZGluYXJ5Q29uZmlndXJhdGlvbik6IE1vZHVsZVdpdGhQcm92aWRlcnM8Q2xvdWRpbmFyeU1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQ2xvdWRpbmFyeU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IENMT1VESU5BUllfTElCLCB1c2VWYWx1ZTogY2xvdWRpbmFyeUpzTGliIH0sXG4gICAgICAgIHsgcHJvdmlkZTogQ0xPVURJTkFSWV9DT05GSUdVUkFUSU9OLCB1c2VWYWx1ZTogY2xvdWRpbmFyeUNvbmZpZ3VyYXRpb24gfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IENsb3VkaW5hcnksXG4gICAgICAgICAgdXNlRmFjdG9yeTogY3JlYXRlQ2xvdWRpbmFyeSxcbiAgICAgICAgICBkZXBzOiBbQ0xPVURJTkFSWV9MSUIsIENMT1VESU5BUllfQ09ORklHVVJBVElPTl1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJEaXJlY3RpdmUiLCJFbGVtZW50UmVmIiwiQ29tcG9uZW50IiwiSW5wdXQiLCJIb3N0QmluZGluZyIsIkV2ZW50RW1pdHRlciIsIkNvbnRlbnRDaGlsZHJlbiIsIkNvbnRlbnRDaGlsZCIsIk91dHB1dCIsImlzUGxhdGZvcm1Ccm93c2VyIiwiSW5qZWN0IiwiUExBVEZPUk1fSUQiLCJSZW5kZXJlcjIiLCJJbmplY3Rpb25Ub2tlbiIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7SUFBQTs7Ozs7Ozs7Ozs7Ozs7QUFjQSxvQkF5R3VCLENBQUMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLE9BQU8sTUFBTSxLQUFLLFVBQVUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxDQUFDO1lBQUUsT0FBTyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakMsSUFBSTtZQUNBLE9BQU8sQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLElBQUk7Z0JBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUU7UUFDRCxPQUFPLEtBQUssRUFBRTtZQUFF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