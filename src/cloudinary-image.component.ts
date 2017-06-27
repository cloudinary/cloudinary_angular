import {
    Component,
    ElementRef,
    Input,
    ContentChildren,
    QueryList,
    AfterViewInit,
    OnInit,
    OnDestroy
} from '@angular/core';
import {Cloudinary} from './cloudinary.service';
import {CloudinaryTransformationDirective} from './cloudinary-transformation.directive';

@Component({
    selector: 'cl-image',
    template: '<img>'
})
export class CloudinaryImage implements AfterViewInit, OnInit, OnDestroy {

    @Input('public-id') publicId: string;

    @ContentChildren(CloudinaryTransformationDirective)
    transformations: QueryList<CloudinaryTransformationDirective>;

    observer: MutationObserver;

    constructor(private el: ElementRef, private cloudinary: Cloudinary) {
    }

    ngOnInit(): void {
        // Create an observer instance
        this.observer = new MutationObserver(() => {
            this.loadImage();
        });
        // Observe changes to attributes or child transformations to re-render the image
        const config = {attributes: true, childList: true};

        // pass in the target node, as well as the observer options
        this.observer.observe(this.el.nativeElement, config);
    }

    ngOnDestroy(): void {
        this.observer.disconnect();
    }

    ngAfterViewInit() {
        this.loadImage();
    }

    loadImage() {
        if (!this.publicId) {
            throw new Error('You must set the public id of the image to load, e.g. <cl-image public-id={{photo.public_id}}...></cl-image>');
        }
        const nativeElement = this.el.nativeElement;
        const image = nativeElement.children[0];
        const options = this.cloudinary.toCloudinaryAttributes(nativeElement.attributes, this.transformations);
        const imageTag = this.cloudinary.imageTag(this.publicId, options);
        this.setElementAttributes(image, imageTag.attributes());
        if (options.responsive) {
            this.cloudinary.responsive(image, options);
        }
    };

    setElementAttributes(element, attributesLiteral) {
        Object.keys(attributesLiteral).forEach(attrName => {
            element.setAttribute(attrName, attributesLiteral[attrName]);
        });
    }
}
