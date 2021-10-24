import { Component, DebugElement } from '@angular/core';
import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Cloudinary } from './cloudinary.service';
import CloudinaryConfiguration from './cloudinary-configuration.class';
import { CloudinaryVideo } from './cloudinary-video.component';
import { CloudinaryTransformationDirective } from './cloudinary-transformation.directive';

describe('CloudinaryVideo', () => {

  const VIDEO_UPLOAD_PATH = 'http://res.cloudinary.com/demo/video/upload/';

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
      template: `
        <cl-video id="video1" public-id="sample_video">
          <cl-transformation width="300" crop="scale" keyframe_interval="10" overlay="text:roboto_35_bold:SDK"></cl-transformation>
          <cl-transformation effect="art:hokusai"></cl-transformation>
          <cl-transformation fetch_format="auto"></cl-transformation>
        </cl-video>
        <cl-video id="video2" public-id="sample_video">
          <cl-transformation width="300" crop="scale" keyframe-interval="0.05" overlay="text:roboto_35_bold:SDK"></cl-transformation>
          <cl-transformation effect="art:hokusai"></cl-transformation>
          <cl-transformation fetch_format="auto"></cl-transformation>
        </cl-video>
        <cl-video id="video3" public-id="sample_video">
          <cl-transformation keyframe_interval="3.45"></cl-transformation>
        </cl-video>
        <cl-video id="video4" public-id="sample_video">
          <cl-transformation keyframe_interval="300"></cl-transformation>
        </cl-video>
        <cl-video id="video5" public-id="sample_video">
          <cl-transformation fps="24-29.97"></cl-transformation>
        </cl-video>
        <cl-video id="video6" public-id="sample_video">
          <cl-transformation fps="24"></cl-transformation>
        </cl-video>
        <cl-video id="video7" public-id="sample_video">
          <cl-transformation fps="24.973"></cl-transformation>
        </cl-video>
        <cl-video id="video8" public-id="sample_video">
          <cl-transformation fps="24"></cl-transformation>
        </cl-video>
        <cl-video id="video9" public-id="sample_video">
          <cl-transformation fps="-24"></cl-transformation>
        </cl-video>
        <cl-video id="video10" public-id="sample_video">
          <cl-transformation fps="$v"></cl-transformation>
        </cl-video>
        <cl-video id="video11" public-id="sample_video">
          <cl-transformation fps="24-$v"></cl-transformation>
        </cl-video>
      `
    })
    class TestComponent {
    }

    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement[];  // the elements w/ the directive

    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [CloudinaryTransformationDirective, CloudinaryVideo, TestComponent],
        providers: [{ provide: Cloudinary, useValue: localCloudinary }]
      }).createComponent(TestComponent);

      fixture.detectChanges(); // initial binding

      // all elements with an attached CloudinaryVideo
      des = fixture.debugElement.queryAll(By.directive(CloudinaryVideo));
    });

    it('creates a <video> element which encodes the directive attributes to the URL', () => {
      des.forEach((element, index) => {
        const matchers = [
          /c_scale,ki_10,l_text:roboto_35_bold:SDK,w_300\/e_art:hokusai\/f_auto\/sample_video/,
          /c_scale,ki_0\.05,l_text:roboto_35_bold:SDK,w_300\/e_art:hokusai\/f_auto\/sample_video/,
          /ki_3\.45\/sample_video/,
          /ki_300\/sample_video/,
          /fps_24-29.97\/sample_video/,
          /fps_24\/sample_video/,
          /fps_24.973\/sample_video/,
          /fps_24\/sample_video/,
          /fps_-24\/sample_video/,
          /fps_\$v\/sample_video/,
          /fps_24-\$v\/sample_video/,
        ];
        const video = element.children[0].nativeElement as HTMLVideoElement;
        // Created <video> element should have 3 child <source> elements for mp4, webm, ogg
        expect(video.childElementCount).toBe(3);

        for (let i = 0; i < 3; i++) {
          expect(video.children[i].attributes.getNamedItem('src')).toBeDefined();
          expect(video.children[i].attributes.getNamedItem('src').value).toEqual(
            jasmine.stringMatching(matchers[index]));
          expect(video.children[i].attributes.getNamedItem('src').value).toEqual(
            jasmine.stringMatching(/video\/upload/));
        }
      });

      // verify interaction with underlying cloudinary-core lib
      expect(localCloudinary.videoTag).toHaveBeenCalledTimes(11);
    });
  });

  describe('video with custom sources', () => {
    @Component({
      template: `
        <cl-video cloud-name="demo" public-id="dog" sources='[{"type": "mp4", "codecs":"hev1", "transformations": {"video-codec":"h265"}},
             {"type": "webm", "codecs":"vp9", "transformations": {"video-codec":"vp9"}},
             {"type": "mp4", "transformations": {"video-codec":"auto"}},
             {"type": "webm", "transformations": {"video-codec":"auto"}}]'>
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

      // Our element under test, which is attached to CloudinaryVideo
      des = fixture.debugElement.query(By.directive(CloudinaryVideo));
    });

    it('should generate video tag using custom sources', () => {
      const video = des.children[0].nativeElement as HTMLVideoElement;
      // Created <video> element should have 4 child <source> elements
      expect(video.childElementCount).toBe(4);
      expect(video.children[0].attributes.getNamedItem('type').value).toEqual('video/mp4; codecs=hev1');
      expect(video.children[0].attributes.getNamedItem('src').value).toEqual(`${VIDEO_UPLOAD_PATH}vc_h265/dog.mp4`);
      expect(video.children[1].attributes.getNamedItem('type').value).toEqual('video/webm; codecs=vp9');
      expect(video.children[1].attributes.getNamedItem('src').value).toEqual(`${VIDEO_UPLOAD_PATH}vc_vp9/dog.webm`);
      expect(video.children[2].attributes.getNamedItem('type').value).toEqual('video/mp4');
      expect(video.children[2].attributes.getNamedItem('src').value).toEqual(`${VIDEO_UPLOAD_PATH}vc_auto/dog.mp4`);
      expect(video.children[3].attributes.getNamedItem('type').value).toEqual('video/webm');
      expect(video.children[3].attributes.getNamedItem('src').value).toEqual(`${VIDEO_UPLOAD_PATH}vc_auto/dog.webm`);
    });
  });

  describe('video with codecs array', () => {
    @Component({
      template: `
        <cl-video cloud-name="demo" public-id="dog" sources='[{"type": "mp4", "codecs": ["vp8", "vorbis"], "transformations": {"video-codec":"auto"}},
             {"type": "webm", "codecs": ["avc1.4D401E", "mp4a.40.2"], "transformations": {"video-codec":"auto"}}]'>
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

      // Our element under test, which is attached to CloudinaryVideo
      des = fixture.debugElement.query(By.directive(CloudinaryVideo));
    });

    it('should generate video tag with codecs array', () => {
      const video = des.children[0].nativeElement as HTMLVideoElement;
      // Created <video> element should have 2 child <source> elements
      expect(video.childElementCount).toBe(2);
      expect(video.children[0].attributes.getNamedItem('type').value).toEqual('video/mp4; codecs=vp8, vorbis');
      expect(video.children[0].attributes.getNamedItem('src').value).toEqual(`${VIDEO_UPLOAD_PATH}vc_auto/dog.mp4`);
      expect(video.children[1].attributes.getNamedItem('type').value).toEqual('video/webm; codecs=avc1.4D401E, mp4a.40.2');
      expect(video.children[1].attributes.getNamedItem('src').value).toEqual(`${VIDEO_UPLOAD_PATH}vc_auto/dog.webm`);
    });
  });

  describe('video with overriding sourceTypes', () => {
    @Component({
      template: `
          <cl-video cloud-name="demo" public-id="dog" sources='[{"type": "mp4"}]' source-types='["ogv", "mp4", "webm"]'>
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

      // Our element under test, which is attached to CloudinaryVideo
      des = fixture.debugElement.query(By.directive(CloudinaryVideo));
    });

    it('should generate video tag overriding sourceTypes with sources if both are given', () => {
      const video = des.children[0].nativeElement as HTMLVideoElement;
      // Created <video> element should have 1 child <source> element
      expect(video.childElementCount).toBe(1);
      expect(video.children[0].attributes.getNamedItem('type').value).toEqual('video/mp4');
      expect(video.children[0].attributes.getNamedItem('src').value).toEqual(`${VIDEO_UPLOAD_PATH}dog.mp4`);
    });
  });

  describe('handle ogg/ogv in sources', () => {
    @Component({
      template: `
          <cl-video cloud-name="demo" public-id="dog" sources='[{"type": "ogv"}]'>
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

      // Our element under test, which is attached to CloudinaryVideo
      des = fixture.debugElement.query(By.directive(CloudinaryVideo));
    });

    it('should correctly handle ogg/ogv', () => {
      const video = des.children[0].nativeElement as HTMLVideoElement;
      // Created <video> element should have 1 child <source> element
      expect(video.childElementCount).toBe(1);
      expect(video.children[0].attributes.getNamedItem('type').value).toEqual('video/ogg');
      expect(video.children[0].attributes.getNamedItem('src').value).toEqual(`${VIDEO_UPLOAD_PATH}dog.ogv`);
    });
  });

  describe('video with sources and transformations', () => {
    @Component({
      template: `
        <cl-video cloud-name="demo" public-id="dog" sources='[{"type": "mp4", "codecs":"hev1", "transformations": {"video-codec":"h265"}},
             {"type": "webm", "codecs":"vp9", "transformations": {"video-codec":"vp9"}},
             {"type": "mp4", "transformations": {"video-codec":"auto"}},
             {"type": "webm", "transformations": {"video-codec":"auto"}}]' audio-codec="aac" video-codec='{"codec":"h264"}' start-offset="3" html-width="200" html-height="100">
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

      // Our element under test, which is attached to CloudinaryVideo
      des = fixture.debugElement.query(By.directive(CloudinaryVideo));
    });

    it('should generate video tag with sources and transformations', () => {
      const video = des.children[0].nativeElement as HTMLVideoElement;
      expect(video.attributes.getNamedItem('width').value).toEqual('200');
      expect(video.attributes.getNamedItem('height').value).toEqual('100');
      expect(video.attributes.getNamedItem('poster').value).toEqual(`${VIDEO_UPLOAD_PATH}ac_aac,so_3,vc_h264/dog.jpg`);
      // Created <video> element should have 4 child <source> elements
      expect(video.childElementCount).toBe(4);
      expect(video.children[0].attributes.getNamedItem('type').value).toEqual('video/mp4; codecs=hev1');
      expect(video.children[0].attributes.getNamedItem('src').value).toEqual(`${VIDEO_UPLOAD_PATH}ac_aac,so_3,vc_h265/dog.mp4`);
      expect(video.children[1].attributes.getNamedItem('type').value).toEqual('video/webm; codecs=vp9');
      expect(video.children[1].attributes.getNamedItem('src').value).toEqual(`${VIDEO_UPLOAD_PATH}ac_aac,so_3,vc_vp9/dog.webm`)
      expect(video.children[2].attributes.getNamedItem('type').value).toEqual('video/mp4');
      expect(video.children[2].attributes.getNamedItem('src').value).toEqual(`${VIDEO_UPLOAD_PATH}ac_aac,so_3,vc_auto/dog.mp4`);
      expect(video.children[3].attributes.getNamedItem('type').value).toEqual('video/webm');
      expect(video.children[3].attributes.getNamedItem('src').value).toEqual(`${VIDEO_UPLOAD_PATH}ac_aac,so_3,vc_auto/dog.webm`);
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

  describe('Bound public-id', () => {
    @Component({
      template: `
            <cl-video cloud-name="my_other_cloud" [public-id]="publicId" secure="true" class="my-videos">
                <cl-transformation overlay="text:arial_60:watchme" gravity="north" y="20"></cl-transformation>
            </cl-video>
            `
    })
    class TestComponent {
      publicId: string = 'watchme';
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

    it('creates a video element with a bound public-id', () => {
      const video = des.children[0].nativeElement as HTMLVideoElement;
      // Created <video> element should have 3 child <source> elements for mp4, webm, ogg
      expect(video.childElementCount).toBe(3);

      const testMarkup = (id: string) => {
        for (let i = 0; i < 3; i++) {
          expect(video.children[i].attributes.getNamedItem('src')).toBeDefined();
          expect(video.children[i].attributes.getNamedItem('src').value).toEqual(
            jasmine.stringMatching
              (new RegExp(`https:\/\/res.cloudinary.com\/my_other_cloud\/video\/upload\/g_north,l_text:arial_60:watchme,y_20\/${id}`)));
        }
      };

      // Check initial binding
      testMarkup('watchme');

      // Update data-bound publicId
      fixture.componentInstance.publicId = 'updatedId';
      fixture.detectChanges();

      // Verify that the video elememnt has updated
      testMarkup('updatedId');
    });
  });

  describe('Poster with start-offset set to auto', () => {
    @Component({
      template: `
            <cl-video cloud_name="demo" public-id="dog" secure="true" class="my-videos"
            poster='{ "cloud_name": "demo", "start_offset": "auto" }'>
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
        jasmine.stringMatching(/demo\/video\/upload\/so_auto\/dog.jpg/));
    });
  });
  describe('Video with font antialiasing and hinting', () => {
    @Component({
      template: `
            <cl-video cloud-name="my_other_cloud" public-id="watchme" secure="true" class="my-videos">
                <cl-transformation overlay="text:Arial_18_bold_italic_letter_spacing_4_line_spacing_2_antialiasing_best_hinting_medium"></cl-transformation>
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
          (/https:\/\/res.cloudinary.com\/my_other_cloud\/video\/upload\/l_text:Arial_18_bold_italic_letter_spacing_4_line_spacing_2_antialiasing_best_hinting_medium\/watchme/));
      }
    });
  });
});


describe('Video event handler', () => {
  let localCloudinary: Cloudinary = new Cloudinary(require('cloudinary-core'),
    { cloud_name: '@@fake_angular2_sdk@@' } as CloudinaryConfiguration);
  let component: CloudinaryVideo;
  let fixture: ComponentFixture<CloudinaryVideo>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CloudinaryVideo],
      providers: [{ provide: Cloudinary , useValue: localCloudinary}]
    });
    fixture = TestBed.createComponent(CloudinaryVideo);
    component = fixture.componentInstance;
    component.publicId = 'demo';
  });

  it('should emit play event', fakeAsync(() => {
    spyOn(component, 'emitPlayEvent');
    const videoElement: HTMLVideoElement = fixture.nativeElement;
    const vid = videoElement.querySelector('video');

    vid.dispatchEvent(new Event('play'));
    fixture.detectChanges();

    expect(component.emitPlayEvent).toHaveBeenCalled();
  }));

  it('should emit playing event', fakeAsync(() => {
    spyOn(component, 'emitPlayingEvent');
    const videoElement: HTMLVideoElement = fixture.nativeElement;
    const vid = videoElement.querySelector('video');

    vid.dispatchEvent(new Event('playing'));
    fixture.detectChanges();

    expect(component.emitPlayingEvent).toHaveBeenCalled();
  }));

  it('should emit loadstart event', fakeAsync(() => {
    spyOn(component, 'emitLoadstartEvent');
    const videoElement: HTMLVideoElement = fixture.nativeElement;
    const vid = videoElement.querySelector('video');

    vid.dispatchEvent(new Event('loadstart'));
    fixture.detectChanges();

    expect(component.emitLoadstartEvent).toHaveBeenCalled();
  }));
});

