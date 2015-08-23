'use strict';

var photoAlbumServices = angular.module('photoAlbumServices', ['ngResource']);

photoAlbumServices.factory('album', ['$rootScope', '$resource',
  function($rootScope, $resource){
    // instead of maintaining the list of images, we rely on the 'myphotoalbum' tag
    // and simply retrieve a list of all images with that tag.
    var url = $.cloudinary.url('myphotoalbum', {format: 'json', type: 'list'});
    //cache bust
    url = url + "?" + Math.ceil(new Date().getTime()/1000);
    return $resource(url, {}, {
      photos: {method:'GET', isArray:false}
    });
  }]);