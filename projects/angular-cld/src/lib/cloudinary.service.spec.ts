// Using require instead of import until clodinary-core has typings and can be loaded by tsc
const cloudinaryCore = require('cloudinary-core');

import {
    Cloudinary,
    isJsonLikeString,
    isNamedNodeMap,
    transformKeyNames
} from './cloudinary.service';
import CloudinaryConfiguration from './cloudinary-configuration.class';

const cloudName: string = 'service-test';

describe('Cloudinary service', () => {

    let config: CloudinaryConfiguration = {
        cloud_name: cloudName
    };
    let service: Cloudinary = new Cloudinary(cloudinaryCore, config);

    it('Creates an instance of the service', () => {
        expect(service instanceof Cloudinary).toBe(true);
    });

    it('creates responsive urls by interacting with cloudinary core', () => {
        const imgElement = {} as HTMLImageElement;
        const options = {
            opt1: 'val1'
        };
        spyOn(service.cloudinaryInstance, 'cloudinary_update');
        spyOn(service.cloudinaryInstance, 'responsive');

        service.responsive(imgElement, options);

        expect(service.cloudinaryInstance.cloudinary_update).toHaveBeenCalledWith(imgElement, options);
        expect(service.cloudinaryInstance.responsive).toHaveBeenCalledWith(options, false);
    });

    it('creates an image url', () => {
        const publicId = 'image_public_id.jpg';
        const options = {
            width: '100',
            crop: 'fill',
            responsive: true
        };
        expect(service.url(publicId, options)).toContain(
            'http://res.cloudinary.com/service-test/image/upload/c_fill,w_100/image_public_id.jpg');
    });

    describe('isJsonLikeString ', () => {
        it('identifies strings that start with { and end with }', () => {
            expect(isJsonLikeString('{"a":"1", "b":"2"}')).toBeTruthy();
        });
        it('ignores the actual content of the given string', () => {
            expect(isJsonLikeString('{I AM NOT INTERESTING}')).toBeTruthy();
        });
        it('returns false strings that do not start with { and end with }', () => {
            expect(isJsonLikeString('')).toBeFalsy();
            expect(isJsonLikeString(undefined)).toBeFalsy();
            expect(isJsonLikeString('foo: "bar"')).toBeFalsy();
        });
    });

    describe('isNamedNodeMap', () => {
        it('returns false for objects that are not an instance of NamedNodeMap', () => {
            expect(isNamedNodeMap('{"a":"1", "b":"2"}')).toBeFalsy();
            expect(isNamedNodeMap(undefined)).toBeFalsy();
            expect(isNamedNodeMap(null)).toBeFalsy();
            expect(isNamedNodeMap(123)).toBeFalsy();
        });
    });

    describe('transformKeyNames', () => {
        it('Transforms property names of json-like strings from kebab-case to snake_case', () => {
            expect(transformKeyNames('{"aaa-aaa":"1", "bbb-bbb":"2", "cc": "ccc-ccc"}')).toEqual(
                {
                    aaa_aaa: '1',
                    bbb_bbb: '2',
                    cc: 'ccc-ccc'
                }
            );
        });
        it('Transforms property names of json-like strings spanning multi-lines from kebab-case to snake_case', () => {
            expect(transformKeyNames(`{"aaa-aaa":"1",
            "bbb-bbb":"2",
            "cc": "ccc-ccc"}`)).toEqual(
                {
                    aaa_aaa: '1',
                    bbb_bbb: '2',
                    cc: 'ccc-ccc'
                }
            );
        });
        it('Transforms property names of objects from kebab-case to snake_case', () => {
            expect(transformKeyNames({'aaa-aaa': 1, 'bbb-bbb': 2, cc: 'ccc-ccc'})).toEqual(
                {
                    aaa_aaa: 1,
                    bbb_bbb: 2,
                    cc: 'ccc-ccc'
                }
            );
        });
        it('Transforms property names by stripping cld prefix', () => {
          // "cld" prefix can be followed by an optional dash or underscore
          expect(transformKeyNames('{"cldResponsive":"1", "cld-width":"2", "cld_height": "ccc-ccc"}')).toEqual(
            {
              responsive: '1',
              width: '2',
              height: 'ccc-ccc'
            }
          );
        });
        it('does not affect primitive values', () => {
            expect(transformKeyNames(123)).toEqual(123);
            expect(transformKeyNames(undefined)).toBeUndefined();
            expect(transformKeyNames('')).toEqual('');
            expect(transformKeyNames('a b c')).toEqual('a b c');
        });
        it('iterates over array elements to transform its members', () => {
            expect(transformKeyNames([{
                'aaa-aaa': 'aaa-aaa',
                'bbb-bbb': 'bbb-bbb',
                'ccc': 'ccc'
            }, '{"xxx-xxx":"1", "yyy-yyy":"2", "zz": "zzz-zzz"}'])).toEqual([
                {
                    'aaa_aaa': 'aaa-aaa',
                    'bbb_bbb': 'bbb-bbb',
                    'ccc': 'ccc'
                },
                {
                    'xxx_xxx': '1',
                    'yyy_yyy': '2',
                    'zz': 'zzz-zzz'
                }
            ]);
        });
        it('transforms complex json-like objects into options', () => {
            expect(transformKeyNames(`{"aaa-aaa":"1",
            "bbb-bbb":"2",
            "transform-ation": [{ "effect": "sepia", "fetch_format": "auto"}]
            }`)).toEqual(
                {
                    aaa_aaa: '1',
                    bbb_bbb: '2',
                    transform_ation: [{
                        effect: 'sepia',
                        fetch_format: 'auto'
                    }]
                }
            );
        });
    });
});
