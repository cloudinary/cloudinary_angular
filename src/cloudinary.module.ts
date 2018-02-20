'use strict';
/* App Module */
import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { Cloudinary } from './cloudinary.service';
import { CloudinaryImage } from './cloudinary-image.component';
import { CloudinaryVideo } from './cloudinary-video.component';
import { CloudinaryTransformationDirective } from './cloudinary-transformation.directive';
import { CloudinaryImageSourceDirective } from './cloudinary-image-source.directive';
import { CloudinaryBackgroundImageDirective } from './cloudinary-background-image.directive'
import CloudinaryConfiguration from './cloudinary-configuration.class';

// Export for lib consumers
export { CloudinaryImage } from './cloudinary-image.component';
export { CloudinaryVideo } from './cloudinary-video.component';
export { CloudinaryTransformationDirective } from './cloudinary-transformation.directive';
export { CloudinaryImageSourceDirective } from './cloudinary-image-source.directive';
export { CloudinaryBackgroundImageDirective } from './cloudinary-background-image.directive';

export { Cloudinary, provideCloudinary } from './cloudinary.service';

export { CloudinaryConfiguration };

export const CLOUDINARY_LIB = new InjectionToken('CLOUDINARY_LIB');
export const CLOUDINARY_CONFIGURATION = new InjectionToken('CLOUDINARY_CONFIGURATION');

// Export this function to Angular's AOT to work
export function createCloudinary(cloudinaryJsLib: any, configuration: CloudinaryConfiguration) {
  return new Cloudinary(cloudinaryJsLib, configuration);
};

@NgModule({
  declarations: [
    CloudinaryImageSourceDirective,
    CloudinaryBackgroundImageDirective,
    CloudinaryImage,
    CloudinaryVideo,
    CloudinaryTransformationDirective
  ],
  exports: [
    CloudinaryImageSourceDirective,
    CloudinaryBackgroundImageDirective,
    CloudinaryImage,
    CloudinaryVideo,
    CloudinaryTransformationDirective
  ]
})
export class CloudinaryModule {
  static forRoot(cloudinaryJsLib: any, cloudinaryConfiguration: CloudinaryConfiguration): ModuleWithProviders {
    return {
      ngModule: CloudinaryModule,
      providers: [
        { provide: CLOUDINARY_LIB, useValue: cloudinaryJsLib },
        { provide: CLOUDINARY_CONFIGURATION, useValue: cloudinaryConfiguration },
        {
          provide: Cloudinary,
          useFactory: createCloudinary,
          deps: [CLOUDINARY_LIB, CLOUDINARY_CONFIGURATION]
        }
      ]
    };
  }
}
