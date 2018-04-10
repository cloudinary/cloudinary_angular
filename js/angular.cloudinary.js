(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'cloudinary',
            'angular'
        ], factory);
    } else {
        // Browser globals:
        factory(cloudinary, angular);
    }
})(function (cloudinary, angular) {

  var cloudinaryModule = angular.module('cloudinary', []);

  var cloudinaryAttr = function(attr){
    if (attr.match(/cl[A-Z]/)) attr = attr.substring(2);
    return attr.replace(/([a-z])([A-Z])/g,'$1_$2').toLowerCase();
  };

  /**
   * Returns an array of attributes for cloudinary.
   * @function toCloudinaryAttributes
   * @param {Object} source - an object containing attributes
   * @param {(RegExp|string)} [filter] - copy only attributes whose name matches the filter
   * @return {Object} attributes for cloudinary functions
   */
  var toCloudinaryAttributes = function( source, filter) {
    var attributes = {};
    var isNamedNodeMap;
    if (window.NamedNodeMap) {
      isNamedNodeMap = source && (source.constructor.name === "NamedNodeMap" || source instanceof NamedNodeMap);
    } else if (window.MozNamedAttrMap) {
      // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap
      // https://www.fxsitecompat.com/en-CA/docs/2013/namednodemap-has-been-renamed-to-moznamedattrmap/
      // In Firefox versions 22 - 33 the interface "NamedNodeMap" was called "MozNamedAttrMap"
      var isNamedNodeMap = source && (source.constructor.name === "MozNamedAttrMap" || source instanceof MozNamedAttrMap);
    }
    angular.forEach(source, function(value, name){
      if( isNamedNodeMap) {
        name = value.name;
        value = value.value;
      }
      if (!filter || filter.exec(name)) {
        attributes[cloudinaryAttr(name)] = value;
      }
    });
    return attributes;
  };

  ['Src', 'Srcset', 'Href'].forEach(function(attrName) {
    var normalized = 'cl' + attrName;
    attrName = attrName.toLowerCase();
    cloudinaryModule.directive(normalized, ['$sniffer', 'cloudinary', function($sniffer, cloudinary) {
      return {
        priority: 99, // it needs to run after the attributes are interpolated
        link: function(scope, element, attr) {
          var propName = attrName,
              name = attrName;

          if (attrName === 'href' &&
              toString.call(element.prop('href')) === '[object SVGAnimatedString]') {
            name = 'xlinkHref';
            attr.$attr[name] = 'xlink:href';
            propName = null;
          }

          attr.$observe(normalized, function(value) {
            if (!value)
               return;

            value = cloudinary.url(value, toCloudinaryAttributes(element[0].attributes));
            attr.$set(name, value);

            // on IE, if "ng:src" directive declaration is used and "src" attribute doesn't exist
            // then calling element.setAttribute('src', 'foo') doesn't do anything, so we need
            // to set the property as well to achieve the desired effect.
            // we use attr[attrName] value since $set can sanitize the url.
            if ($sniffer.msie && propName) element.prop(propName, attr[name]);
          });
        }
      };
    }]);
  });

  cloudinaryModule.directive('clTransformation', [function() {
    return {
      restrict : 'E',
      transclude : false,
      require: {clImage: '?^clImage', clVideo: '?^clVideo'},
      link : function (scope, element, attrs, ctrl) {
        var tagController = ctrl.clImage || ctrl.clVideo;
        if (tagController) {
            var transformation = toCloudinaryAttributes(attrs, /^[^$]/);
            tagController.addTransformation(transformation);
            scope.$on('$destroy', function (event) {
                tagController.removeTransformation(transformation);
            })
        } else {
          console.warn("cl-transformation should be a child of cl-image or cl-video")
        }
      }
    }
  }]);

  cloudinaryModule.directive('clImage', ['cloudinary', function(cloudinary) {
    var Controller = function($scope) {
      this.addTransformation = function(ts) {
        $scope.transformations = $scope.transformations || [];
        $scope.transformations.push(ts);
        $scope.transformations = $scope.transformations.slice()
      };
      this.removeTransformation = function (ts) {
        $scope.transformations = $scope.transformations || [];
        var index = $scope.transformations.indexOf(ts);
        if (index >= 0) {
          $scope.transformations.splice(index, 1);
          $scope.transformations = $scope.transformations.slice()
        }
      }
    };
    Controller.$inject = ['$scope'];
    return {
      restrict : 'E',
      replace: true,
      transclude : true,
      template: "<img ng-transclude/>",
      scope: {},
      priority: 99,
      controller: Controller,
      // The linking function will add behavior to the template
      link : function(scope, element, attrs) {
        var options = toCloudinaryAttributes(attrs);
        var publicId = null;

        if (scope.transformations) {
          options.transformation = scope.transformations;
        }

        scope.$watch('transformations', function(value){
          if (!value) return;
          options.transformation = value;
          loadImage();
        });

        // store public id and load image
        attrs.$observe('publicId', function(value){
          if (!value) return;
          publicId = value;
          loadImage();
        });

        // observe and update version attribute
        attrs.$observe('version', function(value){
          if (!value) return;
          options['version'] = value;
          loadImage();
        });

        if (attrs.htmlWidth) {
          element.attr("width", attrs.htmlWidth);
        } else {
          element.removeAttr("width");
        }
        if (attrs.htmlHeight) {
          element.attr("height", attrs.htmlHeight);
        } else {
          element.removeAttr("height");
        }

        var loadImage = function() {
          if (options.responsive === "" || options.responsive === "true" || options.responsive === true) {
            options.responsive = true;
          }
          var url = cloudinary.url(publicId, options);
          if (options.responsive) {
            cloudinary.Util.setData(element[0], "src", url);
            cloudinary.cloudinary_update(element[0], options);
            cloudinary.responsive(options, false);
          } else {
            element.attr('src', url);
          }
        };

      }
    };
  }]);

  cloudinaryModule.directive('clVideo', ['cloudinary', function(cloudinary) {
    var Controller = function($scope) {
      this.addTransformation = function(ts) {
        $scope.transformations = $scope.transformations || [];
        $scope.transformations.push(ts);
        $scope.transformations = $scope.transformations.slice()
      };
      this.removeTransformation = function (ts) {
        $scope.transformations = $scope.transformations || [];
        var index = $scope.transformations.indexOf(ts);
        if (index >= 0) {
          $scope.transformations.splice(index, 1);
          $scope.transformations = $scope.transformations.slice()
        }
      }
    };
    Controller.$inject = ['$scope'];
    return {
      restrict : 'E',
      replace: true,
      transclude : true,
      template: "<video ng-transclude/>",
      scope: {},
      priority: 99,
      controller: Controller,
      link : function(scope, element, attrs) {
        var options = toCloudinaryAttributes(attrs);

        if (scope.transformations) {
          options.transformation = scope.transformations;
        }

        attrs.$observe('publicId', function(value){
          loadVideo(value);
        });

        if (!attrs.publicId) {
          throw new Error(
              'You must set the public id of the video to load, e.g. <cl-video public-id={{video.public_id}}...></cl-video>'
          );
        }
        loadVideo(attrs.publicId);

        function loadVideo(publicId) {
          var videoTag = cloudinary.videoTag(publicId, options);
          // Replace template with the custom video tag created by Cloudinary
          appendSourceElements(element[0], videoTag.content());
          // Add attributes
          setElementAttributes(element[0], videoTag.attributes());
        }
        function appendSourceElements(element, html) {
          const fragment = document.createDocumentFragment();
          element.innerHTML = html;

          while (element.childNodes[0]) {
            fragment.appendChild(element.childNodes[0]);
          }
          element.appendChild(fragment);
        }
        function setElementAttributes(element, attributesLiteral) {
          Object.keys(attributesLiteral).forEach(function (attrName) {
            if(attrName.substr(0,2) !== '$$') {
              element.setAttribute(attrName, attributesLiteral[attrName]);
            }
          });
        }
      }
    };
  }]);

  cloudinaryModule.provider( 'cloudinary', function(){
    var configuration = new cloudinary.Configuration();
    this.set = function(name, value){
      configuration.set(name, value);
      return this;
    };
    this.get = function(name){
      return configuration.get(name);
    };
    this.$get = [function cloudinaryFactory() {
      var instance;
      if (cloudinary.CloudinaryJQuery && jQuery) {
        // cloudinary is attached to the global `jQuery` object
        jQuery.cloudinary.config(configuration.config());
        instance = jQuery.cloudinary;
      } else {
        instance = new cloudinary.Cloudinary(configuration.config());
      }
      cloudinary.Util.assign(instance, cloudinary); // copy namespace to the service instance
      return instance;
    }];
  });
});
