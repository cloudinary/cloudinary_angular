import { Component, DebugElement } from '@angular/core';
import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Cloudinary } from './cloudinary.service';
import CloudinaryConfiguration from './cloudinary-configuration.class';
import { CloudinaryImage } from './cloudinary-image.component';
import { CloudinaryTransformationDirective } from './cloudinary-transformation.directive';
import {LazyLoadDirective } from './cloudinary-lazy-load.directive';
import { CloudinaryPlaceHolder } from'./cloudinary-placeholder.component';

//_s=KE7pBq0'
//    let analyticsOptions = {techVersion: '6.1.10', sdkSemver: '1.2.2', feature: '0', sdkCode: 'K'};

describe('Tests for sdk versionID on image tag', () => {
  describe('Config with analytics not set', () => {
    let localCloudinary: Cloudinary = new Cloudinary(require('cloudinary-core'),
      { cloud_name: '@@fake_angular_sdk@@' } as CloudinaryConfiguration);

    beforeEach(() => {
      spyOn(localCloudinary, 'toCloudinaryAttributes').and.callThrough();
      spyOn(localCloudinary, 'url').and.callThrough();
      spyOn(localCloudinary, 'responsive').and.callThrough();
    });
    @Component({
      template: `<cl-image responsive public-id="sample"></cl-image>`
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

    it('creates an img without encoding', () => {
      const img = des.children[0].nativeElement as HTMLImageElement;
      expect(img.attributes.getNamedItem('src').value).toEqual('http://res.cloudinary.com/@@fake_angular_sdk@@/image/upload/sample');
    });
  });

  describe('Config with analytics set to true', () => {
    let localCloudinary: Cloudinary = new Cloudinary(require('cloudinary-core'),
      { cloud_name: '@@fake_angular_sdk@@', analytics: true} as CloudinaryConfiguration);

    beforeEach(() => {
      spyOn(localCloudinary, 'toCloudinaryAttributes').and.callThrough();
      spyOn(localCloudinary, 'url').and.callThrough();
    });
    @Component({
      template: `<cl-image public-id="sample"></cl-image>`
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

    it('creates an img with feature defaulting to 0', () => {
      const img = des.children[0].nativeElement as HTMLImageElement;
      expect(img.attributes.getNamedItem('src').value).toEqual('http://res.cloudinary.com/@@fake_angular_sdk@@/image/upload/sample?_s=KE7pBq0');
    });
  });
});

