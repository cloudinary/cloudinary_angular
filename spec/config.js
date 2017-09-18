var app = angular.module("spec", ["cloudinary"]);
app.config(['cloudinaryProvider', function (cloudinaryProvider) {
  cloudinaryProvider
      .set("cloud_name", "sdk-test")
      .set("upload_preset", "UUUUUUUU");
}]);
app.controller("specController", ["$scope",function($scope){}]);