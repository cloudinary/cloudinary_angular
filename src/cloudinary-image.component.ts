import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ContentChildren,
    QueryList,
    AfterViewInit,
    OnInit,
    OnChanges,
    SimpleChanges,
    OnDestroy
} from '@angular/core';
import { Cloudinary } from './cloudinary.service';
import { CloudinaryTransformationDirective } from './cloudinary-transformation.directive';
import { isBrowser } from './cloudinary.service';

@Component({
  selector: 'cl-image',
  template: '<img>',
})
export class CloudinaryImage
  implements AfterViewInit, OnInit, OnChanges, OnDestroy {
  @Input('public-id') publicId: string;
  @Input('client-hints') clientHints?: boolean;
  @Input('loading') loading: string;

  @ContentChildren(CloudinaryTransformationDirective)
  transformations: QueryList<CloudinaryTransformationDirective>;

  @Output() onLoad: EventEmitter<boolean> = new EventEmitter(); // Callback when an image is loaded successfully
  @Output() onError: EventEmitter<boolean> = new EventEmitter(); // Callback when an image is loaded with error

  observer: MutationObserver;

  constructor(private el: ElementRef, private cloudinary: Cloudinary) {}

  ngOnInit(): void {
    if (isBrowser()) {
      // Create an observer instance
      this.observer = new MutationObserver(() => {
        this.loadImage();
      });
      // Observe changes to attributes or child transformations to re-render the image
      const config = { attributes: true, childList: true };

      // pass in the target node, as well as the observer options
      this.observer.observe(this.el.nativeElement, config);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // Listen to changes on the data-bound property 'publicId'.
    // Update component unless this is the first value assigned.
    if (changes.publicId && !changes.publicId.isFirstChange()) {
      this.loadImage();
    }
  }

  ngOnDestroy(): void {
    if (this.observer && this.observer.disconnect) {
      this.observer.disconnect();
    }
  }

  ngAfterViewInit() {
    this.loadImage();
  }

  loadImage() {
    // https://github.com/angular/universal#universal-gotchas
    // Fetch the image only for client side rendering by the browser
    if (isBrowser()) {
      if (!this.publicId) {
        throw new Error(
          'You must set the public id of the image to load, e.g. <cl-image public-id={{photo.public_id}}...></cl-image>'
        );
      }
      const nativeElement = this.el.nativeElement;
      const image = nativeElement.children[0];
      // Add onload and onerror handlers
      image.onload = e => {
        this.onLoad.emit(e);
      }
      image.onerror = e => {
        this.onError.emit(e);
      }
      const options = this.cloudinary.toCloudinaryAttributes(
        nativeElement.attributes,
        this.transformations
      );
      if (this.clientHints || (typeof this.clientHints === 'undefined' && this.cloudinary.config().client_hints)) {
        delete options['class'];
        delete options['data-src'];
        delete options['responsive'];
      }
      const imageTag = this.cloudinary.imageTag(this.publicId, options);
      this.setElementAttributes(image, imageTag.attributes());
      if (options.responsive) {
        this.cloudinary.responsive(image, options);
      }
    }
  }

  setElementAttributes(element, attributesLiteral) {
    Object.keys(attributesLiteral).forEach(attrName => {
      const attr = attrName === 'src' && this.loading === 'lazy' ? 'data-src' : attrName;
      element.setAttribute(attr, attributesLiteral[attrName]);
    });
  }
}
