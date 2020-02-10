import { ElementRef, EventEmitter, QueryList, AfterViewInit, AfterContentChecked, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Cloudinary } from './cloudinary.service';
import { CloudinaryTransformationDirective } from './cloudinary-transformation.directive';
import { CloudinaryPlaceHolder } from './cloudinary-placeholder.component';
export declare class CloudinaryImage implements AfterViewInit, OnInit, AfterViewInit, AfterContentChecked, OnChanges, OnDestroy {
    private el;
    private cloudinary;
    publicId: string;
    clientHints?: boolean;
    loading: string;
    width?: string;
    height?: string;
    transformations: QueryList<CloudinaryTransformationDirective>;
    placeholderComponent: CloudinaryPlaceHolder;
    onLoad: EventEmitter<boolean>;
    onError: EventEmitter<boolean>;
    observer: MutationObserver;
    shouldShowPlaceHolder: boolean;
    constructor(el: ElementRef, cloudinary: Cloudinary);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    ngAfterContentChecked(): void;
    hasLoaded(): void;
    loadImage(): void;
    setElementAttributes(element: any, attributesLiteral: any): void;
    placeholderHandler(options: any): void;
}
