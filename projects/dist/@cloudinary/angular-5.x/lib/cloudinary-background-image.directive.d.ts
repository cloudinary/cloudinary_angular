import { ElementRef, Renderer2, AfterViewInit, QueryList } from '@angular/core';
import { Cloudinary } from './cloudinary.service';
import { CloudinaryTransformationDirective } from './cloudinary-transformation.directive';
export declare class CloudinaryBackgroundImageDirective implements AfterViewInit {
    private renderer;
    private el;
    private cloudinary;
    clBackgroundImage: string;
    transformations: QueryList<CloudinaryTransformationDirective>;
    constructor(renderer: Renderer2, el: ElementRef, cloudinary: Cloudinary);
    isBrowser(): boolean;
    ngAfterViewInit(): void;
}
