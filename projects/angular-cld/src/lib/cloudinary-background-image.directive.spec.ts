import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Cloudinary } from './cloudinary.service';
import CloudinaryConfiguration from './cloudinary-configuration.class';
import { CloudinaryBackgroundImageDirective } from './cloudinary-background-image.directive'
import { CloudinaryTransformationDirective } from './cloudinary-transformation.directive';

@Component({
  template: `
    <button [clBackgroundImage]="image.public_id" fetch_format="auto" target="_blank">
        <cl-transformation effect="sepia"></cl-transformation>
        click me
    </button>
    <img [clBackgroundImage]="image.public_id" width="100" crop="scale"/>
    `
})
class TestComponent { }

describe('CloudinaryBackgroundImageDirective', () => {

  let fixture: ComponentFixture<TestComponent>;
  let des: DebugElement[];  // the three elements w/ the directive
  let localCloudinary: Cloudinary = new Cloudinary(require('cloudinary-core'),
    { cloud_name: '@@fake_angular2_sdk@@' } as CloudinaryConfiguration);

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [CloudinaryBackgroundImageDirective, CloudinaryTransformationDirective, TestComponent],
      providers: [{ provide: Cloudinary, useValue: localCloudinary }]
    }).createComponent(TestComponent);
    const comp = fixture.componentInstance;

    // pretend that it was wired to something that supplied an image
    comp['image'] = {
      public_id: 'some_image_id'
    };

    fixture.detectChanges(); // initial binding

    // all elements with an attached CloudinaryImageSourceDirective
    des = fixture.debugElement.queryAll(By.directive(CloudinaryBackgroundImageDirective));
  });

  it('should have 1 element', () => {
    expect(des.length).toBe(2);
  });

  it('updates the background image with transformations', () => {
    const button = des[0].nativeElement as HTMLButtonElement;
    expect(button.style.backgroundImage).toEqual(jasmine.stringMatching(/image\/upload\/e_sepia\/f_auto\/some_image_id/));
    expect(button.textContent).toEqual(jasmine.stringMatching(/click me/));
  });

  it('updates the background image without transformations', () => {
    const div = des[1].nativeElement as HTMLDivElement;
    expect(div.style.backgroundImage).toEqual(jasmine.stringMatching(/c_scale,w_100\/some_image_id/));
  });
});
