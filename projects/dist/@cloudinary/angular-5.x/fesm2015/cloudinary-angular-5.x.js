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
const isJsonLikeString = function (str) {
    // [\s\S] allows the string to contain new lines
    return str && typeof str === 'string' && (str.trim().match(/^{[\s\S]*?}$/) !== null);
};
/** @type {?} */
const isNamedNodeMap = function (obj) {
    return obj && (obj.constructor.name === 'NamedNodeMap' || obj instanceof NamedNodeMap);
};
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
class Cloudinary {
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
/**
 * @param {?} cloudinaryJsLib
 * @param {?} configuration
 * @return {?}
 */
function provideCloudinary(cloudinaryJsLib, configuration) {
    return { provide: Cloudinary, useFactory: () => new Cloudinary(cloudinaryJsLib, configuration) };
}
/** @type {?} */
const isBrowser = function () {
    return typeof window !== 'undefined';
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class CloudinaryTransformationDirective {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
    }
    /**
     * @return {?}
     */
    getAttributes() {
        return this.el.nativeElement.attributes;
    }
}
CloudinaryTransformationDirective.decorators = [
    { type: Directive, args: [{
                selector: 'cl-transformation'
            },] },
];
/** @nocollapse */
CloudinaryTransformationDirective.ctorParameters = () => [
    { type: ElementRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class CloudinaryPlaceHolder {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class CloudinaryImage {
    /**
     * @param {?} el
     * @param {?} cloudinary
     */
    constructor(el, cloudinary) {
        this.el = el;
        this.cloudinary = cloudinary;
        this.onLoad = new EventEmitter();
        this.onError = new EventEmitter();
        this.shouldShowPlaceHolder = true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (isBrowser()) {
            // Create an observer instance
            this.observer = new MutationObserver(() => {
                this.loadImage();
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
            this.loadImage();
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
        this.loadImage();
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        if (this.width && this.placeholderComponent) {
            this.placeholderComponent.setWidth(this.width);
        }
        if (this.height && this.placeholderComponent) {
            this.placeholderComponent.setHeight(this.height);
        }
        if (this.placeholderComponent) {
            this.placeholderComponent.setPublicId(this.publicId);
        }
    }
    /**
     * @return {?}
     */
    hasLoaded() {
        this.shouldShowPlaceHolder = false;
    }
    /**
     * @return {?}
     */
    loadImage() {
        // https://github.com/angular/universal#universal-gotchas
        // Fetch the image only for client side rendering by the browser
        if (isBrowser()) {
            if (!this.publicId) {
                throw new Error('You must set the public id of the image to load, e.g. <cl-image public-id={{photo.public_id}}...></cl-image>');
            }
            /** @type {?} */
            const nativeElement = this.el.nativeElement;
            /** @type {?} */
            const image = nativeElement.children[0];
            // Add onload and onerror handlers
            image.onload = e => {
                this.onLoad.emit(e);
            };
            image.onerror = e => {
                this.onError.emit(e);
            };
            /** @type {?} */
            const options = this.cloudinary.toCloudinaryAttributes(nativeElement.attributes, this.transformations);
            if (this.clientHints || (typeof this.clientHints === 'undefined' && this.cloudinary.config().client_hints)) {
                delete options['class'];
                delete options['data-src'];
                delete options['responsive'];
            }
            if (this.placeholderComponent) {
                this.placeholderHandler(options);
            }
            /** @type {?} */
            const imageTag = this.cloudinary.imageTag(this.publicId, options);
            this.setElementAttributes(image, imageTag.attributes());
            if (options.responsive) {
                this.cloudinary.responsive(image, options);
            }
        }
    }
    /**
     * @param {?} element
     * @param {?} attributesLiteral
     * @return {?}
     */
    setElementAttributes(element, attributesLiteral) {
        Object.keys(attributesLiteral).forEach(attrName => {
            /** @type {?} */
            const attr = attrName === 'src' && this.loading === 'lazy' ? 'data-src' : attrName;
            element.setAttribute(attr, attributesLiteral[attrName]);
        });
    }
    /**
     * @param {?} options
     * @return {?}
     */
    placeholderHandler(options) {
        /** @type {?} */
        const placeholderOptions = {};
        Object.keys(options).forEach(name => {
            placeholderOptions[name] = (name === 'width' && !options[name].startsWith('auto') || name === 'height') ? Math.floor(parseInt(options[name], 10) * 0.1) : options[name];
        });
        this.placeholderComponent.options = placeholderOptions;
    }
}
CloudinaryImage.decorators = [
    { type: Component, args: [{
                selector: 'cl-image',
                template: `<img [ngStyle]="{opacity: shouldShowPlaceHolder ? '0' : '1', position: shouldShowPlaceHolder ? 'absolute' : 'unset'}"(load)="hasLoaded()">
  <div [style.display]="shouldShowPlaceHolder ? 'inline' : 'none'">
      <ng-content></ng-content>
  </div>
  `,
            },] },
];
/** @nocollapse */
CloudinaryImage.ctorParameters = () => [
    { type: ElementRef },
    { type: Cloudinary }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// See also video reference - http://cloudinary.com/documentation/video_manipulation_and_delivery#video_transformations_reference
class CloudinaryVideo {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class CloudinaryImageSourceDirective {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class CloudinaryBackgroundImageDirective {
    /**
     * @param {?} renderer
     * @param {?} el
     * @param {?} cloudinary
     */
    constructor(renderer, el, cloudinary) {
        this.renderer = renderer;
        this.el = el;
        this.cloudinary = cloudinary;
    }
    /**
     * @return {?}
     */
    isBrowser() {
        return typeof window !== 'undefined';
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (this.isBrowser()) {
            /** @type {?} */
            const nativeElement = this.el.nativeElement;
            /** @type {?} */
            const options = this.cloudinary.toCloudinaryAttributes(nativeElement.attributes, this.transformations);
            /** @type {?} */
            const imageUrl = this.cloudinary.url(this.clBackgroundImage, options);
            this.renderer.setStyle(nativeElement, 'background-image', `url('${imageUrl}')`);
            this.renderer.setStyle(nativeElement, 'background-repeat', 'no-repeat');
            this.renderer.setStyle(nativeElement, 'background-position', 'center');
        }
    }
}
CloudinaryBackgroundImageDirective.decorators = [
    { type: Directive, args: [{
                selector: '[clBackgroundImage]'
            },] },
];
/** @nocollapse */
CloudinaryBackgroundImageDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: Cloudinary }
];
CloudinaryBackgroundImageDirective.propDecorators = {
    clBackgroundImage: [{ type: Input }],
    transformations: [{ type: ContentChildren, args: [CloudinaryTransformationDirective,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class LazyLoadDirective {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (!this.isNativeLazyLoadSupported() && this.isLazyLoadSupported()) {
            this.lazyLoad();
        }
        else {
            this.loadImage();
        }
    }
    /**
     * @return {?}
     */
    loadImage() {
        /** @type {?} */
        const nativeElement = this.el.nativeElement;
        /** @type {?} */
        const image = nativeElement.children[0];
        image.setAttribute('src', image.dataset.src);
    }
    /**
     * @return {?}
     */
    isLazyLoadSupported() {
        return window && 'IntersectionObserver' in window;
    }
    /**
     * @return {?}
     */
    isNativeLazyLoadSupported() {
        return 'loading' in HTMLImageElement.prototype; // check loading property is defined on image or iframe
    }
    /**
     * @return {?}
     */
    lazyLoad() {
        /** @type {?} */
        const options = {
            rootMargin: `0px 0px -50% 0px`,
        };
        /** @type {?} */
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage();
                    observer.unobserve(entry.target);
                }
            }, options);
        });
        observer.observe(this.el.nativeElement);
    }
}
LazyLoadDirective.decorators = [
    { type: Directive, args: [{
                selector: 'cl-image[loading=lazy]'
            },] },
];
/** @nocollapse */
LazyLoadDirective.ctorParameters = () => [
    { type: ElementRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const CLOUDINARY_LIB = new InjectionToken('CLOUDINARY_LIB');
/** @type {?} */
const CLOUDINARY_CONFIGURATION = new InjectionToken('CLOUDINARY_CONFIGURATION');
/**
 * @param {?} cloudinaryJsLib
 * @param {?} configuration
 * @return {?}
 */
function createCloudinary(cloudinaryJsLib, configuration) {
    return new Cloudinary(cloudinaryJsLib, configuration);
}
class CloudinaryModule {
    /**
     * @param {?} cloudinaryJsLib
     * @param {?} cloudinaryConfiguration
     * @return {?}
     */
    static forRoot(cloudinaryJsLib, cloudinaryConfiguration) {
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
    }
}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { provideCloudinary, Cloudinary, isJsonLikeString, isNamedNodeMap, transformKeyNames, namedNodeMapToObject, isBrowser, createCloudinary, CloudinaryImage, CloudinaryVideo, CloudinaryTransformationDirective, CloudinaryImageSourceDirective, CloudinaryBackgroundImageDirective, LazyLoadDirective, CloudinaryPlaceHolder, CLOUDINARY_LIB, CLOUDINARY_CONFIGURATION, CloudinaryModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWRpbmFyeS1hbmd1bGFyLTUueC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGNsb3VkaW5hcnkvYW5ndWxhci01LngvbGliL2Nsb3VkaW5hcnkuc2VydmljZS50cyIsIm5nOi8vQGNsb3VkaW5hcnkvYW5ndWxhci01LngvbGliL2Nsb3VkaW5hcnktdHJhbnNmb3JtYXRpb24uZGlyZWN0aXZlLnRzIiwibmc6Ly9AY2xvdWRpbmFyeS9hbmd1bGFyLTUueC9saWIvY2xvdWRpbmFyeS1wbGFjZWhvbGRlci5jb21wb25lbnQudHMiLCJuZzovL0BjbG91ZGluYXJ5L2FuZ3VsYXItNS54L2xpYi9jbG91ZGluYXJ5LWltYWdlLmNvbXBvbmVudC50cyIsIm5nOi8vQGNsb3VkaW5hcnkvYW5ndWxhci01LngvbGliL2Nsb3VkaW5hcnktdmlkZW8uY29tcG9uZW50LnRzIiwibmc6Ly9AY2xvdWRpbmFyeS9hbmd1bGFyLTUueC9saWIvY2xvdWRpbmFyeS1pbWFnZS1zb3VyY2UuZGlyZWN0aXZlLnRzIiwibmc6Ly9AY2xvdWRpbmFyeS9hbmd1bGFyLTUueC9saWIvY2xvdWRpbmFyeS1iYWNrZ3JvdW5kLWltYWdlLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGNsb3VkaW5hcnkvYW5ndWxhci01LngvbGliL2Nsb3VkaW5hcnktbGF6eS1sb2FkLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGNsb3VkaW5hcnkvYW5ndWxhci01LngvbGliL2Nsb3VkaW5hcnkubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IENsb3VkaW5hcnlDb25maWd1cmF0aW9uIGZyb20gJy4vY2xvdWRpbmFyeS1jb25maWd1cmF0aW9uLmNsYXNzJztcbmltcG9ydCB7IENsb3VkaW5hcnlUcmFuc2Zvcm1hdGlvbkRpcmVjdGl2ZSB9IGZyb20gJy4vY2xvdWRpbmFyeS10cmFuc2Zvcm1hdGlvbi5kaXJlY3RpdmUnO1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gc3RyaW5nIGJlZ2lucyB3aXRoIGEgbGVmdCBjdXJseSBicmFjZSBhbmQgZW5kcyB3aXRoIGEgcmlnaHQgY3VybHkgYnJhY2UsIGUuZy5cbiAqIFwie2FzZGFzIGR9XCIgd2lsbCByZXR1cm4gdHJ1ZSwgXCJhc2Rhc2R9XCIgd2lsbCByZXR1cm4gZmFsc2UuXG4gKlxuICogdGhpcyBmdW5jdGlvbiBkb2VzIG5vdCB2YWxpZGF0ZSB0aGUgY29ycmVjdG5lc3Mgb2YgdGhlIHN0cmluZyBjb250ZW50IG90aGVyIHRoYW4gdGhlIGZpcnN0IGFuZCBsYXN0IGNoYXJhY3RlclxuICogQHBhcmFtIHN0clxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5jb25zdCBpc0pzb25MaWtlU3RyaW5nID0gZnVuY3Rpb24gKHN0cjogYW55KTogYm9vbGVhbiB7XG4gIC8vIFtcXHNcXFNdIGFsbG93cyB0aGUgc3RyaW5nIHRvIGNvbnRhaW4gbmV3IGxpbmVzXG4gIHJldHVybiBzdHIgJiYgdHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgJiYgKHN0ci50cmltKCkubWF0Y2goL157W1xcc1xcU10qP30kLykgIT09IG51bGwpO1xufTtcblxuY29uc3QgaXNOYW1lZE5vZGVNYXAgPSBmdW5jdGlvbiAob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIG9iaiAmJiAob2JqLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdOYW1lZE5vZGVNYXAnIHx8IG9iaiBpbnN0YW5jZW9mIE5hbWVkTm9kZU1hcCk7XG59O1xuXG5jb25zdCBuYW1lZE5vZGVNYXBUb09iamVjdCA9IGZ1bmN0aW9uIChzb3VyY2U6IE5hbWVkTm9kZU1hcCk6IGFueSB7XG4gIGxldCB0YXJnZXQgPSB7fTtcbiAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGluZGV4ID0+IHtcbiAgICBjb25zdCBuYW1lID0gc291cmNlW2luZGV4XS5uYW1lO1xuICAgIGNvbnN0IHZhbHVlID0gc291cmNlW2luZGV4XS52YWx1ZTtcbiAgICB0YXJnZXRbbmFtZV0gPSB2YWx1ZTtcbiAgfSk7XG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG5jb25zdCB0cmFuc2Zvcm1LZXlOYW1lcyA9IGZ1bmN0aW9uIChvYmo6IGFueSk6IGFueSB7XG4gIGxldCBfb2JqID0gb2JqO1xuICBpZiAoaXNKc29uTGlrZVN0cmluZyhvYmopKSB7XG4gICAgLy8gR2l2ZW4gYXR0cmlidXRlIHZhbHVlIGlzIGluIHRoZSBmb3JtIG9mIGEgSlNPTiBvYmplY3QgLVxuICAgIC8vIFRyYW5zZm9ybXMgdGhlIHN0cmluZyBpbnRvIGFuIG9iamVjdCwgYXMgdGhlIEphdmFzY3JpcHQgQVBJIGV4cGVjdHNcbiAgICBfb2JqID0gSlNPTi5wYXJzZShvYmopO1xuICB9IGVsc2UgaWYgKGlzTmFtZWROb2RlTWFwKG9iaikpIHtcbiAgICBfb2JqID0gbmFtZWROb2RlTWFwVG9PYmplY3Qob2JqKTtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KF9vYmopKSB7XG4gICAgLy8gVHJhbnNmb3JtIGFsbCB0aGUgYXJyYXkgdmFsdWVzIChlLmcuIHRyYW5zZm9ybWF0aW9uIGFycmF5KVxuICAgIF9vYmogPSBfb2JqLm1hcChjdXJyZW50VmFsdWUgPT4ge1xuICAgICAgcmV0dXJuIHRyYW5zZm9ybUtleU5hbWVzKGN1cnJlbnRWYWx1ZSk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIF9vYmogPT09ICdvYmplY3QnKSB7XG4gICAgT2JqZWN0LmtleXMoX29iaikuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgLy8gUmVwbGFjZSB0aGUga2V5IG5hbWUgd2l0aCB0aGUgc25ha2VfY2FzZVxuICAgICAgLy8gVGhlbiBzdHJpcCBjbGQgcHJlZml4IGlmIGl0IGV4aXN0cyAod2l0aCBhbiBvcHRpb25hbCBkYXNoIG9yIHVuZGVyc2NvcmUpXG4gICAgICBjb25zdCBrZWJhYktleSA9IGtleS5yZXBsYWNlKC8tL2csICdfJykudG9Mb2NhbGVMb3dlckNhc2UoKS5yZXBsYWNlKC9eY2xkKC18Xyk/LywgJycpO1xuICAgICAgY29uc3Qga2ViYWJWYWx1ZSA9IHRyYW5zZm9ybUtleU5hbWVzKF9vYmpba2V5XSk7XG4gICAgICBkZWxldGUgX29ialtrZXldO1xuICAgICAgX29ialtrZWJhYktleV0gPSBrZWJhYlZhbHVlO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBfb2JqO1xufTtcblxuZXhwb3J0IGNsYXNzIENsb3VkaW5hcnkge1xuICBfY2xvdWRpbmFyeUluc3RhbmNlOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoY2xvdWRpbmFyeUpzTGliOiBhbnksIGNvbmZpZ3VyYXRpb246IENsb3VkaW5hcnlDb25maWd1cmF0aW9uKSB7XG4gICAgLy8gQ2xvdWRpbmFyeSBKUyBhbHJlYWR5IGNsb25lcyB0aGUgZ2l2ZW4gY29uZmlndXJhdGlvbiBzbyBubyBuZWVkIHRvIGNsb25lIGl0IGhlcmUgdG9vXG4gICAgaWYgKGNsb3VkaW5hcnlKc0xpYi5DbG91ZGluYXJ5SlF1ZXJ5KSB7XG4gICAgICB0aGlzLl9jbG91ZGluYXJ5SW5zdGFuY2UgPSBuZXcgY2xvdWRpbmFyeUpzTGliLkNsb3VkaW5hcnlKUXVlcnkoY29uZmlndXJhdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2Nsb3VkaW5hcnlJbnN0YW5jZSA9IG5ldyBjbG91ZGluYXJ5SnNMaWIuQ2xvdWRpbmFyeShjb25maWd1cmF0aW9uKTtcbiAgICB9XG4gIH1cblxuICBnZXQgY2xvdWRpbmFyeUluc3RhbmNlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2Nsb3VkaW5hcnlJbnN0YW5jZTtcbiAgfVxuXG4gIGNvbmZpZygpIHtcbiAgICByZXR1cm4gdGhpcy5fY2xvdWRpbmFyeUluc3RhbmNlLmNvbmZpZygpO1xuICB9XG5cbiAgdXJsKC4uLnBhcmFtZXRlcnMpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9jbG91ZGluYXJ5SW5zdGFuY2UudXJsKC4uLnBhcmFtZXRlcnMpO1xuICB9XG5cbiAgaW1hZ2VUYWcoLi4ucGFyYW1ldGVycyk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2Nsb3VkaW5hcnlJbnN0YW5jZS5pbWFnZVRhZyguLi5wYXJhbWV0ZXJzKTtcbiAgfVxuXG4gIHZpZGVvVGFnKC4uLnBhcmFtZXRlcnMpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9jbG91ZGluYXJ5SW5zdGFuY2UudmlkZW9UYWcoLi4ucGFyYW1ldGVycyk7XG4gIH1cblxuICByZXNwb25zaXZlKGltZzogSFRNTEltYWdlRWxlbWVudCwgb3B0aW9uczogYW55KTogdm9pZCB7XG4gICAgLy8gQ2xvdWRpbmFyeSB1bmRlcmx5aW5nIEpTIGxpYnJhcnkgd2lsbCBoYW5kbGUgcmVzcG9uc2l2ZSBiZWhhdmlvclxuICAgIHRoaXMuX2Nsb3VkaW5hcnlJbnN0YW5jZS5jbG91ZGluYXJ5X3VwZGF0ZShpbWcsIG9wdGlvbnMpO1xuICAgIHRoaXMuX2Nsb3VkaW5hcnlJbnN0YW5jZS5yZXNwb25zaXZlKG9wdGlvbnMsIGZhbHNlKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFRyYW5zZm9ybXMgYSBzZXQgb2YgYXR0cmlidXRlcyBhbmQgY2hhaW5lZCB0cmFuc2Zvcm1hdGlvbnMgdG8gYW4gb3B0aW9ucyBvYmplY3QgdGhhdCBjYW4gYmUgY29uc3VtZWQgYnkgQ2xvdWRpbmFyeSBKUyBBUElcbiAgICogQHBhcmFtIGF0dHJpYnV0ZXMgSFRNTCBlbGVtZW50IGF0dHJpYnV0ZXNcbiAgICogQHBhcmFtIGNoaWxkVHJhbnNmb3JtYXRpb25zIFF1ZXJ5TGlzdCB3aXRoIHRoZSBlbGVtZW50J3MgPGNsLXRyYW5zZm9ybWF0aW9uPiBjaGlsZHJlbiBmb3IgY2hhaW5lZCB0cmFuc2Zvcm1hdGlvbnNcbiAgICogQHBhcmFtIGNsb3VkaW5hcnkgQ2xvdWRpbmFyeSBzZXJ2aWNlXG4gICAqIEByZXR1cm5zIEFuIG9wdGlvbnMgb2JqZWN0IHRoYXQgY2FuIGJlIGNvbnN1bWVkIGJ5IENsb3VkaW5hcnkgSlMgQVBJXG4gICAqL1xuICB0b0Nsb3VkaW5hcnlBdHRyaWJ1dGVzKGF0dHJpYnV0ZXM6IE5hbWVkTm9kZU1hcCxcbiAgICBjaGlsZFRyYW5zZm9ybWF0aW9ucz86IFF1ZXJ5TGlzdDxDbG91ZGluYXJ5VHJhbnNmb3JtYXRpb25EaXJlY3RpdmU+KTogYW55IHtcbiAgICBjb25zdCBvcHRpb25zID0gdHJhbnNmb3JtS2V5TmFtZXMoYXR0cmlidXRlcyk7XG5cbiAgICAvLyBBZGQgY2hhaW5lZCB0cmFuc2Zvcm1hdGlvbnNcbiAgICBpZiAoY2hpbGRUcmFuc2Zvcm1hdGlvbnMgJiYgY2hpbGRUcmFuc2Zvcm1hdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgb3B0aW9ucy50cmFuc2Zvcm1hdGlvbiA9IFtdO1xuICAgICAgLy8gU3VwcG9ydCBjaGFpbmVkIHRyYW5zZm9ybWF0aW9uc1xuICAgICAgY2hpbGRUcmFuc2Zvcm1hdGlvbnMuZm9yRWFjaCh0cmFuc2Zvcm1hdGlvbiA9PiB7XG4gICAgICAgIG9wdGlvbnMudHJhbnNmb3JtYXRpb24ucHVzaCh0aGlzLnRvQ2xvdWRpbmFyeUF0dHJpYnV0ZXModHJhbnNmb3JtYXRpb24uZ2V0QXR0cmlidXRlcygpKSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2l2ZW5lc3NcbiAgICBpZiAob3B0aW9ucy5yZXNwb25zaXZlID09PSAnJyB8fCBvcHRpb25zLnJlc3BvbnNpdmUgPT09ICd0cnVlJyB8fCBvcHRpb25zLnJlc3BvbnNpdmUgPT09IHRydWUpIHtcbiAgICAgIG9wdGlvbnMucmVzcG9uc2l2ZSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xuXG4gIH07XG59XG5cbi8qIFJldHVybiBhIHByb3ZpZGVyIG9iamVjdCB0aGF0IGNyZWF0ZXMgb3VyIGNvbmZpZ3VyYWJsZSBzZXJ2aWNlICovXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZUNsb3VkaW5hcnkoY2xvdWRpbmFyeUpzTGliOiBhbnksIGNvbmZpZ3VyYXRpb246IENsb3VkaW5hcnlDb25maWd1cmF0aW9uKSB7XG4gIHJldHVybiB7IHByb3ZpZGU6IENsb3VkaW5hcnksIHVzZUZhY3Rvcnk6ICgpID0+IG5ldyBDbG91ZGluYXJ5KGNsb3VkaW5hcnlKc0xpYiwgY29uZmlndXJhdGlvbikgfTtcbn07XG5cbmNvbnN0IGlzQnJvd3NlciA9IGZ1bmN0aW9uICgpOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnO1xufVxuXG4vLyBGb3IgdW5pdCB0ZXN0c1xuZXhwb3J0IHsgaXNKc29uTGlrZVN0cmluZywgaXNOYW1lZE5vZGVNYXAsIHRyYW5zZm9ybUtleU5hbWVzLCBuYW1lZE5vZGVNYXBUb09iamVjdCwgaXNCcm93c2VyIH07XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnY2wtdHJhbnNmb3JtYXRpb24nXG59KVxuZXhwb3J0IGNsYXNzIENsb3VkaW5hcnlUcmFuc2Zvcm1hdGlvbkRpcmVjdGl2ZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikge1xuICB9XG5cbiAgZ2V0QXR0cmlidXRlcygpOiBOYW1lZE5vZGVNYXAge1xuICAgIHJldHVybiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYXR0cmlidXRlcztcbiAgfVxufVxuXG4iLCJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICBDb21wb25lbnQsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Nsb3VkaW5hcnl9IGZyb20gJy4vY2xvdWRpbmFyeS5zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ2NsLXBsYWNlaG9sZGVyJyxcbiAgdGVtcGxhdGU6IGA8aW1nIFtzcmNdPVwidGhpcy5wbGFjZWhvbGRlckltZ1wiIFtzdHlsZS53aWR0aC5weF09XCJ0aGlzLml0ZW1XaWR0aFwiIFtzdHlsZS5oZWlnaHQucHhdPVwidGhpcy5pdGVtSGVpZ2h0XCI+YFxuICAsXG59KVxuZXhwb3J0IGNsYXNzIENsb3VkaW5hcnlQbGFjZUhvbGRlciBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQge1xuICBASW5wdXQoJ3R5cGUnKSB0eXBlOiBzdHJpbmc7XG4gIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgnKSBpdGVtV2lkdGg7XG4gIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0JykgaXRlbUhlaWdodDtcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnB1YmxpYy1pZCcpIHB1YmxpY0lkO1xuXG4gIG9wdGlvbnM6IG9iamVjdCA9IHt9O1xuICBwbGFjZWhvbGRlckltZzogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2xvdWRpbmFyeTogQ2xvdWRpbmFyeSkge31cblxuICBzZXRXaWR0aCh3aWR0aCkge1xuICAgIHRoaXMuaXRlbVdpZHRoID0gd2lkdGg7XG4gIH1cblxuICBzZXRIZWlnaHQoaGVpZ2h0KSB7XG4gICAgdGhpcy5pdGVtSGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgc2V0UHVibGljSWQoaWQpIHtcbiAgICB0aGlzLnB1YmxpY0lkID0gaWQ7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgdGhpcy5wbGFjZWhvbGRlckltZyA9IHRoaXMuZ2V0UGxhY2Vob2xkZXJJbWFnZSgpO1xuICB9XG5cbiAgZ2V0UGxhY2Vob2xkZXJJbWFnZSgpIHtcbiAgICBjb25zdCBwbGFjZWhvbGRlckltYWdlT3B0aW9ucyA9IHtcbiAgICAgICd2ZWN0b3JpemUnOiB7ZWZmZWN0OiAndmVjdG9yaXplJywgcXVhbGl0eTogMX0sXG4gICAgICAncGl4ZWxhdGUnOiB7ZWZmZWN0OiAncGl4ZWxhdGUnLCBxdWFsaXR5OiAxLCBmZXRjaF9mb3JtYXQ6ICdhdXRvJ30sXG4gICAgICAnYmx1cic6IHtlZmZlY3Q6ICdibHVyOjIwMDAnLCBxdWFsaXR5OiAxLCBmZXRjaF9mb3JtYXQ6ICdhdXRvJ30sXG4gICAgICAnc29saWQnOiBbXG4gICAgICAgIHt3aWR0aDogJ2l3X2Rpdl8yJywgYXNwZWN0X3JhdGlvOiAxLCBjcm9wOiAncGFkJywgYmFja2dyb3VuZDogJ2F1dG8nfSxcbiAgICAgICAge2Nyb3A6ICdjcm9wJywgd2lkdGg6IDEwLCBoZWlnaHQ6IDEwLCBncmF2aXR5OiAnbm9ydGhfZWFzdCd9LFxuICAgICAgICB7d2lkdGg6ICdpdycsIGhlaWdodDogJ2loJywgY3JvcDogJ2ZpbGwnfSxcbiAgICAgICAge2ZldGNoX2Zvcm1hdDogJ2F1dG8nLCBxdWFsaXR5OiAnYXV0byd9XVxuICAgIH1cbiAgICBjb25zdCB0cmFuc2Zvcm1hdGlvbiA9IFtdLmNvbmNhdC5hcHBseShbXSwgW3RoaXMub3B0aW9ucywgcGxhY2Vob2xkZXJJbWFnZU9wdGlvbnNbdGhpcy50eXBlXSB8fCBwbGFjZWhvbGRlckltYWdlT3B0aW9uc1snYmx1ciddXSk7XG4gICAgY29uc3QgdGVzdCA9IHRoaXMuY2xvdWRpbmFyeS51cmwodGhpcy5wdWJsaWNJZCwge3RyYW5zZm9ybWF0aW9uOiB0cmFuc2Zvcm1hdGlvbn0pO1xuXG4gICAgcmV0dXJuIHRlc3Q7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIFF1ZXJ5TGlzdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgT25Jbml0LFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgQ29udGVudENoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENsb3VkaW5hcnkgfSBmcm9tICcuL2Nsb3VkaW5hcnkuc2VydmljZSc7XG5pbXBvcnQgeyBDbG91ZGluYXJ5VHJhbnNmb3JtYXRpb25EaXJlY3RpdmUgfSBmcm9tICcuL2Nsb3VkaW5hcnktdHJhbnNmb3JtYXRpb24uZGlyZWN0aXZlJztcbmltcG9ydCB7IENsb3VkaW5hcnlQbGFjZUhvbGRlciB9IGZyb20gJy4vY2xvdWRpbmFyeS1wbGFjZWhvbGRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgaXNCcm93c2VyIH0gZnJvbSAnLi9jbG91ZGluYXJ5LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbC1pbWFnZScsXG4gIHRlbXBsYXRlOiBgPGltZyBbbmdTdHlsZV09XCJ7b3BhY2l0eTogc2hvdWxkU2hvd1BsYWNlSG9sZGVyID8gJzAnIDogJzEnLCBwb3NpdGlvbjogc2hvdWxkU2hvd1BsYWNlSG9sZGVyID8gJ2Fic29sdXRlJyA6ICd1bnNldCd9XCIobG9hZCk9XCJoYXNMb2FkZWQoKVwiPlxuICA8ZGl2IFtzdHlsZS5kaXNwbGF5XT1cInNob3VsZFNob3dQbGFjZUhvbGRlciA/ICdpbmxpbmUnIDogJ25vbmUnXCI+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBDbG91ZGluYXJ5SW1hZ2VcbiAgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkluaXQsIEFmdGVyVmlld0luaXQsIEFmdGVyQ29udGVudENoZWNrZWQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgQElucHV0KCdwdWJsaWMtaWQnKSBwdWJsaWNJZDogc3RyaW5nO1xuICBASW5wdXQoJ2NsaWVudC1oaW50cycpIGNsaWVudEhpbnRzPzogYm9vbGVhbjtcbiAgQElucHV0KCdsb2FkaW5nJykgbG9hZGluZzogc3RyaW5nO1xuICBASW5wdXQoJ3dpZHRoJykgd2lkdGg/OiBzdHJpbmc7XG4gIEBJbnB1dCgnaGVpZ2h0JykgaGVpZ2h0Pzogc3RyaW5nO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oQ2xvdWRpbmFyeVRyYW5zZm9ybWF0aW9uRGlyZWN0aXZlKVxuICB0cmFuc2Zvcm1hdGlvbnM6IFF1ZXJ5TGlzdDxDbG91ZGluYXJ5VHJhbnNmb3JtYXRpb25EaXJlY3RpdmU+O1xuICBAQ29udGVudENoaWxkKENsb3VkaW5hcnlQbGFjZUhvbGRlcikgcGxhY2Vob2xkZXJDb21wb25lbnQ6IENsb3VkaW5hcnlQbGFjZUhvbGRlcjtcblxuICBAT3V0cHV0KCkgb25Mb2FkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7IC8vIENhbGxiYWNrIHdoZW4gYW4gaW1hZ2UgaXMgbG9hZGVkIHN1Y2Nlc3NmdWxseVxuICBAT3V0cHV0KCkgb25FcnJvcjogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpOyAvLyBDYWxsYmFjayB3aGVuIGFuIGltYWdlIGlzIGxvYWRlZCB3aXRoIGVycm9yXG5cbiAgb2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXI7XG4gIHNob3VsZFNob3dQbGFjZUhvbGRlciA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBjbG91ZGluYXJ5OiBDbG91ZGluYXJ5KSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmIChpc0Jyb3dzZXIoKSkge1xuICAgICAgLy8gQ3JlYXRlIGFuIG9ic2VydmVyIGluc3RhbmNlXG4gICAgICB0aGlzLm9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICB0aGlzLmxvYWRJbWFnZSgpO1xuICAgICAgfSk7XG4gICAgICAvLyBPYnNlcnZlIGNoYW5nZXMgdG8gYXR0cmlidXRlcyBvciBjaGlsZCB0cmFuc2Zvcm1hdGlvbnMgdG8gcmUtcmVuZGVyIHRoZSBpbWFnZVxuICAgICAgY29uc3QgY29uZmlnID0geyBhdHRyaWJ1dGVzOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUgfTtcblxuICAgICAgLy8gcGFzcyBpbiB0aGUgdGFyZ2V0IG5vZGUsIGFzIHdlbGwgYXMgdGhlIG9ic2VydmVyIG9wdGlvbnNcbiAgICAgIHRoaXMub2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIGNvbmZpZyk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIC8vIExpc3RlbiB0byBjaGFuZ2VzIG9uIHRoZSBkYXRhLWJvdW5kIHByb3BlcnR5ICdwdWJsaWNJZCcuXG4gICAgLy8gVXBkYXRlIGNvbXBvbmVudCB1bmxlc3MgdGhpcyBpcyB0aGUgZmlyc3QgdmFsdWUgYXNzaWduZWQuXG4gICAgaWYgKGNoYW5nZXMucHVibGljSWQgJiYgIWNoYW5nZXMucHVibGljSWQuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLmxvYWRJbWFnZSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9ic2VydmVyICYmIHRoaXMub2JzZXJ2ZXIuZGlzY29ubmVjdCkge1xuICAgICAgdGhpcy5vYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMubG9hZEltYWdlKCk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgaWYgKHRoaXMud2lkdGggJiYgdGhpcy5wbGFjZWhvbGRlckNvbXBvbmVudCkge1xuICAgICAgdGhpcy5wbGFjZWhvbGRlckNvbXBvbmVudC5zZXRXaWR0aCh0aGlzLndpZHRoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaGVpZ2h0ICYmIHRoaXMucGxhY2Vob2xkZXJDb21wb25lbnQpIHtcbiAgICAgIHRoaXMucGxhY2Vob2xkZXJDb21wb25lbnQuc2V0SGVpZ2h0KHRoaXMuaGVpZ2h0KTtcbiAgICB9XG4gICAgaWYgKHRoaXMucGxhY2Vob2xkZXJDb21wb25lbnQpIHtcbiAgICAgIHRoaXMucGxhY2Vob2xkZXJDb21wb25lbnQuc2V0UHVibGljSWQodGhpcy5wdWJsaWNJZCk7XG4gICAgfVxuICB9XG5cbiAgaGFzTG9hZGVkKCkge1xuICAgIHRoaXMuc2hvdWxkU2hvd1BsYWNlSG9sZGVyID0gZmFsc2U7XG4gIH1cblxuICBsb2FkSW1hZ2UoKSB7XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvdW5pdmVyc2FsI3VuaXZlcnNhbC1nb3RjaGFzXG4gICAgLy8gRmV0Y2ggdGhlIGltYWdlIG9ubHkgZm9yIGNsaWVudCBzaWRlIHJlbmRlcmluZyBieSB0aGUgYnJvd3NlclxuICAgIGlmIChpc0Jyb3dzZXIoKSkge1xuICAgICAgaWYgKCF0aGlzLnB1YmxpY0lkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnWW91IG11c3Qgc2V0IHRoZSBwdWJsaWMgaWQgb2YgdGhlIGltYWdlIHRvIGxvYWQsIGUuZy4gPGNsLWltYWdlIHB1YmxpYy1pZD17e3Bob3RvLnB1YmxpY19pZH19Li4uPjwvY2wtaW1hZ2U+J1xuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcbiAgICAgIGNvbnN0IGltYWdlID0gbmF0aXZlRWxlbWVudC5jaGlsZHJlblswXTtcbiAgICAgIC8vIEFkZCBvbmxvYWQgYW5kIG9uZXJyb3IgaGFuZGxlcnNcbiAgICAgIGltYWdlLm9ubG9hZCA9IGUgPT4ge1xuICAgICAgICB0aGlzLm9uTG9hZC5lbWl0KGUpO1xuICAgICAgfTtcbiAgICAgIGltYWdlLm9uZXJyb3IgPSBlID0+IHtcbiAgICAgICAgdGhpcy5vbkVycm9yLmVtaXQoZSk7XG4gICAgICB9O1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuY2xvdWRpbmFyeS50b0Nsb3VkaW5hcnlBdHRyaWJ1dGVzKFxuICAgICAgICBuYXRpdmVFbGVtZW50LmF0dHJpYnV0ZXMsXG4gICAgICAgIHRoaXMudHJhbnNmb3JtYXRpb25zXG4gICAgICApO1xuICAgICAgaWYgKHRoaXMuY2xpZW50SGludHMgfHwgKHR5cGVvZiB0aGlzLmNsaWVudEhpbnRzID09PSAndW5kZWZpbmVkJyAmJiB0aGlzLmNsb3VkaW5hcnkuY29uZmlnKCkuY2xpZW50X2hpbnRzKSkge1xuICAgICAgICBkZWxldGUgb3B0aW9uc1snY2xhc3MnXTtcbiAgICAgICAgZGVsZXRlIG9wdGlvbnNbJ2RhdGEtc3JjJ107XG4gICAgICAgIGRlbGV0ZSBvcHRpb25zWydyZXNwb25zaXZlJ107XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5wbGFjZWhvbGRlckNvbXBvbmVudCkge1xuICAgICAgICB0aGlzLnBsYWNlaG9sZGVySGFuZGxlcihvcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGltYWdlVGFnID0gdGhpcy5jbG91ZGluYXJ5LmltYWdlVGFnKHRoaXMucHVibGljSWQsIG9wdGlvbnMpO1xuXG4gICAgICB0aGlzLnNldEVsZW1lbnRBdHRyaWJ1dGVzKGltYWdlLCBpbWFnZVRhZy5hdHRyaWJ1dGVzKCkpO1xuICAgICAgaWYgKG9wdGlvbnMucmVzcG9uc2l2ZSkge1xuICAgICAgICB0aGlzLmNsb3VkaW5hcnkucmVzcG9uc2l2ZShpbWFnZSwgb3B0aW9ucyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0RWxlbWVudEF0dHJpYnV0ZXMoZWxlbWVudCwgYXR0cmlidXRlc0xpdGVyYWwpIHtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzTGl0ZXJhbCkuZm9yRWFjaChhdHRyTmFtZSA9PiB7XG4gICAgICBjb25zdCBhdHRyID0gYXR0ck5hbWUgPT09ICdzcmMnICYmIHRoaXMubG9hZGluZyA9PT0gJ2xhenknID8gJ2RhdGEtc3JjJyA6IGF0dHJOYW1lO1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0ciwgYXR0cmlidXRlc0xpdGVyYWxbYXR0ck5hbWVdKTtcbiAgICB9KTtcbiAgfVxuXG4gIHBsYWNlaG9sZGVySGFuZGxlcihvcHRpb25zKSB7XG4gICAgY29uc3QgcGxhY2Vob2xkZXJPcHRpb25zID0ge307XG5cbiAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgcGxhY2Vob2xkZXJPcHRpb25zW25hbWVdID0gKG5hbWUgPT09ICd3aWR0aCcgJiYgIW9wdGlvbnNbbmFtZV0uc3RhcnRzV2l0aCgnYXV0bycpIHx8IG5hbWUgPT09ICdoZWlnaHQnKSA/IE1hdGguZmxvb3IocGFyc2VJbnQob3B0aW9uc1tuYW1lXSwgMTApICogMC4xKSA6IG9wdGlvbnNbbmFtZV07XG4gICAgfSk7XG4gICAgdGhpcy5wbGFjZWhvbGRlckNvbXBvbmVudC5vcHRpb25zID0gcGxhY2Vob2xkZXJPcHRpb25zO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIFF1ZXJ5TGlzdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgT25Jbml0LFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgUExBVEZPUk1fSUQsXG4gIEluamVjdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDbG91ZGluYXJ5IH0gZnJvbSAnLi9jbG91ZGluYXJ5LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xvdWRpbmFyeVRyYW5zZm9ybWF0aW9uRGlyZWN0aXZlIH0gZnJvbSAnLi9jbG91ZGluYXJ5LXRyYW5zZm9ybWF0aW9uLmRpcmVjdGl2ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NsLXZpZGVvJyxcbiAgdGVtcGxhdGU6ICc8dmlkZW8+PC92aWRlbz4nXG59KVxuLy8gU2VlIGFsc28gdmlkZW8gcmVmZXJlbmNlIC0gaHR0cDovL2Nsb3VkaW5hcnkuY29tL2RvY3VtZW50YXRpb24vdmlkZW9fbWFuaXB1bGF0aW9uX2FuZF9kZWxpdmVyeSN2aWRlb190cmFuc2Zvcm1hdGlvbnNfcmVmZXJlbmNlXG5leHBvcnQgY2xhc3MgQ2xvdWRpbmFyeVZpZGVvXG4gIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgncHVibGljLWlkJykgcHVibGljSWQ6IHN0cmluZztcblxuICBAQ29udGVudENoaWxkcmVuKENsb3VkaW5hcnlUcmFuc2Zvcm1hdGlvbkRpcmVjdGl2ZSlcbiAgdHJhbnNmb3JtYXRpb25zOiBRdWVyeUxpc3Q8Q2xvdWRpbmFyeVRyYW5zZm9ybWF0aW9uRGlyZWN0aXZlPjtcblxuICBvYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlcjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIGNsb3VkaW5hcnk6IENsb3VkaW5hcnksIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0KSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0eXBlb2YgTXV0YXRpb25PYnNlcnZlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIENyZWF0ZSBhbiBvYnNlcnZlciBpbnN0YW5jZVxuICAgICAgdGhpcy5vYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgdGhpcy5sb2FkVmlkZW8odGhpcy5wdWJsaWNJZCk7XG4gICAgICB9KTtcbiAgICAgIC8vIE9ic2VydmUgY2hhbmdlcyB0byBhdHRyaWJ1dGVzIG9yIGNoaWxkIHRyYW5zZm9ybWF0aW9ucyB0byByZS1yZW5kZXIgdGhlIGltYWdlXG4gICAgICBjb25zdCBjb25maWcgPSB7IGF0dHJpYnV0ZXM6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZSB9O1xuXG4gICAgICAvLyBwYXNzIGluIHRoZSB0YXJnZXQgbm9kZSwgYXMgd2VsbCBhcyB0aGUgb2JzZXJ2ZXIgb3B0aW9uc1xuICAgICAgdGhpcy5vYnNlcnZlci5vYnNlcnZlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgY29uZmlnKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgLy8gTGlzdGVuIHRvIGNoYW5nZXMgb24gdGhlIGRhdGEtYm91bmQgcHJvcGVydHkgJ3B1YmxpY0lkJy5cbiAgICAvLyBVcGRhdGUgY29tcG9uZW50IHVubGVzcyB0aGlzIGlzIHRoZSBmaXJzdCB2YWx1ZSBhc3NpZ25lZC5cbiAgICBpZiAoY2hhbmdlcy5wdWJsaWNJZCAmJiAhY2hhbmdlcy5wdWJsaWNJZC5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMubG9hZFZpZGVvKGNoYW5nZXMucHVibGljSWQuY3VycmVudFZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vYnNlcnZlciAmJiB0aGlzLm9ic2VydmVyLmRpc2Nvbm5lY3QpIHtcbiAgICAgIHRoaXMub2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBpZiAoIXRoaXMucHVibGljSWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1lvdSBtdXN0IHNldCB0aGUgcHVibGljIGlkIG9mIHRoZSB2aWRlbyB0byBsb2FkLCBlLmcuIDxjbC12aWRlbyBwdWJsaWMtaWQ9e3t2aWRlby5wdWJsaWNfaWR9fS4uLj48L2NsLXZpZGVvPidcbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMubG9hZFZpZGVvKHRoaXMucHVibGljSWQpO1xuICB9XG5cbiAgbG9hZFZpZGVvKHB1YmxpY0lkOiBzdHJpbmcpIHtcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci91bml2ZXJzYWwjdW5pdmVyc2FsLWdvdGNoYXNcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcbiAgICAgIGNvbnN0IHZpZGVvID0gbmF0aXZlRWxlbWVudC5jaGlsZHJlblswXTtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmNsb3VkaW5hcnkudG9DbG91ZGluYXJ5QXR0cmlidXRlcyhcbiAgICAgICAgbmF0aXZlRWxlbWVudC5hdHRyaWJ1dGVzLFxuICAgICAgICB0aGlzLnRyYW5zZm9ybWF0aW9uc1xuICAgICAgKTtcblxuICAgICAgY29uc3QgdmlkZW9UYWcgPSB0aGlzLmNsb3VkaW5hcnkudmlkZW9UYWcocHVibGljSWQsIG9wdGlvbnMpO1xuXG4gICAgICAvLyBSZXBsYWNlIHRlbXBsYXRlIHdpdGggdGhlIGN1c3RvbSB2aWRlbyB0YWcgY3JlYXRlZCBieSBDbG91ZGluYXJ5XG4gICAgICB0aGlzLmFwcGVuZFNvdXJjZUVsZW1lbnRzKHZpZGVvLCB2aWRlb1RhZy5jb250ZW50KCkpO1xuICAgICAgLy8gQWRkIGF0dHJpYnV0ZXNcbiAgICAgIHRoaXMuc2V0RWxlbWVudEF0dHJpYnV0ZXModmlkZW8sIHZpZGVvVGFnLmF0dHJpYnV0ZXMoKSk7XG4gICAgfVxuICB9XG5cbiAgc2V0RWxlbWVudEF0dHJpYnV0ZXMoZWxlbWVudCwgYXR0cmlidXRlc0xpdGVyYWwpIHtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzTGl0ZXJhbCkuZm9yRWFjaChhdHRyTmFtZSA9PiB7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0cmlidXRlc0xpdGVyYWxbYXR0ck5hbWVdKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFwcGVuZFNvdXJjZUVsZW1lbnRzKGVsZW1lbnQsIGh0bWwpIHtcbiAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGh0bWw7XG5cbiAgICB3aGlsZSAoZWxlbWVudC5jaGlsZE5vZGVzWzBdKSB7XG4gICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChlbGVtZW50LmNoaWxkTm9kZXNbMF0pO1xuICAgIH1cbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKGZyYWdtZW50KTtcbiAgfVxufVxuIiwiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEFmdGVyVmlld0luaXQsIElucHV0LCBRdWVyeUxpc3QsIENvbnRlbnRDaGlsZHJlbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Nsb3VkaW5hcnl9IGZyb20gJy4vY2xvdWRpbmFyeS5zZXJ2aWNlJztcbmltcG9ydCB7Q2xvdWRpbmFyeVRyYW5zZm9ybWF0aW9uRGlyZWN0aXZlfSBmcm9tICcuL2Nsb3VkaW5hcnktdHJhbnNmb3JtYXRpb24uZGlyZWN0aXZlJztcbmltcG9ydCB7IGlzQnJvd3NlciB9IGZyb20gJy4vY2xvdWRpbmFyeS5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbY2xIcmVmXSwgW2NsU3JjXSwgW2NsU3Jjc2V0XSdcbn0pXG5leHBvcnQgY2xhc3MgQ2xvdWRpbmFyeUltYWdlU291cmNlRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICBASW5wdXQoKSBjbEhyZWY6IHN0cmluZztcbiAgICBASW5wdXQoKSBjbFNyYzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGNsU3Jjc2V0OiBzdHJpbmc7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKENsb3VkaW5hcnlUcmFuc2Zvcm1hdGlvbkRpcmVjdGl2ZSlcbiAgICB0cmFuc2Zvcm1hdGlvbnM6IFF1ZXJ5TGlzdDxDbG91ZGluYXJ5VHJhbnNmb3JtYXRpb25EaXJlY3RpdmU+O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBjbG91ZGluYXJ5OiBDbG91ZGluYXJ5KSB7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgaWYgKGlzQnJvd3NlcigpKSB7XG4gICAgICAgIGxldCBhdHRyTmFtZTogc3RyaW5nO1xuICAgICAgICBsZXQgcHJvcGVydHlWYWx1ZTogc3RyaW5nO1xuICAgICAgICBpZiAodGhpcy5jbEhyZWYpIHtcbiAgICAgICAgICAgIGF0dHJOYW1lID0gJ2hyZWYnO1xuICAgICAgICAgICAgcHJvcGVydHlWYWx1ZSA9IHRoaXMuY2xIcmVmO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2xTcmMpIHtcbiAgICAgICAgICAgIGF0dHJOYW1lID0gJ3NyYyc7XG4gICAgICAgICAgICBwcm9wZXJ0eVZhbHVlID0gdGhpcy5jbFNyYztcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNsU3Jjc2V0KSB7XG4gICAgICAgICAgICBhdHRyTmFtZSA9ICdzcmNzZXQnO1xuICAgICAgICAgICAgcHJvcGVydHlWYWx1ZSA9IHRoaXMuY2xTcmNzZXQ7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaXNTdmcgPSBmYWxzZTtcblxuICAgICAgICBpZiAodGhpcy5jbEhyZWYgJiZcbiAgICAgICAgICAgIHRvU3RyaW5nLmNhbGwodGhpcy5lbC5uYXRpdmVFbGVtZW50WydocmVmJ10gPT09ICdbb2JqZWN0IFNWR0FuaW1hdGVkU3RyaW5nXScpKSB7XG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCd4bGlua0hyZWYnLCAneGxpbms6aHJlZicpO1xuICAgICAgICAgICAgaXNTdmcgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFhdHRyTmFtZSB8fCAhcHJvcGVydHlWYWx1ZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEaXJlY3RpdmUgdmFsdWUgaXMgbWlzc2luZyBmb3IgY2xIcmVmL2NsU3JjL2NsU3Jjc2V0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuYXRpdmVFbGVtZW50ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5jbG91ZGluYXJ5LnRvQ2xvdWRpbmFyeUF0dHJpYnV0ZXMobmF0aXZlRWxlbWVudC5hdHRyaWJ1dGVzLCB0aGlzLnRyYW5zZm9ybWF0aW9ucyk7XG5cbiAgICAgICAgY29uc3QgYXR0clZhbHVlID0gdGhpcy5jbG91ZGluYXJ5LnVybChwcm9wZXJ0eVZhbHVlLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKTtcblxuICAgICAgICAvKlxuICAgICAgICAgb24gSUUsIGlmIFwibmdTcmNcIiBkaXJlY3RpdmUgZGVjbGFyYXRpb24gaXMgdXNlZCBhbmQgXCJzcmNcIiBhdHRyaWJ1dGUgZG9lc24ndCBleGlzdFxuICAgICAgICAgdGhlbiBjYWxsaW5nIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdzcmMnLCAnZm9vJykgZG9lc24ndCBkbyBhbnl0aGluZywgc28gd2UgbmVlZFxuICAgICAgICAgdG8gc2V0IHRoZSBwcm9wZXJ0eSBhcyB3ZWxsIHRvIGFjaGlldmUgdGhlIGRlc2lyZWQgZWZmZWN0LlxuXG4gICAgICAgICBDaGVjayBmb3IgSUU6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzMyMTM5Mzc1LzE5ODA5NVxuICAgICAgICAgaWYgaXMgSUUgdGhlbiBkb2N1bWVudE1vZGUgY29udGFpbnMgSUUgdmVyc2lvblxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgbXNpZSA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5vd25lckRvY3VtZW50LmRvY3VtZW50TW9kZTtcbiAgICAgICAgaWYgKG1zaWUgJiYgIWlzU3ZnKSB7XG4gICAgICAgICAgICAvLyBJRSBsb2dpYyBoZXJlXG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnRbYXR0ck5hbWVdID0gYXR0clZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbn1cbiIsImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBSZW5kZXJlcjIsIEFmdGVyVmlld0luaXQsIElucHV0LCBRdWVyeUxpc3QsIENvbnRlbnRDaGlsZHJlbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Nsb3VkaW5hcnl9IGZyb20gJy4vY2xvdWRpbmFyeS5zZXJ2aWNlJztcbmltcG9ydCB7Q2xvdWRpbmFyeVRyYW5zZm9ybWF0aW9uRGlyZWN0aXZlfSBmcm9tICcuL2Nsb3VkaW5hcnktdHJhbnNmb3JtYXRpb24uZGlyZWN0aXZlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbY2xCYWNrZ3JvdW5kSW1hZ2VdJ1xufSlcbmV4cG9ydCBjbGFzcyBDbG91ZGluYXJ5QmFja2dyb3VuZEltYWdlRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICBASW5wdXQoKSBjbEJhY2tncm91bmRJbWFnZTogc3RyaW5nO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihDbG91ZGluYXJ5VHJhbnNmb3JtYXRpb25EaXJlY3RpdmUpXG4gICAgdHJhbnNmb3JtYXRpb25zOiBRdWVyeUxpc3Q8Q2xvdWRpbmFyeVRyYW5zZm9ybWF0aW9uRGlyZWN0aXZlPjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBjbG91ZGluYXJ5OiBDbG91ZGluYXJ5KSB7XG4gICAgfVxuXG4gICAgaXNCcm93c2VyKCk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgIGlmICh0aGlzLmlzQnJvd3NlcigpKSB7XG4gICAgICAgIGNvbnN0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmNsb3VkaW5hcnkudG9DbG91ZGluYXJ5QXR0cmlidXRlcyhuYXRpdmVFbGVtZW50LmF0dHJpYnV0ZXMsIHRoaXMudHJhbnNmb3JtYXRpb25zKTtcbiAgICAgICAgY29uc3QgaW1hZ2VVcmwgPSB0aGlzLmNsb3VkaW5hcnkudXJsKHRoaXMuY2xCYWNrZ3JvdW5kSW1hZ2UsIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKG5hdGl2ZUVsZW1lbnQsICdiYWNrZ3JvdW5kLWltYWdlJywgYHVybCgnJHtpbWFnZVVybH0nKWApO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKG5hdGl2ZUVsZW1lbnQsICdiYWNrZ3JvdW5kLXJlcGVhdCcsICduby1yZXBlYXQnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShuYXRpdmVFbGVtZW50LCAnYmFja2dyb3VuZC1wb3NpdGlvbicsICdjZW50ZXInKTtcbiAgICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2NsLWltYWdlW2xvYWRpbmc9bGF6eV0nXG59KVxuZXhwb3J0IGNsYXNzIExhenlMb2FkRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICBpZiAoIXRoaXMuaXNOYXRpdmVMYXp5TG9hZFN1cHBvcnRlZCgpICYmIHRoaXMuaXNMYXp5TG9hZFN1cHBvcnRlZCgpKSB7XG4gICAgICAgIHRoaXMubGF6eUxvYWQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubG9hZEltYWdlKCk7XG4gICAgICB9XG4gIH1cblxuICBsb2FkSW1hZ2UoKSB7XG4gICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBpbWFnZSA9IG5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF07XG4gICAgaW1hZ2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBpbWFnZS5kYXRhc2V0LnNyYyk7XG4gIH1cblxuICBpc0xhenlMb2FkU3VwcG9ydGVkKCkge1xuICAgIHJldHVybiB3aW5kb3cgJiYgJ0ludGVyc2VjdGlvbk9ic2VydmVyJyBpbiB3aW5kb3c7XG4gIH1cblxuICBpc05hdGl2ZUxhenlMb2FkU3VwcG9ydGVkKCkge1xuICAgIHJldHVybiAnbG9hZGluZycgaW4gSFRNTEltYWdlRWxlbWVudC5wcm90b3R5cGU7IC8vIGNoZWNrIGxvYWRpbmcgcHJvcGVydHkgaXMgZGVmaW5lZCBvbiBpbWFnZSBvciBpZnJhbWVcbiAgfVxuXG4gIGxhenlMb2FkKCkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICByb290TWFyZ2luOiBgMHB4IDBweCAtNTAlIDBweGAsIC8vIE1hcmdpbiBhcm91bmQgdGhlIHJvb3RcbiAgICB9O1xuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKFxuICAgIChlbnRyaWVzKSA9PiB7XG4gICAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgICAgICAgdGhpcy5sb2FkSW1hZ2UoKTtcbiAgICAgICAgICAgIG9ic2VydmVyLnVub2JzZXJ2ZShlbnRyeS50YXJnZXQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgICB9KTtcbiAgICBvYnNlcnZlci5vYnNlcnZlKHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0Jztcbi8qIEFwcCBNb2R1bGUgKi9cbmltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENsb3VkaW5hcnkgfSBmcm9tICcuL2Nsb3VkaW5hcnkuc2VydmljZSc7XG5pbXBvcnQgeyBDbG91ZGluYXJ5SW1hZ2UgfSBmcm9tICcuL2Nsb3VkaW5hcnktaW1hZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IENsb3VkaW5hcnlWaWRlbyB9IGZyb20gJy4vY2xvdWRpbmFyeS12aWRlby5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2xvdWRpbmFyeVRyYW5zZm9ybWF0aW9uRGlyZWN0aXZlIH0gZnJvbSAnLi9jbG91ZGluYXJ5LXRyYW5zZm9ybWF0aW9uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDbG91ZGluYXJ5SW1hZ2VTb3VyY2VEaXJlY3RpdmUgfSBmcm9tICcuL2Nsb3VkaW5hcnktaW1hZ2Utc291cmNlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDbG91ZGluYXJ5QmFja2dyb3VuZEltYWdlRGlyZWN0aXZlIH0gZnJvbSAnLi9jbG91ZGluYXJ5LWJhY2tncm91bmQtaW1hZ2UuZGlyZWN0aXZlJztcbmltcG9ydCBDbG91ZGluYXJ5Q29uZmlndXJhdGlvbiBmcm9tICcuL2Nsb3VkaW5hcnktY29uZmlndXJhdGlvbi5jbGFzcyc7XG5pbXBvcnQgeyBMYXp5TG9hZERpcmVjdGl2ZSB9IGZyb20gJy4vY2xvdWRpbmFyeS1sYXp5LWxvYWQuZGlyZWN0aXZlJztcbmltcG9ydCB7IENsb3VkaW5hcnlQbGFjZUhvbGRlciB9IGZyb20gJy4vY2xvdWRpbmFyeS1wbGFjZWhvbGRlci5jb21wb25lbnQnO1xuXG4vLyBFeHBvcnQgZm9yIGxpYiBjb25zdW1lcnNcbmV4cG9ydCB7IENsb3VkaW5hcnlJbWFnZSB9IGZyb20gJy4vY2xvdWRpbmFyeS1pbWFnZS5jb21wb25lbnQnO1xuZXhwb3J0IHsgQ2xvdWRpbmFyeVZpZGVvIH0gZnJvbSAnLi9jbG91ZGluYXJ5LXZpZGVvLmNvbXBvbmVudCc7XG5leHBvcnQgeyBDbG91ZGluYXJ5VHJhbnNmb3JtYXRpb25EaXJlY3RpdmUgfSBmcm9tICcuL2Nsb3VkaW5hcnktdHJhbnNmb3JtYXRpb24uZGlyZWN0aXZlJztcbmV4cG9ydCB7IENsb3VkaW5hcnlJbWFnZVNvdXJjZURpcmVjdGl2ZSB9IGZyb20gJy4vY2xvdWRpbmFyeS1pbWFnZS1zb3VyY2UuZGlyZWN0aXZlJztcbmV4cG9ydCB7IENsb3VkaW5hcnlCYWNrZ3JvdW5kSW1hZ2VEaXJlY3RpdmUgfSBmcm9tICcuL2Nsb3VkaW5hcnktYmFja2dyb3VuZC1pbWFnZS5kaXJlY3RpdmUnO1xuZXhwb3J0IHsgTGF6eUxvYWREaXJlY3RpdmUgfSBmcm9tICcuL2Nsb3VkaW5hcnktbGF6eS1sb2FkLmRpcmVjdGl2ZSc7XG5leHBvcnQgeyBDbG91ZGluYXJ5UGxhY2VIb2xkZXIgfSBmcm9tJy4vY2xvdWRpbmFyeS1wbGFjZWhvbGRlci5jb21wb25lbnQnO1xuXG5cbmV4cG9ydCB7IENsb3VkaW5hcnksIHByb3ZpZGVDbG91ZGluYXJ5IH0gZnJvbSAnLi9jbG91ZGluYXJ5LnNlcnZpY2UnO1xuXG5leHBvcnQgeyBDbG91ZGluYXJ5Q29uZmlndXJhdGlvbiB9O1xuXG5leHBvcnQgY29uc3QgQ0xPVURJTkFSWV9MSUIgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ0NMT1VESU5BUllfTElCJyk7XG5leHBvcnQgY29uc3QgQ0xPVURJTkFSWV9DT05GSUdVUkFUSU9OID0gbmV3IEluamVjdGlvblRva2VuKCdDTE9VRElOQVJZX0NPTkZJR1VSQVRJT04nKTtcblxuLy8gRXhwb3J0IHRoaXMgZnVuY3Rpb24gdG8gQW5ndWxhcidzIEFPVCB0byB3b3JrXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ2xvdWRpbmFyeShjbG91ZGluYXJ5SnNMaWI6IG9iamVjdCwgY29uZmlndXJhdGlvbjogQ2xvdWRpbmFyeUNvbmZpZ3VyYXRpb24pIHtcbiAgcmV0dXJuIG5ldyBDbG91ZGluYXJ5KGNsb3VkaW5hcnlKc0xpYiwgY29uZmlndXJhdGlvbik7XG59O1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBDbG91ZGluYXJ5SW1hZ2VTb3VyY2VEaXJlY3RpdmUsXG4gICAgQ2xvdWRpbmFyeUJhY2tncm91bmRJbWFnZURpcmVjdGl2ZSxcbiAgICBDbG91ZGluYXJ5SW1hZ2UsXG4gICAgQ2xvdWRpbmFyeVZpZGVvLFxuICAgIENsb3VkaW5hcnlUcmFuc2Zvcm1hdGlvbkRpcmVjdGl2ZSxcbiAgICBMYXp5TG9hZERpcmVjdGl2ZSxcbiAgICBDbG91ZGluYXJ5UGxhY2VIb2xkZXIsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBDbG91ZGluYXJ5SW1hZ2VTb3VyY2VEaXJlY3RpdmUsXG4gICAgQ2xvdWRpbmFyeUJhY2tncm91bmRJbWFnZURpcmVjdGl2ZSxcbiAgICBDbG91ZGluYXJ5SW1hZ2UsXG4gICAgQ2xvdWRpbmFyeVZpZGVvLFxuICAgIENsb3VkaW5hcnlUcmFuc2Zvcm1hdGlvbkRpcmVjdGl2ZSxcbiAgICBMYXp5TG9hZERpcmVjdGl2ZSxcbiAgICBDbG91ZGluYXJ5UGxhY2VIb2xkZXJcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBDbG91ZGluYXJ5TW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY2xvdWRpbmFyeUpzTGliOiBvYmplY3QsIGNsb3VkaW5hcnlDb25maWd1cmF0aW9uOiBDbG91ZGluYXJ5Q29uZmlndXJhdGlvbik6IE1vZHVsZVdpdGhQcm92aWRlcnM8Q2xvdWRpbmFyeU1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQ2xvdWRpbmFyeU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IENMT1VESU5BUllfTElCLCB1c2VWYWx1ZTogY2xvdWRpbmFyeUpzTGliIH0sXG4gICAgICAgIHsgcHJvdmlkZTogQ0xPVURJTkFSWV9DT05GSUdVUkFUSU9OLCB1c2VWYWx1ZTogY2xvdWRpbmFyeUNvbmZpZ3VyYXRpb24gfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IENsb3VkaW5hcnksXG4gICAgICAgICAgdXNlRmFjdG9yeTogY3JlYXRlQ2xvdWRpbmFyeSxcbiAgICAgICAgICBkZXBzOiBbQ0xPVURJTkFSWV9MSUIsIENMT1VESU5BUllfQ09ORklHVVJBVElPTl1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFZQSxNQUFNLGdCQUFnQixHQUFHLFVBQVUsR0FBUTs7SUFFekMsT0FBTyxHQUFHLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxLQUFLLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7Q0FDdEYsQ0FBQzs7QUFFRixNQUFNLGNBQWMsR0FBRyxVQUFVLEdBQVE7SUFDdkMsT0FBTyxHQUFHLEtBQUssR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssY0FBYyxJQUFJLEdBQUcsWUFBWSxZQUFZLENBQUMsQ0FBQztDQUN4RixDQUFDOztBQUVGLE1BQU0sb0JBQW9CLEdBQUcsVUFBVSxNQUFvQjs7SUFDekQsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUs7O1FBQy9CLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUM7O1FBQ2hDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztLQUN0QixDQUFDLENBQUM7SUFDSCxPQUFPLE1BQU0sQ0FBQztDQUNmLENBQUM7O0FBRUYsTUFBTSxpQkFBaUIsR0FBRyxVQUFVLEdBQVE7O0lBQzFDLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQztJQUNmLElBQUks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