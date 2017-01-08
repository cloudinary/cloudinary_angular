import {Component, DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Cloudinary, provideCloudinary} from './cloudinary.module';
import CloudinaryConfiguration from './cloudinary-configuration.class';
import {CloudinaryImageSourceDirective} from './cloudinary-image-source.directive';
import {CloudinaryTransformationDirective} from './cloudinary-transformation.directive';

@Component({
    template: `
    <a [clHref]="image.public_id" fetch_format="auto" target="_blank">
        <cl-transformation effect="sepia"></cl-transformation>
        click me
    </a>
    <img [clSrc]="image.public_id" width="100" crop="scale"/>
    `
})
class TestComponent { }

describe('CloudinaryImageSourceDirective', () => {

    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement[];  // the three elements w/ the directive
    let localCloudinary: Cloudinary = provideCloudinary(require('cloudinary-core'),
        { cloud_name: '@@fake_angular2_sdk@@' } as CloudinaryConfiguration).useFactory();

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [CloudinaryImageSourceDirective, CloudinaryTransformationDirective, TestComponent],
            providers: [{ provide: Cloudinary, useValue: localCloudinary }]
        }).createComponent(TestComponent);
        const comp = fixture.componentInstance;

        // pretend that it was wired to something that supplied an image
        comp['image'] = {
            public_id: 'some_image_id'
        };

        fixture.detectChanges(); // initial binding

        // all elements with an attached CloudinaryImageSourceDirective
        des = fixture.debugElement.queryAll(By.directive(CloudinaryImageSourceDirective));
    });

    it('should have 2 elements', () => {
        expect(des.length).toBe(2);
    });

    it('updates the anchor url', () => {
        const anchor = des[0].nativeElement as HTMLAnchorElement;
        expect(anchor.href).toEqual(jasmine.stringMatching(/f_auto\/some_image_id/));
    });

    it('Can get the attributes of the first transformation', () => {
        const img = des[1].nativeElement as HTMLImageElement;
        expect(img.src).toEqual(jasmine.stringMatching(/c_scale,w_100\/some_image_id/));
    });

    it('Has chained transformations', () => {
        const anchor = des[0].nativeElement as HTMLAnchorElement;
        expect(anchor.href).toEqual(jasmine.stringMatching(/image\/upload\/e_sepia\/f_auto\/some_image_id/));
    });

});
