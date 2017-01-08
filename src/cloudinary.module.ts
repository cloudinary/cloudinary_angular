'use strict';
/* App Module */
import {NgModule} from '@angular/core';
import {CloudinaryImage} from './cloudinary-image.component';
import {CloudinaryVideo} from './cloudinary-video.component';
import {CloudinaryTransformationDirective} from './cloudinary-transformation.directive';
import {CloudinaryImageSourceDirective} from './cloudinary-image-source.directive';
import CloudinaryConfiguration from './cloudinary-configuration.class';

// Export for lib consumers
export {CloudinaryImage} from './cloudinary-image.component';
export {CloudinaryVideo} from './cloudinary-video.component';
export {CloudinaryTransformationDirective} from './cloudinary-transformation.directive';
export {CloudinaryImageSourceDirective} from './cloudinary-image-source.directive';

export {Cloudinary, provideCloudinary} from './cloudinary.service';

export {CloudinaryConfiguration};

@NgModule({
    declarations: [
        CloudinaryImageSourceDirective,
        CloudinaryImage,
        CloudinaryVideo,
        CloudinaryTransformationDirective
    ],
    exports: [
        CloudinaryImageSourceDirective,
        CloudinaryImage,
        CloudinaryVideo,
        CloudinaryTransformationDirective
    ]
})
export class CloudinaryModule { }
