import { ElementRef, QueryList, AfterViewInit, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Cloudinary } from './cloudinary.service';
import { CloudinaryTransformationDirective } from './cloudinary-transformation.directive';
export declare class CloudinaryVideo implements AfterViewInit, OnInit, OnChanges, OnDestroy {
    private el;
    private cloudinary;
    private platformId;
    publicId: string;
    transformations: QueryList<CloudinaryTransformationDirective>;
    observer: MutationObserver;
    constructor(el: ElementRef, cloudinary: Cloudinary, platformId: Object);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    loadVideo(publicId: string): void;
    setElementAttributes(element: any, attributesLiteral: any): void;
    appendSourceElements(element: any, html: any): void;
}
