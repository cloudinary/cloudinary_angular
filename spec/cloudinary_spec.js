const CLOUD_NAME = "sdk-test";

describe("cloudinary", function () {

  var $compile,
      $rootScope,
      $window;
  beforeEach(function () {
    module('cloudinary');
    angular.module('cloudinary').config(['cloudinaryProvider', function (cloudinaryProvider) {
      cloudinaryProvider.set("cloud_name", CLOUD_NAME);
    }]);
    //angular.module('testApp');

  });
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $window = window;
    $rootScope.testPublicId = "sample";
  }));
  describe("clImage", function () {
    it('Adds an inner <img> tag', function () {
      // Compile a piece of HTML containing the directive
      var element = $compile("<div><cl-image /></div>")($rootScope);
      // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
      $rootScope.$digest();

      // Check that the compiled element contains the templated content
      expect(element.html()).toMatch("<img.*>");
    });
    describe("public-id", function () {
      it('populates the src attribute with the cloudinary URL for the public ID', function () {
        // Compile a piece of HTML containing the directive
        var element = $compile("<div><cl-image public_id='foobar'/></div>")($rootScope);
        // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
        $rootScope.$digest();

        // Check that the compiled element contains the templated content
        expect(element.html()).toMatch("src=\"https?://res\.cloudinary\.com/" + CLOUD_NAME + "/image/upload/foobar\"");
      });
      it('modify the src attribute when the public ID attribute changes', function () {
        // Compile a piece of HTML containing the directive
        $rootScope.testPublicId = 'foobar';
        var element = $compile("<div><cl-image public_id='{{testPublicId}}'/></div>")($rootScope);
        // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
        $rootScope.$digest();
        // Check that the compiled element contains the templated content
        expect(element.html()).toMatch("src=\"https?://res\.cloudinary\.com/" + CLOUD_NAME + "/image/upload/foobar\"");
        $rootScope.testPublicId = 'barfoo';
        $rootScope.$digest();
        expect(element.html()).toMatch("src=\"https?://res\.cloudinary\.com/" + CLOUD_NAME + "/image/upload/barfoo\"");
      });
    });
    describe("html-width", function(){
      var element;
      beforeEach(function(){
        $rootScope.testPublicId = "sample";
        element = $compile("<div><cl-image public_id='{{testPublicId}}'/></div>")($rootScope);
        $rootScope.$digest();
      });
      it('adds a width attribute to the tag if it has a value', function () {
        var element = $compile("<div><cl-image public_id='foobar'/></div>")($rootScope);
        // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
        $rootScope.$digest();

        // Check that the compiled element contains the templated content
        expect(element.html()).toMatch("src=\"https?://res\.cloudinary\.com/" + CLOUD_NAME + "/image/upload/foobar\"");
      });
      it('modify the src attribute when the public ID attribute changes', function () {
        $rootScope.testPublicId = 'foobar';
        $rootScope.$digest();
        expect(element.html()).toMatch("src=\"https?://res\.cloudinary\.com/" + CLOUD_NAME + "/image/upload/foobar\"");
        $rootScope.testPublicId = 'barfoo';
        $rootScope.$digest();
        expect(element.html()).toMatch("src=\"https?://res\.cloudinary\.com/" + CLOUD_NAME + "/image/upload/barfoo\"");

      });
    });
    describe ('gravity', function(){
      it('should support predefined modes', function () {
        var modes = [
            ['west', 'g_west'],
            ['auto', 'g_auto'],
            ['auto:good', 'g_auto:good'],
            ['auto:ocr_text', 'g_auto:ocr_text'],
            ['ocr_text', 'g_ocr_text'],
            ['ocr_text:adv_ocr', 'g_ocr_text:adv_ocr']
        ];
        modes.forEach(function (mode) {
          var element = $compile("<div><cl-image public_id='foobar' gravity='" + mode[0] + "'/></div>")($rootScope);
          $rootScope.$digest();
          expect(element.html()).toMatch(
              "src=\"https?://res\.cloudinary\.com/" + CLOUD_NAME + "/image/upload/" + mode[1] + "/foobar\"");
        });
      })
    });
    describe ('conditional transformation', function(){
      it ('should add if (condition) to the result URL', function() {
        // Compile a piece of HTML containing the directive
        var element = $compile("<div><cl-image public_id='foobar' if='w_gt_200' width='100' crop='scale'/></div>")($rootScope);
        $rootScope.$digest();

        // Check that the compiled element contains the templated content
        expect(element.html()).toMatch("src=\"https?://res\.cloudinary\.com/" + CLOUD_NAME + "/image/upload/if_w_gt_200,c_scale,w_100/foobar\"");
      });

      it ('should add if (condition) to the result URL', function() {
        // Compile a piece of HTML containing the directive
        var element = $compile("<div><cl-image public_id='foobar'><cl-transformation if='w_gt_200' width='100' crop='scale'/></cl-image></div>")($rootScope);
        $rootScope.$digest();

        // Check that the compiled element contains the templated content
        expect(element.html()).toMatch("src=\"https?://res\.cloudinary\.com/" + CLOUD_NAME + "/image/upload/if_w_gt_200,c_scale,w_100/foobar\"");
      });

      it ('should add if (condition) to the result URL', function() {
        // Compile a piece of HTML containing the directive
        var element = $compile("<div>" +
          "<cl-image public_id='foobar'>" +
          "<cl-transformation if='w_gt_200'/>"+
          "<cl-transformation width='100' crop='scale'/>" +
          "<cl-transformation height='100' crop='fill'/>"+
          "<cl-transformation if='end'/>" +
          "</cl-image></div>")($rootScope);
        $rootScope.$digest();

        // Check that the compiled element contains the templated content
        expect(element.html()).toMatch("src=\"https?://res\.cloudinary\.com/" + CLOUD_NAME + "/image/upload/if_w_gt_200/c_scale,w_100/c_fill,h_100/if_end/foobar\"");
      });

      it ('should add if (condition) to the result URL', function() {
        // Compile a piece of HTML containing the directive
        var element = $compile("<div>" +
          "<cl-image public_id='foobar'>" +
          "<cl-transformation if='w_gt_200'/>"+
          "<cl-transformation width='100' crop='scale'/>" +
          "<cl-transformation height='100' crop='fill'/>"+
          "<cl-transformation if='else'/>" +
          "<cl-transformation width='200' crop='fill'/>" +
          "<cl-transformation height='200' crop='fit'/>"+
          "<cl-transformation if='end'/>" +
          "</cl-image></div>")($rootScope);
        $rootScope.$digest();

        // Check that the compiled element contains the templated content
        expect(element.html()).toMatch("src=\"https?://res\.cloudinary\.com/" + CLOUD_NAME + "/image/upload/if_w_gt_200/c_scale,w_100/c_fill,h_100/if_else/c_fill,w_200/c_fit,h_200/if_end/foobar\"");
      });
    });

    describe("responsive", function () {
      var testWindow, tabImage2, image1;
      beforeAll(function (done) {
        testWindow = window.open("/base/spec/responsive-core-test.html", "Cloudinary test #{(new Date()).toLocaleString()}", "width=200, height=500");

        testWindow.addEventListener('load', function () {
          image1 = testWindow.document.getElementById("image1");
          tabImage2 = testWindow.document.getElementById("tabImage2");
          expect(tabImage2).toBeDefined();
          done();
        });

      });
      afterAll(function () {
        testWindow && testWindow.close();
      });
      it('should enable responsive functionality', function () {
        expect(tabImage2.getAttribute("src")).toMatch("https?://res\.cloudinary\.com/" + CLOUD_NAME + "/image/upload/c_scale,w_200/sample.jpg");
      });
      it("should react to a change in the parent's width", function (done) {

        var listener = function () {
          expect(tabImage2.outerHTML).toMatch("src=\"https?://res\.cloudinary\.com/" + CLOUD_NAME + "/image/upload/c_scale,w_400/sample.jpg\"");
          done();
        };
        // testWindow.addEventListener('resize', listener);
        setTimeout(listener, 2000);
        testWindow.resizeTo(350, 800);
      });
      it('should apply responsive if "width" is not defined', function () {
        element = $compile("<div><cl-image public_id='{{testPublicId}}' responsive/></div>")($rootScope);
        $rootScope.$digest();
        expect(cloudinary.Util.getData(element[0], "width")).toBeDefined();
        expect(cloudinary.Util.hasClass(element[0], "cld-responsive")).toBeDefined();

      })
    })
  });
  describe('child transformation with ng-if', function () {
    it('should include transformation with ng-if="true"', function () {
      var template = '<div><cl-image public_id="foobar">' +
          '<cl-transformation ng-if="true" gravity="north" effect="sepia" radius="20" />' +
          '</cl-image></div>';
      var element = $compile(template)($rootScope);
      $rootScope.$digest();
      expect(element.html()).toMatch("src=\"https?://res\.cloudinary\.com/" + CLOUD_NAME + "/image/upload/e_sepia,g_north,r_20/foobar\"");
    });
    it('should exclude transformation with ng-if="false"', function () {
      var template = '<div><cl-image public_id="foobar">' +
          '<cl-transformation ng-if="false" gravity="north" effect="sepia" radius="20" />' +
          '</cl-image></div>';
      var element = $compile(template)($rootScope);
      $rootScope.$digest();
      expect(element.html()).toMatch("src=\"https?://res\.cloudinary\.com/" + CLOUD_NAME + "/image/upload/foobar\"");
    });
    it('should update transformation on ng-if condition changed', function () {
      var template = '<div><cl-image public_id="foobar">' +
          '<cl-transformation ng-if="ngIfVisible" gravity="north" effect="sepia" radius="20" />' +
          '</cl-image></div>';
      var element = $compile(template)($rootScope);

      $rootScope.ngIfVisible = true;
      $rootScope.$digest();
      expect(element.html()).toMatch("src=\"https?://res\.cloudinary\.com/" + CLOUD_NAME + "/image/upload/e_sepia,g_north,r_20/foobar\"");

      $rootScope.ngIfVisible = false;
      $rootScope.$digest();
      expect(element.html()).toMatch("src=\"https?://res\.cloudinary\.com/" + CLOUD_NAME + "/image/upload/foobar\"");
    });
  });
  describe('clVideo', function () {
      it('throws an exception with missing publicId', function () {
          expect(function() {
              $compile('<div><cl-video /></div>')($rootScope);
              $rootScope.$digest();
          }).toThrow(new Error(
              'You must set the public id of the video to load, e.g. <cl-video public-id={{video.public_id}}...></cl-video>'
          ));
      });
      it('does not throw an error if transformation is not in video or image tag', function () {
          $compile('<cl-transformation effect="art:hokusai"></cl-transformation>')($rootScope);
          $rootScope.$digest();
      });
      describe('videos with nested transformations', function () {
          it('creates a <video> element which encodes the directive attributes to the URL', function() {
              var element = $compile('<cl-video id="video1" public-id="sample_video">\n' +
                  '<cl-transformation width="300" crop="scale" overlay="text:roboto_35_bold:SDK"></cl-transformation>\n' +
                  '<cl-transformation effect="art:hokusai"></cl-transformation>\n' +
                  '<cl-transformation fetch_format="auto"></cl-transformation>\n' +
                  '</cl-video>')($rootScope);
              $rootScope.$digest();

              const video = element[0];
              // Created <video> element should have 3 child <source> elements for mp4, webm, ogg
              expect(video.childElementCount).toBe(3);

              for (var i = 0; i < 3; i++) {
                  expect(video.children[i].attributes.getNamedItem('src')).toBeDefined();
                  expect(video.children[i].attributes.getNamedItem('src').value).toEqual(
                      jasmine.stringMatching
                      (/c_scale,l_text:roboto_35_bold:SDK,w_300\/e_art:hokusai\/f_auto\/sample_video/));
                  expect(video.children[i].attributes.getNamedItem('src').value).toEqual(
                      jasmine.stringMatching(/video\/upload/));
              }
          });
      });
      it('creates a video element with a bound public-id', function () {
          $rootScope.testPublicId = 'test-public-id';
          var element = $compile(
              '<cl-video cloud-name="my_other_cloud" public-id="{{testPublicId}}" secure="true" class="my-videos">\n' +
              '  <cl-transformation overlay="text:arial_60:watchme" gravity="north" y="20"></cl-transformation>\n' +
              '</cl-video>')($rootScope);
          $rootScope.$digest();
          testMarkup('test-public-id');
          $rootScope.testPublicId = 'another-id';
          $rootScope.$digest();
          testMarkup('another-id');

          function testMarkup(id) {
              for (var i = 0; i < 3; i++) {
                  expect(element[0].children[i].attributes.getNamedItem('src')).toBeDefined();
                  expect(element[0].children[i].attributes.getNamedItem('src').value).toEqual(jasmine.stringMatching(
                      new RegExp('https:\/\/res.cloudinary.com\/my_other_cloud\/video\/upload\/g_north,l_text:arial_60:watchme,y_20\/'+id))
                  );
              }
          }
      })
  });
  describe("clSrc", function () {
    it('populates the src attribute with the cloudinary URL for the public ID', function () {
      var element = $compile("<div><img cl-src='foobar'/></div>")($rootScope);
      // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
      $rootScope.$digest();

      // Check that the compiled element contains the templated content
      expect(element.html()).toMatch("src=\"https?://res\.cloudinary\.com/" + CLOUD_NAME + "/image/upload/foobar\"");
    });
    it('modify the src attribute when the public ID attribute changes', function () {
      $rootScope.testPublicId = "foobar";
      var element = $compile("<div><img cl-src='{{testPublicId}}'/></div>")($rootScope);
      // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
      $rootScope.$digest();

      // Check that the compiled element contains the templated content
      expect(element.html()).toMatch("src=\"https?://res\.cloudinary\.com/" + CLOUD_NAME + "/image/upload/foobar\"");
      $rootScope.testPublicId = 'barfoo';
      $rootScope.$digest();
      expect(element.html()).toMatch("src=\"https?://res\.cloudinary\.com/" + CLOUD_NAME + "/image/upload/barfoo\"");

    });
  });
  describe('responsive images with global configured client hints', function () {
    beforeAll(function () {
      angular.module('cloudinary').config(['cloudinaryProvider', function (cloudinaryProvider) {
        cloudinaryProvider.set("client_hints", true);
      }]);
    });

    it('should not implement responsive behaviour if client hints set in config', function () {
      // Compile a piece of HTML containing the directive
      var element = $compile("<div><cl-image public_id='sample.jpg' responsive>" +
          "<cl-transformation crop='scale' width='auto' dpr='auto'/>" +
          "<cl-image/></div>")($rootScope);
      $rootScope.$digest();
      const img = element[0].children[0];
      expect(img.hasAttribute('class')).toBe(false);
      expect(img.hasAttribute('data-src')).toBe(false);
      expect(element.html()).toMatch("src=\"https?://res\.cloudinary\.com/" + CLOUD_NAME + "/image/upload/c_scale,dpr_auto,w_auto/sample.jpg\"");
    });

    it('should allow to override global client_hints option with tag attribute', function () {
      // Compile a piece of HTML containing the directive
      var element = $compile("<div><cl-image public_id='sample.jpg' client_hints='false' responsive>" +
          "<cl-transformation crop='scale' width='auto' dpr='auto'/>" +
          "<cl-image/></div>")($rootScope);
      $rootScope.$digest();
      const img = element[0].children[0];
      expect(img.hasAttribute('class')).toBe(true);
      expect(img.hasAttribute('data-src')).toBe(true);
      expect(element.html()).toMatch("src=\"https?://res\.cloudinary\.com/" + CLOUD_NAME + "/image/upload/c_scale,dpr_auto,w_auto/sample.jpg\"");
    });
  });

  describe("responsive images with locally configured client hints", function () {
    it('should not implement responsive behaviour if client hints attribute is true', function () {
      // Compile a piece of HTML containing the directive
      var element = $compile("<div><cl-image public_id='sample.jpg' client_hints='true' responsive>" +
          "<cl-transformation crop='scale' width='auto' dpr='auto'/>" +
          "<cl-image/></div>")($rootScope);
      $rootScope.$digest();
      const img = element[0].children[0];
      expect(img.hasAttribute('class')).toBe(false);
      expect(img.hasAttribute('data-src')).toBe(false);
      expect(element.html()).toMatch("src=\"https?://res\.cloudinary\.com/" + CLOUD_NAME + "/image/upload/c_scale,dpr_auto,w_auto/sample.jpg\"");
    });
  });
});
