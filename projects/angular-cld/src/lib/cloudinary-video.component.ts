import {
  Component,
  ElementRef,
  Input,
  ContentChildren,
  QueryList,
  AfterViewInit,
  OnInit,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  PLATFORM_ID,
  Inject,
  EventEmitter,
  Output
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Cloudinary } from './cloudinary.service';
import { CloudinaryTransformationDirective } from './cloudinary-transformation.directive';

@Component({
  selector: 'cl-video',
  template: '<video (play)="emitPlayEvent()" (loadstart)="emitLoadstartEvent()" (playing)="emitPlayingEvent()" (error)="emitErrorEvent" (ended)="emitEndedEvent"></video>'
})
// See also video reference - http://cloudinary.com/documentation/video_manipulation_and_delivery#video_transformations_reference
export class CloudinaryVideo
  implements AfterViewInit, OnInit, OnChanges, OnDestroy {
  @Input('public-id') publicId: string;

  @Output() play: EventEmitter<any> = new EventEmitter();
  @Output() loadstart: EventEmitter<any> = new EventEmitter();
  @Output() playing: EventEmitter<any> = new EventEmitter();
  @Output() error: EventEmitter<any> = new EventEmitter();
  @Output() ended: EventEmitter<any> = new EventEmitter();

  @ContentChildren(CloudinaryTransformationDirective)
  transformations: QueryList<CloudinaryTransformationDirective>;

  observer: MutationObserver;

  constructor(private el: ElementRef, private cloudinary: Cloudinary, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (typeof MutationObserver !== 'undefined') {
      // Create an observer instance
      this.observer = new MutationObserver(() => {
        this.loadVideo(this.publicId);
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
      this.loadVideo(changes.publicId.currentValue);
    }
  }

  ngOnDestroy(): void {
    if (this.observer && this.observer.disconnect) {
      this.observer.disconnect();
    }
  }

  ngAfterViewInit() {
    if (!this.publicId) {
      throw new Error(
        'You must set the public id of the video to load, e.g. <cl-video public-id={{video.public_id}}...></cl-video>'
      );
    }
    this.loadVideo(this.publicId);
  }

  loadVideo(publicId: string) {
    // https://github.com/angular/universal#universal-gotchas
    if (isPlatformBrowser(this.platformId)) {
      const nativeElement = this.el.nativeElement;
      const video = nativeElement.children[0];
      const options = this.cloudinary.toCloudinaryAttributes(
        nativeElement.attributes,
        this.transformations
      );

      const videoTag = this.cloudinary.videoTag(publicId, options);

      // Replace template with the custom video tag created by Cloudinary
      this.appendSourceElements(video, videoTag.content());
      // Add attributes
      this.setElementAttributes(video, videoTag.attributes());
    }
  }

  setElementAttributes(element, attributesLiteral) {
    Object.keys(attributesLiteral).forEach(attrName => {
      element.setAttribute(attrName, attributesLiteral[attrName]);
    });
  }

  appendSourceElements(element, html) {
    const fragment = document.createDocumentFragment();
    element.innerHTML = html;

    while (element.childNodes[0]) {
      fragment.appendChild(element.childNodes[0]);
    }
    element.appendChild(fragment);
  }

  emitPlayEvent() {
    this.play.emit();
  }

  emitLoadstartEvent() {
    this.loadstart.emit();
  }

  emitPlayingEvent() {
    this.playing.emit();
  }

  emitErrorEvent() {
    this.error.emit();
  }

  emitEndedEvent() {
    this.ended.emit();
  }
}
