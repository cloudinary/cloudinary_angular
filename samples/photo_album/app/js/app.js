'use strict';

/* App Module */
var photoAlbumApp = angular.module('photoAlbumApp', [
  'ngRoute',
  'cloudinary',
  'photoAlbumAnimations',
  'photoAlbumControllers',
  'photoAlbumServices'
]);

photoAlbumApp.config(['$routeProvider',
  function($routeProvider) {    
    $routeProvider.
      when('/photos', {
        templateUrl: 'partials/photo-list.html',
        resolve: {
          photoList: function($q, $rootScope, album) {
            if (!$rootScope.serviceCalled) {
              return album.photos({}, function(v){
                $rootScope.serviceCalled = true;
                $rootScope.photos = v.resources;
              });
            } else {
              return $q.when(true);
            }
          }
        }
      }).
      when('/photos/new', {
        templateUrl: 'partials/photo-upload.html',
        controller: 'photoUploadCtrl'
      }).
      when('/photos/new_jquery', {
        templateUrl: 'partials/photo-upload-jquery.html',
        controller: 'photoUploadCtrlJQuery'
      }).
      otherwise({
        redirectTo: '/photos'
      });
  }]);

