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
export var CLOUDINARY_LIB = new InjectionToken('CLOUDINARY_LIB');
/** @type {?} */
export var CLOUDINARY_CONFIGURATION = new InjectionToken('CLOUDINARY_CONFIGURATION');
/**
 * @param {?} cloudinaryJsLib
 * @param {?} configuration
 * @return {?}
 */
export function createCloudinary(cloudinaryJsLib, configuration) {
    return new Cloudinary(cloudinaryJsLib, configuration);
}
;
var CloudinaryModule = /** @class */ (function () {
    function CloudinaryModule() {
    }
    /**
     * @param {?} cloudinaryJsLib
     * @param {?} cloudinaryConfiguration
     * @return {?}
     */
    CloudinaryModule.forRoot = /**
     * @param {?} cloudinaryJsLib
     * @param {?} cloudinaryConfiguration
     * @return {?}
     */
    function (cloudinaryJsLib, cloudinaryConfiguration) {
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
    };
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
    return CloudinaryModule;
}());
export { CloudinaryModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWRpbmFyeS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xvdWRpbmFyeS9hbmd1bGFyLTUueC8iLCJzb3VyY2VzIjpbImxpYi9jbG91ZGluYXJ5Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsWUFBWSxDQUFDO0FBRWIsT0FBTyxFQUFFLFFBQVEsRUFBdUIsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRixPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRixPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUU3RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUczRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzFGLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzdGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFLLG9DQUFvQyxDQUFDO0FBRzFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7QUFJckUsV0FBYSxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7QUFDbkUsV0FBYSx3QkFBd0IsR0FBRyxJQUFJLGNBQWMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDOzs7Ozs7QUFHdkYsTUFBTSwyQkFBMkIsZUFBdUIsRUFBRSxhQUFzQztJQUM5RixPQUFPLElBQUksVUFBVSxDQUFDLGVBQWUsRUFBRSxhQUFhLENBQUMsQ0FBQztDQUN2RDtBQUFBLENBQUM7Ozs7Ozs7OztJQTBCTyx3QkFBTzs7Ozs7SUFBZCxVQUFlLGVBQXVCLEVBQUUsdUJBQWdEO1FBQ3RGLE9BQU87WUFDTCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRTtnQkFDdEQsRUFBRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsUUFBUSxFQUFFLHVCQUF1QixFQUFFO2dCQUN4RTtvQkFDRSxPQUFPLEVBQUUsVUFBVTtvQkFDbkIsVUFBVSxFQUFFLGdCQUFnQjtvQkFDNUIsSUFBSSxFQUFFLENBQUMsY0FBYyxFQUFFLHdCQUF3QixDQUFDO2lCQUNqRDthQUNGO1NBQ0YsQ0FBQztLQUNIOztnQkFyQ0YsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3FCQUNiO29CQUNELFlBQVksRUFBRTt3QkFDWiw4QkFBOEI7d0JBQzlCLGtDQUFrQzt3QkFDbEMsZUFBZTt3QkFDZixlQUFlO3dCQUNmLGlDQUFpQzt3QkFDakMsaUJBQWlCO3dCQUNqQixxQkFBcUI7cUJBQ3RCO29CQUNELE9BQU8sRUFBRTt3QkFDUCw4QkFBOEI7d0JBQzlCLGtDQUFrQzt3QkFDbEMsZUFBZTt3QkFDZixlQUFlO3dCQUNmLGlDQUFpQzt3QkFDakMsaUJBQWlCO3dCQUNqQixxQkFBcUI7cUJBQ3RCO2lCQUNGOzsyQkExREQ7O1NBMkRhLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0Jztcbi8qIEFwcCBNb2R1bGUgKi9cbmltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENsb3VkaW5hcnkgfSBmcm9tICcuL2Nsb3VkaW5hcnkuc2VydmljZSc7XG5pbXBvcnQgeyBDbG91ZGluYXJ5SW1hZ2UgfSBmcm9tICcuL2Nsb3VkaW5hcnktaW1hZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IENsb3VkaW5hcnlWaWRlbyB9IGZyb20gJy4vY2xvdWRpbmFyeS12aWRlby5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2xvdWRpbmFyeVRyYW5zZm9ybWF0aW9uRGlyZWN0aXZlIH0gZnJvbSAnLi9jbG91ZGluYXJ5LXRyYW5zZm9ybWF0aW9uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDbG91ZGluYXJ5SW1hZ2VTb3VyY2VEaXJlY3RpdmUgfSBmcm9tICcuL2Nsb3VkaW5hcnktaW1hZ2Utc291cmNlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDbG91ZGluYXJ5QmFja2dyb3VuZEltYWdlRGlyZWN0aXZlIH0gZnJvbSAnLi9jbG91ZGluYXJ5LWJhY2tncm91bmQtaW1hZ2UuZGlyZWN0aXZlJztcbmltcG9ydCBDbG91ZGluYXJ5Q29uZmlndXJhdGlvbiBmcm9tICcuL2Nsb3VkaW5hcnktY29uZmlndXJhdGlvbi5jbGFzcyc7XG5pbXBvcnQgeyBMYXp5TG9hZERpcmVjdGl2ZSB9IGZyb20gJy4vY2xvdWRpbmFyeS1sYXp5LWxvYWQuZGlyZWN0aXZlJztcbmltcG9ydCB7IENsb3VkaW5hcnlQbGFjZUhvbGRlciB9IGZyb20gJy4vY2xvdWRpbmFyeS1wbGFjZWhvbGRlci5jb21wb25lbnQnO1xuXG4vLyBFeHBvcnQgZm9yIGxpYiBjb25zdW1lcnNcbmV4cG9ydCB7IENsb3VkaW5hcnlJbWFnZSB9IGZyb20gJy4vY2xvdWRpbmFyeS1pbWFnZS5jb21wb25lbnQnO1xuZXhwb3J0IHsgQ2xvdWRpbmFyeVZpZGVvIH0gZnJvbSAnLi9jbG91ZGluYXJ5LXZpZGVvLmNvbXBvbmVudCc7XG5leHBvcnQgeyBDbG91ZGluYXJ5VHJhbnNmb3JtYXRpb25EaXJlY3RpdmUgfSBmcm9tICcuL2Nsb3VkaW5hcnktdHJhbnNmb3JtYXRpb24uZGlyZWN0aXZlJztcbmV4cG9ydCB7IENsb3VkaW5hcnlJbWFnZVNvdXJjZURpcmVjdGl2ZSB9IGZyb20gJy4vY2xvdWRpbmFyeS1pbWFnZS1zb3VyY2UuZGlyZWN0aXZlJztcbmV4cG9ydCB7IENsb3VkaW5hcnlCYWNrZ3JvdW5kSW1hZ2VEaXJlY3RpdmUgfSBmcm9tICcuL2Nsb3VkaW5hcnktYmFja2dyb3VuZC1pbWFnZS5kaXJlY3RpdmUnO1xuZXhwb3J0IHsgTGF6eUxvYWREaXJlY3RpdmUgfSBmcm9tICcuL2Nsb3VkaW5hcnktbGF6eS1sb2FkLmRpcmVjdGl2ZSc7XG5leHBvcnQgeyBDbG91ZGluYXJ5UGxhY2VIb2xkZXIgfSBmcm9tJy4vY2xvdWRpbmFyeS1wbGFjZWhvbGRlci5jb21wb25lbnQnO1xuXG5cbmV4cG9ydCB7IENsb3VkaW5hcnksIHByb3ZpZGVDbG91ZGluYXJ5IH0gZnJvbSAnLi9jbG91ZGluYXJ5LnNlcnZpY2UnO1xuXG5leHBvcnQgeyBDbG91ZGluYXJ5Q29uZmlndXJhdGlvbiB9O1xuXG5leHBvcnQgY29uc3QgQ0xPVURJTkFSWV9MSUIgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ0NMT1VESU5BUllfTElCJyk7XG5leHBvcnQgY29uc3QgQ0xPVURJTkFSWV9DT05GSUdVUkFUSU9OID0gbmV3IEluamVjdGlvblRva2VuKCdDTE9VRElOQVJZX0NPTkZJR1VSQVRJT04nKTtcblxuLy8gRXhwb3J0IHRoaXMgZnVuY3Rpb24gdG8gQW5ndWxhcidzIEFPVCB0byB3b3JrXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ2xvdWRpbmFyeShjbG91ZGluYXJ5SnNMaWI6IG9iamVjdCwgY29uZmlndXJhdGlvbjogQ2xvdWRpbmFyeUNvbmZpZ3VyYXRpb24pIHtcbiAgcmV0dXJuIG5ldyBDbG91ZGluYXJ5KGNsb3VkaW5hcnlKc0xpYiwgY29uZmlndXJhdGlvbik7XG59O1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBDbG91ZGluYXJ5SW1hZ2VTb3VyY2VEaXJlY3RpdmUsXG4gICAgQ2xvdWRpbmFyeUJhY2tncm91bmRJbWFnZURpcmVjdGl2ZSxcbiAgICBDbG91ZGluYXJ5SW1hZ2UsXG4gICAgQ2xvdWRpbmFyeVZpZGVvLFxuICAgIENsb3VkaW5hcnlUcmFuc2Zvcm1hdGlvbkRpcmVjdGl2ZSxcbiAgICBMYXp5TG9hZERpcmVjdGl2ZSxcbiAgICBDbG91ZGluYXJ5UGxhY2VIb2xkZXIsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBDbG91ZGluYXJ5SW1hZ2VTb3VyY2VEaXJlY3RpdmUsXG4gICAgQ2xvdWRpbmFyeUJhY2tncm91bmRJbWFnZURpcmVjdGl2ZSxcbiAgICBDbG91ZGluYXJ5SW1hZ2UsXG4gICAgQ2xvdWRpbmFyeVZpZGVvLFxuICAgIENsb3VkaW5hcnlUcmFuc2Zvcm1hdGlvbkRpcmVjdGl2ZSxcbiAgICBMYXp5TG9hZERpcmVjdGl2ZSxcbiAgICBDbG91ZGluYXJ5UGxhY2VIb2xkZXJcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBDbG91ZGluYXJ5TW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY2xvdWRpbmFyeUpzTGliOiBvYmplY3QsIGNsb3VkaW5hcnlDb25maWd1cmF0aW9uOiBDbG91ZGluYXJ5Q29uZmlndXJhdGlvbik6IE1vZHVsZVdpdGhQcm92aWRlcnM8Q2xvdWRpbmFyeU1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQ2xvdWRpbmFyeU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IENMT1VESU5BUllfTElCLCB1c2VWYWx1ZTogY2xvdWRpbmFyeUpzTGliIH0sXG4gICAgICAgIHsgcHJvdmlkZTogQ0xPVURJTkFSWV9DT05GSUdVUkFUSU9OLCB1c2VWYWx1ZTogY2xvdWRpbmFyeUNvbmZpZ3VyYXRpb24gfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IENsb3VkaW5hcnksXG4gICAgICAgICAgdXNlRmFjdG9yeTogY3JlYXRlQ2xvdWRpbmFyeSxcbiAgICAgICAgICBkZXBzOiBbQ0xPVURJTkFSWV9MSUIsIENMT1VESU5BUllfQ09ORklHVVJBVElPTl1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==