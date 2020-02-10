import { ModuleWithProviders, InjectionToken } from '@angular/core';
import { Cloudinary } from './cloudinary.service';
import CloudinaryConfiguration from './cloudinary-configuration.class';
export { CloudinaryImage } from './cloudinary-image.component';
export { CloudinaryVideo } from './cloudinary-video.component';
export { CloudinaryTransformationDirective } from './cloudinary-transformation.directive';
export { CloudinaryImageSourceDirective } from './cloudinary-image-source.directive';
export { CloudinaryBackgroundImageDirective } from './cloudinary-background-image.directive';
export { LazyLoadDirective } from './cloudinary-lazy-load.directive';
export { CloudinaryPlaceHolder } from './cloudinary-placeholder.component';
export { Cloudinary, provideCloudinary } from './cloudinary.service';
export { CloudinaryConfiguration };
export declare const CLOUDINARY_LIB: InjectionToken<{}>;
export declare const CLOUDINARY_CONFIGURATION: InjectionToken<{}>;
export declare function createCloudinary(cloudinaryJsLib: object, configuration: CloudinaryConfiguration): Cloudinary;
export declare class CloudinaryModule {
    static forRoot(cloudinaryJsLib: object, cloudinaryConfiguration: CloudinaryConfiguration): ModuleWithProviders<CloudinaryModule>;
}
