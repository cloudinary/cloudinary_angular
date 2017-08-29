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
const isJsonLikeString = function (str: any): boolean {
  // [\s\S] allows the string to contain new lines
  return str && typeof str === 'string' && (str.trim().match(/^{[\s\S]*?}$/) !== null);
};

const isNamedNodeMap = function (obj: any): boolean {
  return obj && (obj.constructor.name === 'NamedNodeMap' || obj instanceof NamedNodeMap);
};

const namedNodeMapToObject = function (source: NamedNodeMap): any {
  let target = {};
  Object.keys(source).forEach(index => {
    const name = source[index].name;
    const value = source[index].value;
    target[name] = value;
  });
  return target;
};

const transformStringValue = function (value: string): string {
  if (!value)
    return value;

  if (value.match(/^fetch:/)) {
    return `fetch:${btoa(value.substr(6))}`;
  }

  return value;
}

const transformKeyNamesFromKebabToSnakeCase = function (obj: any): any {
  let _obj = obj;
  if (isJsonLikeString(obj)) {
    // Given attribute value is in the form of a JSON object -
    // Transforms the string into an object, as the Javascript API expects
    _obj = JSON.parse(obj);
  } else if (isNamedNodeMap(obj)) {
    _obj = namedNodeMapToObject(obj);
  }

  if (Array.isArray(_obj)) {
    // Transform all the array values (e.g. transformation array)
    _obj = _obj.map(currentValue => {
      return transformKeyNamesFromKebabToSnakeCase(currentValue);
    });
  } else if (typeof _obj === 'object') {
    Object.keys(_obj).forEach(key => {
      // Replace the key name with the snake_case
      const kebabKey = key.replace(/-/g, '_').toLocaleLowerCase();
      const kebabValue = transformKeyNamesFromKebabToSnakeCase(_obj[key]);
      delete _obj[key];
      _obj[kebabKey] = kebabValue;
    });
  }
  if (typeof(_obj) === 'string') {
    return transformStringValue(_obj);
  }
  return _obj;
};

export class Cloudinary {
  _cloudinaryInstance: any;

  constructor(cloudinaryJsLib: any, configuration: CloudinaryConfiguration) {
    // Cloudinary JS already clones the given configuration so no need to clone it here too
    if (cloudinaryJsLib.CloudinaryJQuery) {
      this._cloudinaryInstance = new cloudinaryJsLib.CloudinaryJQuery(configuration);
    } else {
      this._cloudinaryInstance = new cloudinaryJsLib.Cloudinary(configuration);
    }
  }

  get cloudinaryInstance(): any {
    return this._cloudinaryInstance;
  }

  config() {
    return this._cloudinaryInstance.config();
  }

  url(...parameters): string {
    return this._cloudinaryInstance.url(...parameters);
  }

  imageTag(...parameters): any {
    return this._cloudinaryInstance.imageTag(...parameters);
  }

  videoTag(...parameters): any {
    return this._cloudinaryInstance.videoTag(...parameters);
  }

  responsive(img: HTMLImageElement, options: any): void {
    // Cloudinary underlying JS library will handle responsive behavior
    this._cloudinaryInstance.cloudinary_update(img, options);
    this._cloudinaryInstance.responsive(options, false);
  }


  /**
   * Transforms a set of attributes and chained transformations to an options object that can be consumed by Cloudinary JS API
   * @param attributes HTML element attributes
   * @param childTransformations QueryList with the element's <cl-transformation> children for chained transformations
   * @param cloudinary Cloudinary service
   * @returns An options object that can be consumed by Cloudinary JS API
   */
  toCloudinaryAttributes(attributes: NamedNodeMap,
    childTransformations?: QueryList<CloudinaryTransformationDirective>): any {
    const options = transformKeyNamesFromKebabToSnakeCase(attributes);

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

  };
}

/* Return a provider object that creates our configurable service */
export function provideCloudinary(cloudinaryJsLib: any, configuration: CloudinaryConfiguration) {
    return { provide: Cloudinary, useFactory: () => new Cloudinary(cloudinaryJsLib, configuration) };
};

// For unit tests
export { isJsonLikeString, isNamedNodeMap, transformKeyNamesFromKebabToSnakeCase, namedNodeMapToObject };
