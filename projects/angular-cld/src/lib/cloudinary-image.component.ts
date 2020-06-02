import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ContentChildren,
  QueryList,
  AfterViewInit,
  AfterContentChecked,
  OnInit,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  ContentChild
} from '@angular/core';
import { Cloudinary } from './cloudinary.service';
import { CloudinaryTransformationDirective } from './cloudinary-transformation.directive';
import { CloudinaryPlaceHolder } from './cloudinary-placeholder.component';
import { isBrowser } from './cloudinary.service';
import { accessibilityEffect } from './constants';
import { analyticsOptionsDefault }  from './analyticsOptionsDefault';

@Component({
  selector: 'cl-image',
  template: `<img [ngStyle]="getPlaceHolderStyle()"(load)="hasLoaded()">
  <div *ngIf="placeholderComponent"[style.display]="shouldShowPlaceHolder ? 'inline' : 'none'">
      <ng-content></ng-content>
  </div>
  `,
})
export class CloudinaryImage
  implements AfterViewInit, OnInit, AfterViewInit, AfterContentChecked, OnChanges, OnDestroy {
  @Input('public-id') publicId: string;
  @Input('client-hints') clientHints?: boolean;
  @Input('loading') loading: string;
  @Input('width') width?: string;
  @Input('height') height?: string;
  @Input('accessibility') accessibility?: string;

  @ContentChildren(CloudinaryTransformationDirective)
  transformations: QueryList<CloudinaryTransformationDirective>;
  @ContentChild(CloudinaryPlaceHolder) placeholderComponent: CloudinaryPlaceHolder;

  @Output() onLoad: EventEmitter<boolean> = new EventEmitter(); // Callback when an image is loaded successfully
  @Output() onError: EventEmitter<boolean> = new EventEmitter(); // Callback when an image is loaded with error

  observer: MutationObserver;
  shouldShowPlaceHolder = true;
  options: object = {};

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

  ngAfterContentChecked() {
    if (this.width && this.placeholderComponent) {
      this.placeholderComponent.setWidth(this.width);
    }
    if (this.height && this.placeholderComponent) {
      this.placeholderComponent.setHeight(this.height);
    }
    if (this.placeholderComponent) {
      this.placeholderComponent.setPublicId(this.publicId);
    }
  }

  getPlaceHolderStyle() {
    return {[this.shouldShowPlaceHolder ? 'opacity' : ''] : '0',
      [this.shouldShowPlaceHolder ? 'position' : ''] : 'absolute'}
  }

  hasLoaded() {
    this.shouldShowPlaceHolder = false;
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
      };
      image.onerror = e => {
        this.onError.emit(e);
      };
      const options = this.cloudinary.toCloudinaryAttributes(
        nativeElement.attributes,
        this.transformations
      );

      if (this.clientHints || (typeof this.clientHints === 'undefined' && this.cloudinary.config().client_hints)) {
        delete options['class'];
        delete options['data-src'];
        delete options['responsive'];
      }
      if (this.placeholderComponent) {
        this.placeholderHandler(options, image);
      }
      this.setAnalytics(options);
      if (this.accessibility) {
        this.options['src'] = this.accessibilityModeHandler();
      }

      const imageTag = this.cloudinary.imageTag(this.publicId, this.options);

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

  /**
   * Handles placeholder options
   * In case of responsive sets width from resize
   * In case width or height is known takes 10% of original dimension
   */
  placeholderHandler(options, image) {
    const placeholderOptions = { ...options };
    if (placeholderOptions['width']) {
      if (placeholderOptions['width'] === 'auto') {
        placeholderOptions['width'] = image.getAttribute('data-width');
      } else if (this.placeholderComponent.type !== 'vectorize') {
        placeholderOptions['width'] = Math.ceil(parseInt(options['width'], 10) * 0.1);
      }
    }
    if (placeholderOptions['height']) {
      placeholderOptions['height'] = Math.ceil(parseInt(options['height'], 10) * 0.1);
    }
    this.placeholderComponent.options = placeholderOptions;
  }

  accessibilityModeHandler() {
    return this.cloudinary.url(this.publicId, { transformation: [this.options, accessibilityEffect[this.accessibility]], analyticsOptions: this.options['analyticsOptions'] });
  }

  setAnalytics(options) {
    let analyticsOptions = {...analyticsOptionsDefault};

    if (this.cloudinary.config().analytics) {
      if (this.accessibility) {
        analyticsOptions.feature = 'D';
      }
      if (options.loading === 'lazy') {
        analyticsOptions.feature = 'C';
      }
      if (options.responsive) {
        analyticsOptions.feature = 'A';
      }
      this.options = {analyticsOptions, ...options};
    } else {
      this.options = options;
    }
  }
}
