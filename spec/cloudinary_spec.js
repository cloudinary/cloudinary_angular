const CLOUD_NAME = "demo";

describe("cloudinary", function () {

  var $compile,
      $rootScope,
      $provider;
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
        element = $compile("<div><cl-image public_id='{{testPublicId}}'/></div>")($rootScope);
      });
      it('adds a width attribute to the tag if it has a value', function () {
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
});