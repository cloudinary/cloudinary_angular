/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
'use strict';
import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cloudinary } from './cloudinary.service';
import { CloudinaryImage } from './cloudinary-image.component';
import { CloudinaryVideo } from './cloudinary-video.component';
import { CloudinaryTransformationDirective } from './cloudinary-transformation.directive';
import { CloudinaryImageSourceDirective } from './cloudinary-image-source.directive';
import { CloudinaryBackgroundImageDirective } from './cloudinary-background-image.directive';
import { LazyLoadDirective } from './cloudinary-lazy-load.directive';
import { CloudinaryPlaceHolder } from './cloudinary-placeholder.component';
export { CloudinaryImage } from './cloudinary-image.component';
export { CloudinaryVideo } from './cloudinary-video.component';
export { CloudinaryTransformationDirective } from './cloudinary-transformation.directive';
export { CloudinaryImageSourceDirective } from './cloudinary-image-source.directive';
export { CloudinaryBackgroundImageDirective } from './cloudinary-background-image.directive';
export { LazyLoadDirective } from './cloudinary-lazy-load.directive';
export { CloudinaryPlaceHolder } from './cloudinary-placeholder.component';
export { Cloudinary, provideCloudinary } from './cloudinary.service';
/** @type {?} */
export const CLOUDINARY_LIB = new InjectionToken('CLOUDINARY_LIB');
/** @type {?} */
export const CLOUDINARY_CONFIGURATION = new InjectionToken('CLOUDINARY_CONFIGURATION');
/**
 * @param {?} cloudinaryJsLib
 * @param {?} configuration
 * @return {?}
 */
