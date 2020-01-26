import { Component, DebugElement } from '@angular/core';
import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Cloudinary } from './cloudinary.service';
import CloudinaryConfiguration from './cloudinary-configuration.class';
import { CloudinaryImage } from './cloudinary-image.component';
import { CloudinaryTransformationDirective } from './cloudinary-transformation.directive';
import {LazyLoadDirective } from './cloudinary-lazy-load.directive';
import { CloudinaryPlaceHolder } from'./cloudinary-placeholder.component';

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
  describe('should support custom function remote', () => {
    @Component({
      template:
        `
        <cl-image public-id="sample">
          <cl-transformation  custom_function='{"function_type":"remote", "source": "https://df34ra4a.execute-api.us-west-2.amazonaws.com/default/cloudinaryFunction"}'></cl-transformation>
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
      (/fn_remote:aHR0cHM6Ly9kZjM0cmE0YS5leGVjdXRlLWFwaS51cy13ZXN0LTIuYW1hem9uYXdzLmNvbS9kZWZhdWx0L2Nsb3VkaW5hcnlGdW5jdGlvbg==\/sample/));
      expect(img.attributes.getNamedItem('data-src')).toBeNull();
    });
  });

  describe('should support custom function wasm', () => {
    @Component({
      template:
        `
        <cl-image public-id="sample">
          <cl-transformation  custom_function='{"function_type":"wasm", "source": "blur.wasm"}'></cl-transformation>
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
      (/fn_wasm:blur.wasm\/sample/));
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

  describe('responsive images with locally configured client hints', () => {
    @Component({
      template: `<cl-image public-id="sample.jpg" [client-hints]="true" responsive>
           <cl-transformation crop='scale' width='auto' dpr='auto'></cl-transformation>
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

    it('should not implement responsive behaviour if client hints attribute is true', () => {
      const img = des.children[0].nativeElement as HTMLImageElement;
      expect(img.hasAttribute('class')).toBe(false);
      expect(img.hasAttribute('data-src')).toBe(false);
      expect(img.attributes.getNamedItem('src').value).toEqual(jasmine.stringMatching(/c_scale,dpr_auto,w_auto/));
    });
  });

  describe('responsive images with global configured client hints', () => {
    @Component({
      template: `<cl-image id="image_1" public-id="sample.jpg" responsive>
                   <cl-transformation crop='scale' width='auto' dpr='auto'></cl-transformation>
                 </cl-image>
                 <cl-image id="image_2" public-id="sample.jpg" [client-hints]="false" responsive>
                   <cl-transformation crop='scale' width='auto' dpr='auto'></cl-transformation>
                 </cl-image>`
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement[];  // the elements w/ the directive
    let testLocalCloudinary: Cloudinary = new Cloudinary(require('cloudinary-core'),
      { cloud_name: '@@fake_angular2_sdk@@', client_hints: true } as CloudinaryConfiguration);
    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [CloudinaryTransformationDirective, CloudinaryImage, TestComponent],
        providers: [{ provide: Cloudinary, useValue: testLocalCloudinary }]
      }).createComponent(TestComponent);

      fixture.detectChanges(); // initial binding
      // all elements with an attached CloudinaryImage
      des = fixture.debugElement.queryAll(By.directive(CloudinaryImage));
    });

    it('should not implement responsive behaviour if client hints set in config', () => {
      const img = des[0].children[0].nativeElement as HTMLImageElement;
      expect(img.hasAttribute('class')).toBe(false);
      expect(img.hasAttribute('data-src')).toBe(false);
      expect(img.attributes.getNamedItem('src').value).toEqual(jasmine.stringMatching(/c_scale,dpr_auto,w_auto/));
    });
    it('should allow to override global client_hints option with tag attribute', () => {
      const img = des[1].children[0].nativeElement as HTMLImageElement;
      expect(img.hasAttribute('class')).toBe(true);
      expect(img.attributes.getNamedItem('src').value).toEqual(jasmine.stringMatching(/c_scale,dpr_auto,w_auto/));
    });
  });

  describe('lazy load image', async () => {
    @Component({
      template: `
          <div class="startWindow"><cl-image loading="lazy" width="300" public-id="bear"></cl-image></div>
          <div style="margin-top: 300px"><cl-image loading="lazy" width="300" public-id="bear"></cl-image></div>
          <div style="margin-top: 300px"><cl-image loading="lazy" width="300" public-id="bear"></cl-image></div>
          <div style="margin-top: 300px"><cl-image loading="lazy" width="300" public-id="bear"></cl-image></div>
          <div style="margin-top: 300px"><cl-image loading="lazy" width="300" public-id="bear"></cl-image></div>
          <div style="margin-top: 300px"><cl-image loading="lazy" width="300" public-id="bear"></cl-image></div>
          <div style="margin-top: 300px"><cl-image loading="lazy" width="300" public-id="bear"></cl-image></div>
          <div class="endWindow" style="margin-top: 300px"><cl-image loading="lazy" width="300" public-id="bear"></cl-image></div>`
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement[];  // the elements w/ the directive
    let testLocalCloudinary: Cloudinary = new Cloudinary(require('cloudinary-core'),
      { cloud_name: '@@fake_angular2_sdk@@', client_hints: true } as CloudinaryConfiguration);
    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [CloudinaryTransformationDirective, CloudinaryImage, TestComponent, LazyLoadDirective],
        providers: [{ provide: Cloudinary, useValue: testLocalCloudinary }]
      }).createComponent(TestComponent);

      fixture.detectChanges(); // initial binding
      // all elements with an attached CloudinaryImage
      des = fixture.debugElement.queryAll(By.directive(CloudinaryImage));
    });

    it('should load eagerly', () => {
      const img = des[0].children[0].nativeElement as HTMLImageElement;
      expect(img.hasAttribute('src')).toBe(true);
      expect(img.attributes.getNamedItem('src').value).toEqual(jasmine.stringMatching('image/upload/bear'));
    });
    it('Should lazy load post scroll', async() => {
      const delay = 300;
      const wait = (ms) => new Promise(res => setTimeout(res, ms));
      const count = async () => document.querySelectorAll('.startWindow').length;
      const scrollDown = async () => {
        document.querySelector('.endWindow')
          .scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' });
      }

      let preCount = 0;
      let postCount = 0;
      do {
        preCount = await count();
        await scrollDown();
        await wait(delay);
        postCount = await count();
      } while (postCount > preCount);
      await wait(delay);

      const img = des[3].children[0].nativeElement as HTMLImageElement;
      expect(img.hasAttribute('src')).toBe(true);
      expect(img.attributes.getNamedItem('src').value).toEqual(jasmine.stringMatching('image/upload/bear'));
    });
  });
  describe('lazy load image with default placeholder', async () => {
    @Component({
      template: `
          <div class="startWindow"><cl-image loading="lazy" width="300" public-id="bear"></cl-image></div>
          <div style="margin-top: 300px"><cl-image loading="lazy" width="300" public-id="bear"></cl-image></div>
          <div style="margin-top: 300px"><cl-image loading="lazy" width="300" public-id="bear">
              <cl-placeholder></cl-placeholder>
          </cl-image></div>
          <div style="margin-top: 300px"><cl-image loading="lazy" width="300" public-id="bear"></cl-image></div>
          <div style="margin-top: 300px"><cl-image loading="lazy" width="300" public-id="bear"></cl-image></div>
          <div style="margin-top: 300px"><cl-image loading="lazy" width="300" public-id="bear"></cl-image></div>
          <div style="margin-top: 300px"><cl-image loading="lazy" width="300" public-id="bear"></cl-image></div>
          <div class="endWindow" style="margin-top: 300px"><cl-image loading="lazy" width="300" public-id="bear"></cl-image></div>`
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement[];  // the elements w/ the directive
    let placeholder: DebugElement[];
    let testLocalCloudinary: Cloudinary = new Cloudinary(require('cloudinary-core'),
      { cloud_name: '@@fake_angular2_sdk@@', client_hints: true } as CloudinaryConfiguration);
    beforeEach(fakeAsync(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [CloudinaryTransformationDirective, CloudinaryImage, TestComponent, LazyLoadDirective, CloudinaryPlaceHolder],
        providers: [{ provide: Cloudinary, useValue: testLocalCloudinary }]
      }).createComponent(TestComponent);

      fixture.detectChanges(); // initial binding
      // all elements with an attached CloudinaryImage
      des = fixture.debugElement.queryAll(By.directive(CloudinaryImage));
      placeholder = fixture.debugElement.queryAll(By.directive(CloudinaryPlaceHolder));
      tick();
      fixture.detectChanges();
    }));
    it('should load eagerly', () => {
      const img = des[0].children[0].nativeElement as HTMLImageElement;
      expect(img.hasAttribute('src')).toBe(true);
      expect(img.attributes.getNamedItem('src').value).toEqual(jasmine.stringMatching('image/upload/bear'));
    });
    it('Should lazy load post scroll', async () => {
      const delay = 300;
      const wait = (ms) => new Promise(res => setTimeout(res, ms));
      const count = async () => document.querySelectorAll('.startWindow').length;
      const scrollDown = async () => {
        document.querySelector('.endWindow')
          .scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' });
      }

      let preCount = 0;
      let postCount = 0;
      do {
        preCount = await count();
        await scrollDown();
        await wait(delay);
        postCount = await count();
      } while (postCount > preCount);
      await wait(delay);

      const placeholderimg = placeholder[0].children[0].nativeElement as HTMLImageElement;
      const img = des[3].children[0].nativeElement as HTMLImageElement;
      expect(placeholderimg.attributes.getNamedItem('src').value).toEqual(jasmine.stringMatching('image/upload/e_blur:2000,f_auto,q_1/bear'));
      expect(img.hasAttribute('src')).toBe(true);
      expect(img.attributes.getNamedItem('src').value).toEqual(jasmine.stringMatching('image/upload/bear'));
    });
  });
  describe('lazy load image with pixelate placeholder', async () => {
    @Component({
      template: `
          <div class="startWindow"><cl-image loading="lazy" width="300" public-id="bear"></cl-image></div>
          <div style="margin-top: 300px"><cl-image loading="lazy" width="300" public-id="bear"></cl-image></div>
          <div style="margin-top: 300px">
              <cl-image loading="lazy" width="300" public-id="bear">
                  <cl-placeholder type="pixelate"></cl-placeholder>
              </cl-image>
          </div>
          <div style="margin-top: 300px"><cl-image loading="lazy" width="300" public-id="bear"></cl-image></div>
          <div class="endWindow" style="margin-top: 300px"><cl-image loading="lazy" width="300" public-id="bear"></cl-image></div>`
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement[];  // the elements w/ the directive
    let testLocalCloudinary: Cloudinary = new Cloudinary(require('cloudinary-core'),
      { cloud_name: '@@fake_angular2_sdk@@', client_hints: true } as CloudinaryConfiguration);
    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [CloudinaryTransformationDirective, CloudinaryImage, TestComponent, LazyLoadDirective, CloudinaryPlaceHolder],
        providers: [{ provide: Cloudinary, useValue: testLocalCloudinary }]
      }).createComponent(TestComponent);

      fixture.detectChanges(); // initial binding
      // all elements with an attached CloudinaryImage
      des = fixture.debugElement.queryAll(By.directive(CloudinaryPlaceHolder));
    });
    it('should load placeholder eagerly', fakeAsync(() => {
      tick();
      fixture.detectChanges();
      const img = des[0].children[0].nativeElement as HTMLImageElement;
      expect(img.attributes.getNamedItem('src').value).toEqual(jasmine.stringMatching('image/upload/e_pixelate,f_auto,q_1/bear'));
    }));
  });
  describe('placeholder default', () => {
    @Component({
      template: `<cl-image public-id="bear">
          <cl-placeholder></cl-placeholder>
      </cl-image>`
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement[];  // the elements w/ the directive
    let testLocalCloudinary: Cloudinary = new Cloudinary(require('cloudinary-core'),
      { cloud_name: '@@fake_angular2_sdk@@', client_hints: true } as CloudinaryConfiguration);
    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [CloudinaryTransformationDirective, CloudinaryImage, TestComponent, CloudinaryPlaceHolder],
        providers: [{ provide: Cloudinary, useValue: testLocalCloudinary }]
      }).createComponent(TestComponent);

      fixture.detectChanges(); // initial binding
      des = fixture.debugElement.queryAll(By.directive(CloudinaryPlaceHolder));
    });
    it('creates an img element with placeholder', fakeAsync(() => {
      tick();
      fixture.detectChanges();
      const img = des[0].children[0].nativeElement as HTMLImageElement;
      expect(img.attributes.getNamedItem('src').value).toEqual(jasmine.stringMatching('image/upload/e_blur:2000,f_auto,q_1/bear'));
    }));
  });
  describe('placeholder type blur', () => {
    @Component({
      template: `<cl-image public-id="bear" width="300" crop="fit">
          <cl-placeholder type="blur"></cl-placeholder>
      </cl-image>`
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement[];  // the elements w/ the directive
    let testLocalCloudinary: Cloudinary = new Cloudinary(require('cloudinary-core'),
      { cloud_name: '@@fake_angular2_sdk@@', client_hints: true } as CloudinaryConfiguration);
    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [CloudinaryTransformationDirective, CloudinaryImage, TestComponent, CloudinaryPlaceHolder],
        providers: [{ provide: Cloudinary, useValue: testLocalCloudinary }]
      }).createComponent(TestComponent);

      fixture.detectChanges(); // initial binding
      des = fixture.debugElement.queryAll(By.directive(CloudinaryPlaceHolder));
    });
    it('creates an img element with placeholder', fakeAsync(() => {
      tick();
      fixture.detectChanges();
      const img = des[0].children[0].nativeElement as HTMLImageElement;
      expect(img.attributes.getNamedItem('src').value).toEqual(jasmine.stringMatching('c_fit,w_30/e_blur:2000,f_auto,q_1/bear'));
    }));
  });
  describe('placeholder type pixelate', () => {
    @Component({
      template: `<cl-image public-id="bear" width="300" crop="fit">
          <cl-placeholder type="pixelate"></cl-placeholder>
      </cl-image>`
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement[];  // the elements w/ the directive
    let testLocalCloudinary: Cloudinary = new Cloudinary(require('cloudinary-core'),
      { cloud_name: '@@fake_angular2_sdk@@', client_hints: true } as CloudinaryConfiguration);
    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [CloudinaryTransformationDirective, CloudinaryImage, TestComponent, CloudinaryPlaceHolder],
        providers: [{ provide: Cloudinary, useValue: testLocalCloudinary }]
      }).createComponent(TestComponent);

      fixture.detectChanges(); // initial binding
      des = fixture.debugElement.queryAll(By.directive(CloudinaryPlaceHolder));
    });
    it('creates an img element with placeholder', fakeAsync(() => {
      tick();
      fixture.detectChanges();
      const img = des[0].children[0].nativeElement as HTMLImageElement;
      expect(img.attributes.getNamedItem('src').value).toEqual(jasmine.stringMatching('image/upload/c_fit,w_30/e_pixelate,f_auto,q_1/bear'));
    }));
  });
  describe('placeholder type predominant', () => {
    @Component({
      template: `<cl-image public-id="bear" width="300" crop="fit">
          <cl-placeholder type="predominant"></cl-placeholder>
      </cl-image>`
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement[];  // the elements w/ the directive
    let testLocalCloudinary: Cloudinary = new Cloudinary(require('cloudinary-core'),
      { cloud_name: '@@fake_angular2_sdk@@', client_hints: true } as CloudinaryConfiguration);
    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [CloudinaryTransformationDirective, CloudinaryImage, TestComponent, CloudinaryPlaceHolder],
        providers: [{ provide: Cloudinary, useValue: testLocalCloudinary }]
      }).createComponent(TestComponent);

      fixture.detectChanges(); // initial binding
      des = fixture.debugElement.queryAll(By.directive(CloudinaryPlaceHolder));
    });
    it('creates an img element with placeholder', fakeAsync(() => {
      tick();
      fixture.detectChanges();
      const img = des[0].children[0].nativeElement as HTMLImageElement;
      expect(img.attributes.getNamedItem('src').value).toEqual(jasmine.stringMatching('image/upload/c_fit,w_30/ar_1,b_auto,' +
        'c_pad,w_iw_div_2/c_crop,g_north_east,h_10,w_10/c_fill,h_ih,w_iw/f_auto,q_auto/bear'));
    }));
  });
  describe('placeholder type vectorize', () => {
    @Component({
      template: `<cl-image public-id="bear" width="300" crop="fit">
          <cl-placeholder type="vectorize"></cl-placeholder>
      </cl-image>`
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement[];  // the elements w/ the directive
    let testLocalCloudinary: Cloudinary = new Cloudinary(require('cloudinary-core'),
      { cloud_name: '@@fake_angular2_sdk@@', client_hints: true } as CloudinaryConfiguration);
    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [CloudinaryTransformationDirective, CloudinaryImage, TestComponent, CloudinaryPlaceHolder],
        providers: [{ provide: Cloudinary, useValue: testLocalCloudinary }]
      }).createComponent(TestComponent);

      fixture.detectChanges(); // initial binding
      des = fixture.debugElement.queryAll(By.directive(CloudinaryPlaceHolder));
    });
    it('creates an img element with placeholder', fakeAsync(() => {
      tick();
      fixture.detectChanges();
      const img = des[0].children[0].nativeElement as HTMLImageElement;
      expect(img.attributes.getNamedItem('src').value).toEqual(jasmine.stringMatching('image/upload/c_fit,w_30/e_vectorize,q_1/bear'));
    }));
  });
  describe('placeholder with cl-transformation', () => {
    @Component({
      template: `<cl-image public-id="bear" width="300" crop="fit">
          <cl-transformation effect="sepia"></cl-transformation>
          <cl-placeholder type="blur"></cl-placeholder>
      </cl-image>`
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement[];  // the elements w/ the directive
    let testLocalCloudinary: Cloudinary = new Cloudinary(require('cloudinary-core'),
      { cloud_name: '@@fake_angular2_sdk@@', client_hints: true } as CloudinaryConfiguration);
    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [CloudinaryTransformationDirective, CloudinaryImage, TestComponent, CloudinaryPlaceHolder],
        providers: [{ provide: Cloudinary, useValue: testLocalCloudinary }]
      }).createComponent(TestComponent);
      fixture.detectChanges(); // initial binding
      des = fixture.debugElement.queryAll(By.directive(CloudinaryPlaceHolder));
    });
    it('creates an img element with placeholder and cl-transformations', fakeAsync(() => {
      tick();
      fixture.detectChanges();
      const img = des[0].children[0].nativeElement as HTMLImageElement;
      expect(img.attributes.getNamedItem('src').value).toEqual(jasmine.stringMatching('e_sepia/c_fit,w_30/e_blur:2000,f_auto,q_1/bear'));
    }));
  });
  describe('cl-image with acessibility modes', () => {
    @Component({
      template: `<cl-image public-id="bear" accessibility="darkmode"></cl-image>
      <cl-image public-id="bear" accessibility="monochrome"></cl-image>
      <cl-image public-id="bear" accessibility="brightmode"></cl-image>
      <cl-image public-id="bear" accessibility="colorblind"></cl-image>`
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement[];  // the elements w/ the directive
    let testLocalCloudinary: Cloudinary = new Cloudinary(require('cloudinary-core'),
      { cloud_name: '@@fake_angular2_sdk@@', client_hints: true } as CloudinaryConfiguration);
    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [CloudinaryTransformationDirective, CloudinaryImage, TestComponent],
        providers: [{ provide: Cloudinary, useValue: testLocalCloudinary }]
      }).createComponent(TestComponent);
      fixture.detectChanges(); // initial binding
      des = fixture.debugElement.queryAll(By.directive(CloudinaryImage));
    });
    it('creates an img element with accessibility darkmode', fakeAsync(() => {
      const img = des[0].children[0].nativeElement as HTMLImageElement;
      expect(img.attributes.getNamedItem('src').value).toEqual(jasmine.stringMatching('e_tint:75:black/bear'));
    }));
    it('creates an img element with accessibility monochrome', fakeAsync(() => {
      const img = des[1].children[0].nativeElement as HTMLImageElement;
      expect(img.attributes.getNamedItem('src').value).toEqual(jasmine.stringMatching('e_grayscale/bear'));
    }));
    it('creates an img element with accessibility brightmode', fakeAsync(() => {
      const img = des[2].children[0].nativeElement as HTMLImageElement;
      expect(img.attributes.getNamedItem('src').value).toEqual(jasmine.stringMatching('e_tint:50:white/bear'));
    }));
    it('creates an img element with accessibility colorblind', fakeAsync(() => {
      const img = des[3].children[0].nativeElement as HTMLImageElement;
      expect(img.attributes.getNamedItem('src').value).toEqual(jasmine.stringMatching('e_assist_colorblind/bear'));
    }));
  });
  describe('cl-image with acessibility modes and transformation', () => {
    @Component({
      template: `<cl-image public-id="bear" accessibility="darkmode" effect="grayscale" overlay="sample">
        <cl-transformation effect="sepia"></cl-transformation>
      </cl-image>`
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement[];  // the elements w/ the directive
    let testLocalCloudinary: Cloudinary = new Cloudinary(require('cloudinary-core'),
      { cloud_name: '@@fake_angular2_sdk@@', client_hints: true } as CloudinaryConfiguration);
    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [CloudinaryTransformationDirective, CloudinaryImage, TestComponent],
        providers: [{ provide: Cloudinary, useValue: testLocalCloudinary }]
      }).createComponent(TestComponent);
      fixture.detectChanges(); // initial binding
      des = fixture.debugElement.queryAll(By.directive(CloudinaryImage));
    });
    it('creates an img element with accessibility darkmode without overwriting effect', fakeAsync(() => {
      const img = des[0].children[0].nativeElement as HTMLImageElement;
      expect(img.attributes.getNamedItem('src').value).toEqual(jasmine.stringMatching('e_sepia/e_grayscale,l_sample/e_tint:75:black/bear'));
    }));
  });
});
