
1.0.2 / 2018-07-16
==================

  * Update sample to Angular 6. Fixes #138
  * Add isBrowser check for SSR. Fixes #150
  * Avoid errors in angular-universal server rendering
  * Set common background properties for CloudinaryBackgroundImageDirective
  * export CloudinaryBackgroundImageDirective
  * Add background image directive
  * Add tests for `quality:auto` parameter
  * Add a test of keyframe_interval (ki) parameter
  * Add tests of overlay/underlay with a fetched image
  * Add tests of initialWidth and initialHeight params
  * Exclude *.d.ts files from lint check
  * Update samples to latest Angular 5 SDK version 1.0.1

1.0.1 / 2018-01-28
==================

  * Add onLoad and onError event emitters (#128)
  * Universal rendering (#120)
  * Add cld-responsive as an alias for responsive attribute (#91)
  * Update samples to use SDK for Angular 5

(5.x)1.0.0 / 2017-11-22
=======================

## Initial Support for Angular 5.x

  * Upgrade to Angular5 (#115)
  * Update Readme to point to HTTPS URLs of cloudinary.com
  * Angular: Unit Test for gravity:auto (#99)
  * Update README.md
  * Add links to online samples to README
  * Fix handling of dynamic updates to public-id. Fixes #83 (#94)
  * Add `start` to npm scripts.
  * Update sample apps to Angular 4.x. Make all projects use config.ts.
  * Fixes https://github.com/cloudinary/cloudinary_angular/issues/89
  * Add comments to ng2-file-upload usage

(4.x)1.0.0 / 2017-05-18
=======================

## Initial Support for Angular 4.x

  * Use place holders for module name and version number
  * Update README.md
  * Update lib and samples to Angular 4
  * Merge pull request #67 from cloudinary/isNamedNodeMap-fix-for-firefox
  * Update README links with Angular2 SDK
  * Update toCloudinaryAttributes to use MozNamedAttrMap for old versions of FireFox

2.1.2 / 2017-04-21
==================

*This patch version is published to bower only*

  * Add `bower.json` definition to `angular_next` (Angular 2) branch.

2.1.1 / 2017-01-18
==================

  * Add missing files in npm package
  * Update sample projects

2.1.0 / 2017-01-18
==================

  * Support Angular AOT, fixes #69
  * Fix reference to package name in README. Fixes #68
  * Fix typo

2.0.0 / 2017-01-10
==================
First release of the Angular 2.x compatible library

New Features
------------

  * cl-image and cl-video components
  * cl-transformation attribute directive
  * clSrc, clHref, clSrcset attribute directives 
