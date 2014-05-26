'use strict';

var photoAlbumServices = angular.module('photoAlbumServices', ['ngResource']);

photoAlbumServices.factory('album', ['$rootScope', '$resource',
  function($rootScope, $resource){
    var url = $.cloudinary.url('myphotoalbum', {format: 'json', type: 'list'});
    //cache bust
    url = url + "?" + Math.ceil(new Date().getTime()/1000);
    return $resource(url, {}, {
      photos: {method:'GET', isArray:false}
    });
  }]);