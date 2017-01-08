import {Directive, ElementRef, AfterViewInit, Input, QueryList, ContentChildren} from '@angular/core';
import {Cloudinary} from './cloudinary.service';
import {CloudinaryTransformationDirective} from './cloudinary-transformation.directive';

@Directive({
    selector: '[clHref], [clSrc], [clSrcset]'
})
export class CloudinaryImageSourceDirective implements AfterViewInit {

    @Input() private clHref: string;
    @Input() private clSrc: string;
    @Input() private clSrcset: string;

    @ContentChildren(CloudinaryTransformationDirective)
    private transformations: QueryList<CloudinaryTransformationDirective>;

    constructor(private el: ElementRef, private cloudinary: Cloudinary) {
    }

    ngAfterViewInit() {
        let attrName: string;
        let propertyValue: string;
        if (this.clHref) {
            attrName = 'href';
            propertyValue = this.clHref;
        } else if (this.clSrc) {
            attrName = 'src';
            propertyValue = this.clSrc;
        } else if (this.clSrcset) {
            attrName = 'srcset';
            propertyValue = this.clSrcset;
        }

        let isSvg = false;

        if (this.clHref &&
            toString.call(this.el.nativeElement['href'] === '[object SVGAnimatedString]')) {
            this.el.nativeElement.setAttribute('xlinkHref', 'xlink:href');
            isSvg = true;
        }

        if (!attrName || !propertyValue) {
            throw new Error('Directive value is missing for clHref/clSrc/clSrcset');
        }

        const nativeElement = this.el.nativeElement;
        const options = this.cloudinary.toCloudinaryAttributes(nativeElement.attributes, this.transformations);

        const attrValue = this.cloudinary.url(propertyValue, options);
        this.el.nativeElement.setAttribute(attrName, attrValue);

        /*
         on IE, if "ngSrc" directive declaration is used and "src" attribute doesn't exist
         then calling element.setAttribute('src', 'foo') doesn't do anything, so we need
         to set the property as well to achieve the desired effect.

         Check for IE: http://stackoverflow.com/a/32139375/198095
         if is IE then documentMode contains IE version
         */
        const msie = this.el.nativeElement.ownerDocument.documentMode;
        if (msie && !isSvg) {
            // IE logic here
            this.el.nativeElement[attrName] = attrValue;
        }
    };
}
