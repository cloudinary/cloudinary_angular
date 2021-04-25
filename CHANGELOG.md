
1.4.1 / 2021-04-25
=============
* resolve errors wheh using lazyload and ssr (#306)


1.4.0 / 2021-02-22
==================
* Add service api to update configuration during runtime (#302)
* Add support to angular 11  (#304)

1.3.4 / 2021-01-17
==================
*  Add video event support (#300)

1.3.3 / 2020-08-26
==================
* Add test for secure placeholder (#291)
* Update accessibility to use core transformation (#290)
* Update placeholder to use core transformation(#289)



1.3.2 / 2020-07-23
=============
 * Updated placeholder styling (#288)



1.3.1 / 2020-07-19
=============

New functionality
-----------------
 * Add support for angular 10 (#281)

Other changes
-----------------
 * Fix placeholder when user passes css style (#284)
 * Add test for normalized user variables (#280)
 * Update workspace to version angular 7 (#278)
 * Fix user variables (#276)
 * Add test coverage (#285)
 * Update cloudinary-core version (#286)


1.2.2 / 2020-04-13
==================

New functionality
-----------------
* Added bundlewatch (#268)
* Added issue templates (#265) 

Other changes
-----------------
*  Removed lock files from sample projects (#271)
*  Updated placeholder constants data structure (#270)
*  Updated styling for image without placeholder (#266)
*  Update sample links (#264
*  Update vectorize placeholder transformation (#259)

1.2.0-rc.0 / 2020-02-17
=======================

New functionality
-----------------
* Add support for Angular 9
* Add predominant-color
* Add `accessibility` attribute to `cl-image`

Other changes
-----------------
* Fix lazy load in chrome 

1.1.0 / 2019-12-09
==================

New functionality
-----------------
* Add support to lazy loading
* Add placeholder component
Other changes
-------------
* Add test for custom function
* Add fps tests

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
