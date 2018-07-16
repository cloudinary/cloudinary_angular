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
      expect(localCloudinary.responsive).toHaveBeenCalled();

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

  describe('images with overlay/underlay', () => {
    @Component({
      template: `
        <cl-image responsive id="image1" public-id="responsive_sample.jpg">
          <cl-transformation overlay="fetch:http://cloudinary.com/images/old_logo.png"></cl-transformation>
          <cl-transformation underlay="fetch:http://cloudinary.com/images/old_logo.png"></cl-transformation>
        </cl-image>
        <cl-image responsive id="image2" public-id="responsive_sample.jpg">
          <cl-transformation overlay="fetch:https://upload.wikimedia.org/wikipedia/commons/2/2b/고창갯벌.jpg"></cl-transformation>
          <cl-transformation underlay="fetch:https://upload.wikimedia.org/wikipedia/commons/2/2b/고창갯벌.jpg"></cl-transformation>
        </cl-image>
      `
    })
    class TestComponent { }
    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement[];

    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [CloudinaryTransformationDirective, CloudinaryImage, TestComponent],
        providers: [{ provide: Cloudinary, useValue: localCloudinary }]
      }).createComponent(TestComponent);
      fixture.detectChanges(); // initial binding
      // all elements with an attached CloudinaryImage
      des = fixture.debugElement.queryAll(By.directive(CloudinaryImage));
    });

    it('should serialize a fetch URL', () => {
      const img = des[0].children[0].nativeElement as HTMLImageElement;
      expect(img.src).toEqual(jasmine.stringMatching
        (/l_fetch:aHR0cDovL2Nsb3VkaW5hcnkuY29tL2ltYWdlcy9vbGRfbG9nby5wbmc=\/u_fetch:aHR0cDovL2Nsb3VkaW5hcnkuY29tL2ltYWdlcy9vbGRfbG9nby5wbmc=\/responsive_sample.jpg/));
      expect(img.attributes.getNamedItem('data-src').value).toEqual(jasmine.stringMatching(
        /l_fetch:aHR0cDovL2Nsb3VkaW5hcnkuY29tL2ltYWdlcy9vbGRfbG9nby5wbmc=\/u_fetch:aHR0cDovL2Nsb3VkaW5hcnkuY29tL2ltYWdlcy9vbGRfbG9nby5wbmc=\/responsive_sample.jpg/));
    });
    it('should support unicode URLs', () => {
      const img = des[1].children[0].nativeElement as HTMLImageElement;
      expect(img.src).toEqual(jasmine.stringMatching(
        new RegExp('l_fetch:aHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy8yLzJiLyVFQSVCMyVB' +
        'MCVFQyVCMCVCRCVFQSVCMCVBRiVFQiVCMiU4Qy5qcGc=/u_fetch:aHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEv' +
        'Y29tbW9ucy8yLzJiLyVFQSVCMyVBMCVFQyVCMCVCRCVFQSVCMCVBRiVFQiVCMiU4Qy5qcGc=/responsive_sample.jpg')));
      expect(img.attributes.getNamedItem('data-src').value).toEqual(jasmine.stringMatching(
        new RegExp('l_fetch:aHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy8yLzJiLyVFQSVCMyVB' +
        'MCVFQyVCMCVCRCVFQSVCMCVBRiVFQiVCMiU4Qy5qcGc=/u_fetch:aHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEv' +
        'Y29tbW9ucy8yLzJiLyVFQSVCMyVBMCVFQyVCMCVCRCVFQSVCMCVBRiVFQiVCMiU4Qy5qcGc=/responsive_sample.jpg')));
    });
  });

  describe('transformation attributes: quality', () => {
    @Component({
      template: `
        <cl-image responsive id="image1" public-id="responsive_sample.jpg">
          <cl-transformation quality="0.4"></cl-transformation>
        </cl-image>
        <cl-image responsive id="image2" public-id="responsive_sample.jpg">
          <cl-transformation quality="auto"></cl-transformation>
        </cl-image>
        <cl-image responsive id="image3" public-id="responsive_sample.jpg">
          <cl-transformation quality="auto:good"></cl-transformation>
        </cl-image>
      `
    })
    class TestComponent { }

    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement[];  // the elements w/ the directive

    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [CloudinaryTransformationDirective, CloudinaryImage, TestComponent],
        providers: [{ provide: Cloudinary, useValue: localCloudinary }]
      }).createComponent(TestComponent);

      fixture.detectChanges(); // initial binding

      // all elements with an attached CloudinaryImage
      des = fixture.debugElement.queryAll(By.directive(CloudinaryImage));
    });

    it('creates an img element which encodes the quality parameter to URL', () => {
      const testResults = ['q_0.4', 'q_auto', 'q_auto:good'];
      testResults.forEach((result, index) => {
        const img = des[index].children[0].nativeElement as HTMLImageElement;
        expect(img.src).toEqual(jasmine.stringMatching (new RegExp(`\/${result}\/responsive_sample.jpg`)));
      });
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
            <cl-transformation if="initialWidth > 400" effect="grayscale"></cl-transformation>
            <cl-transformation if="initialHeight < 200" effect="blur"></cl-transformation>
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
        (/c_scale,l_text:roboto_35_bold:SDK,w_300\/e_art:hokusai\/f_auto\/if_iw_gt_400,e_grayscale\/if_ih_lt_200,e_blur\/responsive_sample.jpg/));
      expect(img.attributes.getNamedItem('data-src')).toBeNull();
    });

    it('updates the underlying img dynamically by updating attributes', (done) => {
      // Couldn't get this to work with Angular's async or fakesync
      // Add another mutation observer on the node to be able to
      // verify the change
      const observer = new MutationObserver(() => {
        const img = des.children[0].nativeElement as HTMLImageElement;
        expect(img.src).toEqual(jasmine.stringMatching
          (/c_scale,l_text:roboto_35_bold:SDK,w_300\/e_art:hokusai\/f_auto\/if_iw_gt_400,e_grayscale\/if_ih_lt_200,e_blur\/o_50\/responsive_sample.jpg/));
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

  describe('event emitters', () => {
    let onImageLoad;
    let onImageError;
    let des: DebugElement;  // the elements w/ the directive

    @Component({
      template: `<cl-image id="image1" [public-id]="publicId"></cl-image>`
    })
    class TestComponent {
      publicId: string = 'sample';
    }

    let fixture: ComponentFixture<TestComponent>;

    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [CloudinaryTransformationDirective, CloudinaryImage, TestComponent],
        providers: [{ provide: Cloudinary, useValue: localCloudinary }]
      }).createComponent(TestComponent);

      fixture.detectChanges(); // initial binding
      // all elements with an attached CloudinaryImage
      des = fixture.debugElement.query(By.directive(CloudinaryImage));
      onImageLoad = jasmine.createSpy('onImageLoad');
      onImageError = jasmine.createSpy('onImageError');
      des.componentInstance.onLoad.subscribe(onImageLoad);
      des.componentInstance.onError.subscribe(onImageError);
    });

    it('calls the onLoad callback when image loads successfully', () => {
      // Simulate the load event
      const img = des.children[0].nativeElement as HTMLImageElement;
      img.dispatchEvent(new Event('load'));
      expect(onImageLoad).toHaveBeenCalled();
      expect(onImageError).not.toHaveBeenCalled();
    });

    it('calls the onError callback when image fails to load', () => {
      // Simulate the error event
      const img = des.children[0].nativeElement as HTMLImageElement;
      img.dispatchEvent(new CustomEvent('error', { detail: 'Eitan was here' }));
      expect(onImageLoad).not.toHaveBeenCalled();
      expect(onImageError).toHaveBeenCalled();
    });
  });

  describe('responsive images with nested transformations using the cld-responsive attribute', () => {
    @Component({
      template: `<cl-image cld-responsive id="image1" public-id="responsive_sample.jpg">
             <cl-transformation width="300" crop="scale" overlay="text:roboto_25_bold:SDK"></cl-transformation>
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
      expect(localCloudinary.responsive).toHaveBeenCalled();

      // all elements with an attached CloudinaryImage
      des = fixture.debugElement.query(By.directive(CloudinaryImage));
    });

    it('creates an img element which encodes the directive attributes to the URL', () => {
      const img = des.children[0].nativeElement as HTMLImageElement;
      expect(img.src).toEqual(jasmine.stringMatching
        (/c_scale,l_text:roboto_25_bold:SDK,w_300\/e_art:hokusai\/f_auto\/responsive_sample.jpg/));
      expect(img.attributes.getNamedItem('data-src').value).toEqual(jasmine.stringMatching(
        /c_scale,l_text:roboto_25_bold:SDK,w_300\/e_art:hokusai\/f_auto\/responsive_sample.jpg/));
    });
  });
});
