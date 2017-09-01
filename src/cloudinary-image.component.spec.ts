import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Cloudinary } from './cloudinary.service';
import CloudinaryConfiguration from './cloudinary-configuration.class';
import { CloudinaryImage } from './cloudinary-image.component';
import { CloudinaryTransformationDirective } from './cloudinary-transformation.directive';

describe('CloudinaryImage', () => {

  let localCloudinary: Cloudinary = new Cloudinary(require('cloudinary-core'),
    { cloud_name: '@@fake_angular2_sdk@@' } as CloudinaryConfiguration);

  beforeEach(() => {
    spyOn(localCloudinary, 'toCloudinaryAttributes').and.callThrough();
    spyOn(localCloudinary, 'url').and.callThrough();
    spyOn(localCloudinary, 'responsive').and.callThrough();
  });

  describe('responsive images without nested transformations', () => {
    @Component({
      template: `<cl-image responsive id="image1" width="300" crop="scale" effect="blackwhite" public-id="responsive_sample.jpg"></cl-image>`
    })
    class TestComponent { }

    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement;  // the elements w/ the directive

    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [CloudinaryImage, TestComponent],
        providers: [{ provide: Cloudinary, useValue: localCloudinary }]
      }).createComponent(TestComponent);

      fixture.detectChanges(); // initial binding

      // all elements with an attached CloudinaryImage
      des = fixture.debugElement.query(By.directive(CloudinaryImage));
    });

    it('creates an img element which encodes the directive attributes to the URL', () => {
      const img = des.children[0].nativeElement as HTMLImageElement;
      // http://res.cloudinary.com/@@fake_angular2_sdk@@/image/upload/c_scale,e_blackwhite,w_300/responsive_sample.jpg
      expect(img.attributes.getNamedItem('src').value).toEqual(jasmine.stringMatching(/c_scale,e_blackwhite,w_300\/responsive_sample.jpg/));
      expect(img.attributes.getNamedItem('data-src').value).toEqual(jasmine.stringMatching(/c_scale,e_blackwhite,w_300\/responsive_sample.jpg/));
    });
  });

  describe('responsive images with nested transformations', () => {
    @Component({
      template: `<cl-image responsive id="image1" public-id="responsive_sample.jpg">
            <cl-transformation width="300" crop="scale" overlay="text:roboto_25_bold:SDK"></cl-transformation>
            <cl-transformation effect="art:hokusai" gravity="auto"></cl-transformation>
            <cl-transformation fetch-format="auto"></cl-transformation>
            </cl-image>`
    })
    class TestComponent { }

    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement;  // the elements w/ the directive

    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [CloudinaryTransformationDirective, CloudinaryImage, TestComponent],
        providers: [{ provide: Cloudinary, useValue: localCloudinary }]
      }).createComponent(TestComponent);

      fixture.detectChanges(); // initial binding

      // all elements with an attached CloudinaryImage
      des = fixture.debugElement.query(By.directive(CloudinaryImage));
    });

    it('creates an img element which encodes the directive attributes to the URL', () => {
      const img = des.children[0].nativeElement as HTMLImageElement;
      expect(img.src).toEqual(jasmine.stringMatching
        (/c_scale,l_text:roboto_25_bold:SDK,w_300\/e_art:hokusai,g_auto\/f_auto\/responsive_sample.jpg/));
      expect(img.attributes.getNamedItem('data-src').value).toEqual(jasmine.stringMatching(
        /c_scale,l_text:roboto_25_bold:SDK,w_300\/e_art:hokusai,g_auto\/f_auto\/responsive_sample.jpg/));
    });
  });

  describe('missing public-id', () => {
    @Component({
      template: '<cl-image responsive id="image1"></cl-image>'
    })
    class TestComponent { }

    it('throws if the directive is missing a public-id attribute', () => {
      const fixture = TestBed.configureTestingModule({
        declarations: [CloudinaryTransformationDirective, CloudinaryImage, TestComponent],
        providers: [{ provide: Cloudinary, useValue: localCloudinary }]
      }).createComponent(TestComponent);
      expect(() => { fixture.detectChanges(); }).toThrowError(/You must set the public id of the image to load/i);
    });
  });

  describe('non-responsive images with nested transformations', () => {
    @Component({
      template: `<cl-image id="image1" public-id="responsive_sample.jpg">
            <cl-transformation width="300" crop="scale" overlay="text:roboto_35_bold:SDK"></cl-transformation>
            <cl-transformation effect="art:hokusai"></cl-transformation>
            <cl-transformation fetch-format="auto"></cl-transformation>
            </cl-image>`
    })
    class TestComponent { }

    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement;  // the elements w/ the directive

    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [CloudinaryTransformationDirective, CloudinaryImage, TestComponent],
        providers: [{ provide: Cloudinary, useValue: localCloudinary }]
      }).createComponent(TestComponent);

      fixture.detectChanges(); // initial binding

      // all elements with an attached CloudinaryImage
      des = fixture.debugElement.query(By.directive(CloudinaryImage));
    });

    it('creates an img element which encodes the directive attributes to the URL', () => {
      const img = des.children[0].nativeElement as HTMLImageElement;
      expect(img.src).toEqual(jasmine.stringMatching
        (/c_scale,l_text:roboto_35_bold:SDK,w_300\/e_art:hokusai\/f_auto\/responsive_sample.jpg/));
      expect(img.attributes.getNamedItem('data-src')).toBeNull();
    });

    it('updates the underlying img dynamically by updating attributes', (done) => {
      // Couldn't get this to work with Angular's async or fakesync
      // Add another mutation observer on the node to be able to
      // verify the change
      const observer = new MutationObserver(() => {
        const img = des.children[0].nativeElement as HTMLImageElement;
        expect(img.src).toEqual(jasmine.stringMatching
          (/c_scale,l_text:roboto_35_bold:SDK,w_300\/e_art:hokusai\/f_auto\/o_50\/responsive_sample.jpg/));
        observer.disconnect();
        done();
      });
      // Observe changes to attributes or child transformations to re-render the image
      const config = { attributes: true, childList: true };

      // pass in the target node, as well as the observer options
      observer.observe(des.nativeElement, config);

      des.nativeElement.setAttribute('opacity', '50');
    });

  });

  describe('responsive images with nested conditional transformations', () => {
    @Component({
      template: `<cl-image id="image1" public-id="responsive_sample.jpg">
            <cl-transformation
              if="!sale!_in_tags"
              color="rgb:FF007F"
              effect="colorize"
              overlay="sale_icon"
              gravity="south_east"
              width="200"
              x="30"
              y="30"
            ></cl-transformation>
            </cl-image>`
    })
    class TestComponent { }

    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement;  // the elements w/ the directive

    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [CloudinaryTransformationDirective, CloudinaryImage, TestComponent],
        providers: [{ provide: Cloudinary, useValue: localCloudinary }]
      }).createComponent(TestComponent);

      fixture.detectChanges(); // initial binding

      // all elements with an attached CloudinaryImage
      des = fixture.debugElement.query(By.directive(CloudinaryImage));
    });

    it('creates an img element which encodes the directive attributes to the URL', () => {
      const img = des.children[0].nativeElement as HTMLImageElement;
      expect(img.src).toEqual(jasmine.stringMatching
        (/if_!sale!_in_tags,co_rgb:FF007F,e_colorize,g_south_east,l_sale_icon,w_200,x_30,y_30\/responsive_sample.jpg/));
      expect(img.attributes.getNamedItem('data-src')).toBeNull();
    });
  });

  describe('Sample code presented in README', () => {
    @Component({
      template:
      `
            <cl-image public-id="readme" class="thumbnail inline" angle="20" format="jpg">
                <cl-transformation height="150" width="150" crop="fill" effect="sepia" radius="20"></cl-transformation>
                <cl-transformation overlay="text:arial_60:readme" gravity="north" y="20"></cl-transformation>
            </cl-image>
            `
    })
    class TestComponent { }

    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement;  // the elements w/ the directive

    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [CloudinaryTransformationDirective, CloudinaryImage, TestComponent],
        providers: [{ provide: Cloudinary, useValue: localCloudinary }]
      }).createComponent(TestComponent);

      fixture.detectChanges(); // initial binding

      // Our element under test, which is attached to CloudinaryImage
      des = fixture.debugElement.query(By.directive(CloudinaryImage));
    });

    it('creates an img element which encodes the directive attributes to the URL', () => {
      const img = des.children[0].nativeElement as HTMLImageElement;
      expect(img.src).toEqual(jasmine.stringMatching
        (/c_fill,e_sepia,h_150,r_20,w_150\/g_north,l_text:arial_60:readme,y_20\/a_20\/readme.jpg/));
      expect(img.attributes.getNamedItem('data-src')).toBeNull();
    });
  });

  describe('Bound public-id', () => {
    @Component({
      template: `<cl-image id="image1" [public-id]="publicId"></cl-image>`
    })
    class TestComponent {
      publicId: string = 'sample';
    }

    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement;  // the elements w/ the directive

    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [CloudinaryTransformationDirective, CloudinaryImage, TestComponent],
        providers: [{ provide: Cloudinary, useValue: localCloudinary }]
      }).createComponent(TestComponent);

      fixture.detectChanges(); // initial binding
      // all elements with an attached CloudinaryImage
      des = fixture.debugElement.query(By.directive(CloudinaryImage));
    });

    it('creates an img element with a bound public-id', () => {
      const img = des.children[0].nativeElement as HTMLImageElement;
      expect(img.src).toEqual(jasmine.stringMatching(/image\/upload\/sample/));

      // Update data-bound publicId
      fixture.componentInstance.publicId = 'updatedId';
      fixture.detectChanges();

      // Verify that the img src has updated
      expect(img.src).toEqual(jasmine.stringMatching(/image\/upload\/updatedId/));
    });
  });
});

