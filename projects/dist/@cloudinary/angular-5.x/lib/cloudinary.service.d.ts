import { QueryList } from '@angular/core';
import CloudinaryConfiguration from './cloudinary-configuration.class';
import { CloudinaryTransformationDirective } from './cloudinary-transformation.directive';
/**
 * Returns true if the given string begins with a left curly brace and ends with a right curly brace, e.g.
 * "{asdas d}" will return true, "asdasd}" will return false.
 *
 * this function does not validate the correctness of the string content other than the first and last character
 * @param str
 * @returns boolean
 */
declare const isJsonLikeString: (str: any) => boolean;
declare const isNamedNodeMap: (obj: any) => boolean;
declare const namedNodeMapToObject: (source: NamedNodeMap) => any;
declare const transformKeyNames: (obj: any) => any;
export declare class Cloudinary {
    _cloudinaryInstance: any;
    constructor(cloudinaryJsLib: any, configuration: CloudinaryConfiguration);
    readonly cloudinaryInstance: any;
    config(): any;
    url(...parameters: any[]): string;
    imageTag(...parameters: any[]): any;
    videoTag(...parameters: any[]): any;
    responsive(img: HTMLImageElement, options: any): void;
    /**
     * Transforms a set of attributes and chained transformations to an options object that can be consumed by Cloudinary JS API
     * @param attributes HTML element attributes
     * @param childTransformations QueryList with the element's <cl-transformation> children for chained transformations
     * @param cloudinary Cloudinary service
     * @returns An options object that can be consumed by Cloudinary JS API
     */
    toCloudinaryAttributes(attributes: NamedNodeMap, childTransformations?: QueryList<CloudinaryTransformationDirective>): any;
}
export declare function provideCloudinary(cloudinaryJsLib: any, configuration: CloudinaryConfiguration): {
    provide: typeof Cloudinary;
    useFactory: () => Cloudinary;
};
declare const isBrowser: () => boolean;
export { isJsonLikeString, isNamedNodeMap, transformKeyNames, namedNodeMapToObject, isBrowser };
