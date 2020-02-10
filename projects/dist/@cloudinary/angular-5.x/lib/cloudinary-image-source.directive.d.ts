import { ElementRef, AfterViewInit, QueryList } from '@angular/core';
import { Cloudinary } from './cloudinary.service';
import { CloudinaryTransformationDirective } from './cloudinary-transformation.directive';
export declare class CloudinaryImageSourceDirective implements AfterViewInit {
    private el;
    private cloudinary;
    clHref: string;
    clSrc: string;
    clSrcset: string;
    transformations: QueryList<CloudinaryTransformationDirective>;
    constructor(el: ElementRef, cloudinary: Cloudinary);
    ngAfterViewInit(): void;
}
