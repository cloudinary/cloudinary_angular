describe("cloudinary", function () {
  var $compile,
      $rootScope,
      $provider;

  // Load the myApp module, which contains the directive
  //beforeEach(function(){
  //  module('testApp', ['cloudinary']).config(['cloudinaryProvider', function (cloudinaryProvider) {
  //      cloudinaryProvider.cloudName("demo");
  //    }]);
  //  //module('cloudinary', 'test');
  //}
  //);
  describe("provider", function () {
    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function (_$compile_, _$rootScope_) {
      // The injector unwraps the underscores (_) from around the parameter names when matching
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    }));

    it('Replaces the element with the appropriate content', function () {
      console.log("start");
      angular.module('test', ['cloudinary']).config(['cloudinaryProvider', function (cloudinaryProvider) {
            cloudinaryProvider.cloudName("demo");
          }]);
      // Compile a piece of HTML containing the directive
      var element = $compile("<cl-image public_id='foobar'/>")($rootScope);
      // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
      $rootScope.$digest();
      // Check that the compiled element contains the templated content
      expect(element.html()).toContain("");
    });
  });
});