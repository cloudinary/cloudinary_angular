import { AfterContentChecked } from '@angular/core';
import { Cloudinary } from './cloudinary.service';
export declare class CloudinaryPlaceHolder implements AfterContentChecked {
    private cloudinary;
    type: string;
    itemWidth: any;
    itemHeight: any;
    publicId: any;
    options: object;
    placeholderImg: string;
    constructor(cloudinary: Cloudinary);
    setWidth(width: any): void;
    setHeight(height: any): void;
    setPublicId(id: any): void;
    ngAfterContentChecked(): void;
    getPlaceholderImage(): string;
}
