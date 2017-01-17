import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Cloudinary } from './cloudinary.service';
import CloudinaryConfiguration from './cloudinary-configuration.class';
import { CloudinaryVideo } from './cloudinary-video.component';
import { CloudinaryTransformationDirective } from './cloudinary-transformation.directive';

describe('CloudinaryVideo', () => {

  let localCloudinary: Cloudinary = new Cloudinary(require('cloudinary-core'),
    { cloud_name: '@@fake_angular2_sdk@@' } as CloudinaryConfiguration);

  beforeEach(() => {
    spyOn(localCloudinary, 'toCloudinaryAttributes').and.callThrough();
    spyOn(localCloudinary, 'videoTag').and.callThrough();
  });

  describe('testing phantomjs', () => {

    it('it uses createElement to create <source> and append to <video>', () => {
      function addSourceToVideo(element, src, type) {
        const source = document.createElement('source');

        source.src = src;
        source.type = type;

        element.appendChild(source);
      }

      const video = document.createElement('video');

      document.body.appendChild(video);

      addSourceToVideo(video, 'http://upload.wikimedia.org/wikipedia/commons/7/79/Big_Buck_Bunny_small.ogv', 'video/ogg');

      expect(video.childElementCount).toBe(1);
      expect((video.children[0] as HTMLSourceElement).src).toEqual('http://upload.wikimedia.org/wikipedia/commons/7/79/Big_Buck_Bunny_small.ogv');
    });

    it('it creates <source> elements using innerHTML', () => {
      const video = document.createElement('video');

      document.body.appendChild(video);
      const source = `<source src="http://res.cloudinary.com/@@fake_angular2_sdk@@/video/upload/c_scale,l_text:roboto_35_bold:SDK,w_300/e_art:hokusai/f_auto/sample_video.mp4" type="video/mp4">
                            <source src="http://res.cloudinary.com/@@fake_angular2_sdk@@/video/upload/c_scale,l_text:roboto_35_bold:SDK,w_300/e_art:hokusai/f_auto/sample_video.mp4" type="video/mp4">`;

      video.innerHTML = source;
      expect(video.childElementCount).toBe(2);
      expect(video.children[0].attributes.getNamedItem('src')).toBeDefined();
      expect(video.children[0].attributes.getNamedItem('src').value)
        .toEqual('http://res.cloudinary.com/@@fake_angular2_sdk@@/video/upload/c_scale,l_text:roboto_35_bold:SDK,w_300/e_art:hokusai/f_auto/sample_video.mp4');
    });
  });

  describe('missing public-id', () => {
    @Component({
      template: '<cl-video id="video1"></cl-video>'
    })
    class TestComponent {
    }

    it('throws if the directive is missing a public-id attribute', () => {
      const fixture = TestBed.configureTestingModule({
        declarations: [CloudinaryTransformationDirective, CloudinaryVideo, TestComponent],
        providers: [{ provide: Cloudinary, useValue: localCloudinary }]
      }).createComponent(TestComponent);
      expect(() => {
        fixture.detectChanges();
      }).toThrowError(/You must set the public id of the video to load/i);
    });
  });

  describe('videos with nested transformations', () => {
    @Component({
      template: `<cl-video id="video1" public-id="sample_video">
            <cl-transformation width="300" crop="scale" overlay="text:roboto_35_bold:SDK"></cl-transformation>
            <cl-transformation effect="art:hokusai"></cl-transformation>
            <cl-transformation fetch_format="auto"></cl-transformation>
            </cl-video>`
    })
    class TestComponent {
    }

    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement;  // the elements w/ the directive

    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [CloudinaryTransformationDirective, CloudinaryVideo, TestComponent],
        providers: [{ provide: Cloudinary, useValue: localCloudinary }]
      }).createComponent(TestComponent);

      fixture.detectChanges(); // initial binding

      // all elements with an attached CloudinaryVideo
      des = fixture.debugElement.query(By.directive(CloudinaryVideo));
    });

    it('creates a <video> element which encodes the directive attributes to the URL', () => {
      const video = des.children[0].nativeElement as HTMLVideoElement;
      // Created <video> element should have 3 child <source> elements for mp4, webm, ogg
      expect(video.childElementCount).toBe(3);

      for (let i = 0; i < 3; i++) {
        expect(video.children[i].attributes.getNamedItem('src')).toBeDefined();
        expect(video.children[i].attributes.getNamedItem('src').value).toEqual(
          jasmine.stringMatching
            (/c_scale,l_text:roboto_35_bold:SDK,w_300\/e_art:hokusai\/f_auto\/sample_video/));
        expect(video.children[i].attributes.getNamedItem('src').value).toEqual(
          jasmine.stringMatching(/video\/upload/));
      }

      // verify interaction with underlying cloudinary-core lib
      expect(localCloudinary.videoTag).toHaveBeenCalledTimes(1);
    });
  });

  describe('Video with poster using kebab-case', () => {
    @Component({
      template: `
            <cl-video cloud-name="my_other_cloud" public-id="watchme" secure="true" class="my-videos"
            poster='{"cloud-name": "cloudinary", "gravity": "north", "start-offset": "28",
            "transformation": [{"effect": "sepia", "fetch-format": "auto"}]}'>
            </cl-video>
            `
    })
    class TestComponent {
    }

    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement;  // the elements w/ the directive

    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [CloudinaryTransformationDirective, CloudinaryVideo, TestComponent],
        providers: [{ provide: Cloudinary, useValue: localCloudinary }]
      }).createComponent(TestComponent);

      fixture.detectChanges(); // initial binding

      // Our element under test, which is attached to CloudinaryVideo
      des = fixture.debugElement.query(By.directive(CloudinaryVideo));
    });

    it('creates a <video> element which encodes the directive attributes to the URL', () => {
      const video = des.children[0].nativeElement as HTMLVideoElement;
      // Created <video> element should have 3 child <source> elements for mp4, webm, ogg
      expect(video.attributes.getNamedItem('poster').value).toEqual(
        jasmine.stringMatching(/cloudinary\/video\/upload\/e_sepia,f_auto\/g_north,so_28\/watchme.jpg/));
    });
  });

  describe('Video with poster using snake_case', () => {
    @Component({
      template: `
            <cl-video cloud_name="my_other_cloud" public-id="watchme" secure="true" class="my-videos"
            poster='{ "cloud_name": "cloudinary", "gravity": "north", "start_offset": "28",
            "transformation": [{"effect": "sepia", "fetch_format": "auto"}]}'>
            </cl-video>
            `
    })
    class TestComponent {
    }

    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement;  // the elements w/ the directive

    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [CloudinaryTransformationDirective, CloudinaryVideo, TestComponent],
        providers: [{ provide: Cloudinary, useValue: localCloudinary }]
      }).createComponent(TestComponent);

      fixture.detectChanges(); // initial binding

      // Our element under test, which is attached to CloudinaryVideo
      des = fixture.debugElement.query(By.directive(CloudinaryVideo));
    });

    it('creates a <video> element which encodes the directive attributes to the URL', () => {
      const video = des.children[0].nativeElement as HTMLVideoElement;
      // Created <video> element should have 3 child <source> elements for mp4, webm, ogg
      expect(video.attributes.getNamedItem('poster').value).toEqual(
        jasmine.stringMatching(/cloudinary\/video\/upload\/e_sepia,f_auto\/g_north,so_28\/watchme.jpg/));
    });
  });

  describe('Sample code presented in README', () => {
    @Component({
      template: `
            <cl-video cloud-name="my_other_cloud" public-id="watchme" secure="true" class="my-videos">
                <cl-transformation overlay="text:arial_60:watchme" gravity="north" y="20"></cl-transformation>
            </cl-video>
            `
    })
    class TestComponent {
    }

    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement;  // the elements w/ the directive

    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [CloudinaryTransformationDirective, CloudinaryVideo, TestComponent],
        providers: [{ provide: Cloudinary, useValue: localCloudinary }]
      }).createComponent(TestComponent);

      fixture.detectChanges(); // initial binding

      // Our element under test, which is attached to CloudinaryVideo
      des = fixture.debugElement.query(By.directive(CloudinaryVideo));
    });

    it('creates a <video> element which encodes the directive attributes to the URL', () => {
      const video = des.children[0].nativeElement as HTMLVideoElement;
      // Created <video> element should have 3 child <source> elements for mp4, webm, ogg
      expect(video.childElementCount).toBe(3);

      for (let i = 0; i < 3; i++) {
        expect(video.children[i].attributes.getNamedItem('src')).toBeDefined();
        expect(video.children[i].attributes.getNamedItem('src').value).toEqual(
          jasmine.stringMatching
            (/https:\/\/res.cloudinary.com\/my_other_cloud\/video\/upload\/g_north,l_text:arial_60:watchme,y_20\/watchme/));
      }
    });
  });
});

