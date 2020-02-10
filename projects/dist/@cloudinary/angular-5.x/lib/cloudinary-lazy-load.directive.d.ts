import { AfterViewInit, ElementRef } from '@angular/core';
export declare class LazyLoadDirective implements AfterViewInit {
    private el;
    constructor(el: ElementRef);
    ngAfterViewInit(): void;
    loadImage(): void;
    isLazyLoadSupported(): boolean;
    isNativeLazyLoadSupported(): boolean;
    lazyLoad(): void;
}