export function createCloudinary(cloudinaryJsLib, configuration) {
    return new Cloudinary(cloudinaryJsLib, configuration);
}
;
export class CloudinaryModule {
    /**
     * @param {?} cloudinaryJsLib
     * @param {?} cloudinaryConfiguration
     * @return {?}
     */
    static forRoot(cloudinaryJsLib, cloudinaryConfiguration) {
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
CloudinaryModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                ],
                declarations: [
                    CloudinaryImageSourceDirective,
                    CloudinaryBackgroundImageDirective,
                    CloudinaryImage,
                    CloudinaryVideo,
                    CloudinaryTransformationDirective,
                    LazyLoadDirective,
                    CloudinaryPlaceHolder,
                ],
                exports: [
                    CloudinaryImageSourceDirective,
                    CloudinaryBackgroundImageDirective,
                    CloudinaryImage,
                    CloudinaryVideo,
                    CloudinaryTransformationDirective,
                    LazyLoadDirective,
                    CloudinaryPlaceHolder
                ]
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWRpbmFyeS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xvdWRpbmFyeS9hbmd1bGFyLTUueC8iLCJzb3VyY2VzIjpbImxpYi9jbG91ZGluYXJ5Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsWUFBWSxDQUFDO0FBRWIsT0FBTyxFQUFFLFFBQVEsRUFBdUIsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRixPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRixPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUU3RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUczRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzFGLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzdGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFLLG9DQUFvQyxDQUFDO0FBRzFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7QUFJckUsYUFBYSxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7QUFDbkUsYUFBYSx3QkFBd0IsR0FBRyxJQUFJLGNBQWMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDOzs7Ozs7QUFHdkYsTUFBTSwyQkFBMkIsZUFBdUIsRUFBRSxhQUFzQztJQUM5RixPQUFPLElBQUksVUFBVSxDQUFDLGVBQWUsRUFBRSxhQUFhLENBQUMsQ0FBQztDQUN2RDtBQUFBLENBQUM7QUF5QkYsTUFBTTs7Ozs7O0lBQ0osTUFBTSxDQUFDLE9BQU8sQ0FBQyxlQUF1QixFQUFFLHVCQUFnRDtRQUN0RixPQUFPO1lBQ0wsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUU7Z0JBQ3RELEVBQUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLFFBQVEsRUFBRSx1QkFBdUIsRUFBRTtnQkFDeEU7b0JBQ0UsT0FBTyxFQUFFLFVBQVU7b0JBQ25CLFVBQVUsRUFBRSxnQkFBZ0I7b0JBQzVCLElBQUksRUFBRSxDQUFDLGNBQWMsRUFBRSx3QkFBd0IsQ0FBQztpQkFDakQ7YUFDRjtTQUNGLENBQUM7S0FDSDs7O1lBckNGLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtpQkFDYjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osOEJBQThCO29CQUM5QixrQ0FBa0M7b0JBQ2xDLGVBQWU7b0JBQ2YsZUFBZTtvQkFDZixpQ0FBaUM7b0JBQ2pDLGlCQUFpQjtvQkFDakIscUJBQXFCO2lCQUN0QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsOEJBQThCO29CQUM5QixrQ0FBa0M7b0JBQ2xDLGVBQWU7b0JBQ2YsZUFBZTtvQkFDZixpQ0FBaUM7b0JBQ2pDLGlCQUFpQjtvQkFDakIscUJBQXFCO2lCQUN0QjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuLyogQXBwIE1vZHVsZSAqL1xuaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ2xvdWRpbmFyeSB9IGZyb20gJy4vY2xvdWRpbmFyeS5zZXJ2aWNlJztcbmltcG9ydCB7IENsb3VkaW5hcnlJbWFnZSB9IGZyb20gJy4vY2xvdWRpbmFyeS1pbWFnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2xvdWRpbmFyeVZpZGVvIH0gZnJvbSAnLi9jbG91ZGluYXJ5LXZpZGVvLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDbG91ZGluYXJ5VHJhbnNmb3JtYXRpb25EaXJlY3RpdmUgfSBmcm9tICcuL2Nsb3VkaW5hcnktdHJhbnNmb3JtYXRpb24uZGlyZWN0aXZlJztcbmltcG9ydCB7IENsb3VkaW5hcnlJbWFnZVNvdXJjZURpcmVjdGl2ZSB9IGZyb20gJy4vY2xvdWRpbmFyeS1pbWFnZS1zb3VyY2UuZGlyZWN0aXZlJztcbmltcG9ydCB7IENsb3VkaW5hcnlCYWNrZ3JvdW5kSW1hZ2VEaXJlY3RpdmUgfSBmcm9tICcuL2Nsb3VkaW5hcnktYmFja2dyb3VuZC1pbWFnZS5kaXJlY3RpdmUnO1xuaW1wb3J0IENsb3VkaW5hcnlDb25maWd1cmF0aW9uIGZyb20gJy4vY2xvdWRpbmFyeS1jb25maWd1cmF0aW9uLmNsYXNzJztcbmltcG9ydCB7IExhenlMb2FkRGlyZWN0aXZlIH0gZnJvbSAnLi9jbG91ZGluYXJ5LWxhenktbG9hZC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ2xvdWRpbmFyeVBsYWNlSG9sZGVyIH0gZnJvbSAnLi9jbG91ZGluYXJ5LXBsYWNlaG9sZGVyLmNvbXBvbmVudCc7XG5cbi8vIEV4cG9ydCBmb3IgbGliIGNvbnN1bWVyc1xuZXhwb3J0IHsgQ2xvdWRpbmFyeUltYWdlIH0gZnJvbSAnLi9jbG91ZGluYXJ5LWltYWdlLmNvbXBvbmVudCc7XG5leHBvcnQgeyBDbG91ZGluYXJ5VmlkZW8gfSBmcm9tICcuL2Nsb3VkaW5hcnktdmlkZW8uY29tcG9uZW50JztcbmV4cG9ydCB7IENsb3VkaW5hcnlUcmFuc2Zvcm1hdGlvbkRpcmVjdGl2ZSB9IGZyb20gJy4vY2xvdWRpbmFyeS10cmFuc2Zvcm1hdGlvbi5kaXJlY3RpdmUnO1xuZXhwb3J0IHsgQ2xvdWRpbmFyeUltYWdlU291cmNlRGlyZWN0aXZlIH0gZnJvbSAnLi9jbG91ZGluYXJ5LWltYWdlLXNvdXJjZS5kaXJlY3RpdmUnO1xuZXhwb3J0IHsgQ2xvdWRpbmFyeUJhY2tncm91bmRJbWFnZURpcmVjdGl2ZSB9IGZyb20gJy4vY2xvdWRpbmFyeS1iYWNrZ3JvdW5kLWltYWdlLmRpcmVjdGl2ZSc7XG5leHBvcnQgeyBMYXp5TG9hZERpcmVjdGl2ZSB9IGZyb20gJy4vY2xvdWRpbmFyeS1sYXp5LWxvYWQuZGlyZWN0aXZlJztcbmV4cG9ydCB7IENsb3VkaW5hcnlQbGFjZUhvbGRlciB9IGZyb20nLi9jbG91ZGluYXJ5LXBsYWNlaG9sZGVyLmNvbXBvbmVudCc7XG5cblxuZXhwb3J0IHsgQ2xvdWRpbmFyeSwgcHJvdmlkZUNsb3VkaW5hcnkgfSBmcm9tICcuL2Nsb3VkaW5hcnkuc2VydmljZSc7XG5cbmV4cG9ydCB7IENsb3VkaW5hcnlDb25maWd1cmF0aW9uIH07XG5cbmV4cG9ydCBjb25zdCBDTE9VRElOQVJZX0xJQiA9IG5ldyBJbmplY3Rpb25Ub2tlbignQ0xPVURJTkFSWV9MSUInKTtcbmV4cG9ydCBjb25zdCBDTE9VRElOQVJZX0NPTkZJR1VSQVRJT04gPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ0NMT1VESU5BUllfQ09ORklHVVJBVElPTicpO1xuXG4vLyBFeHBvcnQgdGhpcyBmdW5jdGlvbiB0byBBbmd1bGFyJ3MgQU9UIHRvIHdvcmtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDbG91ZGluYXJ5KGNsb3VkaW5hcnlKc0xpYjogb2JqZWN0LCBjb25maWd1cmF0aW9uOiBDbG91ZGluYXJ5Q29uZmlndXJhdGlvbikge1xuICByZXR1cm4gbmV3IENsb3VkaW5hcnkoY2xvdWRpbmFyeUpzTGliLCBjb25maWd1cmF0aW9uKTtcbn07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENsb3VkaW5hcnlJbWFnZVNvdXJjZURpcmVjdGl2ZSxcbiAgICBDbG91ZGluYXJ5QmFja2dyb3VuZEltYWdlRGlyZWN0aXZlLFxuICAgIENsb3VkaW5hcnlJbWFnZSxcbiAgICBDbG91ZGluYXJ5VmlkZW8sXG4gICAgQ2xvdWRpbmFyeVRyYW5zZm9ybWF0aW9uRGlyZWN0aXZlLFxuICAgIExhenlMb2FkRGlyZWN0aXZlLFxuICAgIENsb3VkaW5hcnlQbGFjZUhvbGRlcixcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIENsb3VkaW5hcnlJbWFnZVNvdXJjZURpcmVjdGl2ZSxcbiAgICBDbG91ZGluYXJ5QmFja2dyb3VuZEltYWdlRGlyZWN0aXZlLFxuICAgIENsb3VkaW5hcnlJbWFnZSxcbiAgICBDbG91ZGluYXJ5VmlkZW8sXG4gICAgQ2xvdWRpbmFyeVRyYW5zZm9ybWF0aW9uRGlyZWN0aXZlLFxuICAgIExhenlMb2FkRGlyZWN0aXZlLFxuICAgIENsb3VkaW5hcnlQbGFjZUhvbGRlclxuICBdXG59KVxuZXhwb3J0IGNsYXNzIENsb3VkaW5hcnlNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjbG91ZGluYXJ5SnNMaWI6IG9iamVjdCwgY2xvdWRpbmFyeUNvbmZpZ3VyYXRpb246IENsb3VkaW5hcnlDb25maWd1cmF0aW9uKTogTW9kdWxlV2l0aFByb3ZpZGVyczxDbG91ZGluYXJ5TW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBDbG91ZGluYXJ5TW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogQ0xPVURJTkFSWV9MSUIsIHVzZVZhbHVlOiBjbG91ZGluYXJ5SnNMaWIgfSxcbiAgICAgICAgeyBwcm92aWRlOiBDTE9VRElOQVJZX0NPTkZJR1VSQVRJT04sIHVzZVZhbHVlOiBjbG91ZGluYXJ5Q29uZmlndXJhdGlvbiB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogQ2xvdWRpbmFyeSxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBjcmVhdGVDbG91ZGluYXJ5LFxuICAgICAgICAgIGRlcHM6IFtDTE9VRElOQVJZX0xJQiwgQ0xPVURJTkFSWV9DT05GSUdVUkFUSU9OXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19