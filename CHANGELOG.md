
1.0.0 / 2016-03-15
==================

New Features
------------

  * Support Responsive behaviour

Other Changes
-------------

  * Add tests for responsive behaviour
  * Add spec and karma to bower ignore list
  * Merge pull request #42 from gilhanan/gilhanan-readme-patch-1
    * Add bower install instructions

0.2.0 / 2016-01-14
==================

jQuery independent version
--------------------------

  * Use Cloudinary new API
  * Create CloudinaryProvider.
  * Separate sample app to with and without jQuery.

Other changes
-------------

  * Add setter and getter to Cloudinary provider. Serve `jQuery.cloudinary` if present.
  * Add NPM package.json file
  * Add spec file. Add Karma configuration.
  * Update gitignore. Update dependencies.
  * Rename spec file. Remove coverage and add Chrome to the karma test.
  * Fix sample project dependency. Remove leftover file.
  * Add uploaded image preview to the jQuery upload page
  * Support PhantomJS
  * Change ng-file-upload input to match version 11.
  * Merge pull request #40 from ArdentKid/master
  * bower dependency fix for "cloudinary_ng"

0.1.4 / 2015-08-23
==================

  * Upgrade Angular to 1.4 and ng-file-upload to version 7.0.x
  * Merge pull request #35 from BrittanyLea/editReadMe
    * Edited typo under Uploading Images section.
  * Change sample project's bower to install local version of the package.
  * Fix #16 multiple drag and drop
  * Modified bower configuration
  * upgrade angular file upload to latest version. support multiple file uploads in sample
  * Merge branch 'NotBobTheBuilder-master' from PR #14
  * Friendlier DI for minification compatibility

0.1.3 / Never released
======================

  * support angular 1.3 as well
  * Merge pull request #12 from vvvvalvalval/master
    * Corrected typos in sample README
  * Merge pull request #9 from skiomusic/master
    * Merge pull request #1 from nealclark/master
    * Observe version attribute, reload image on change

0.1.2 / 2014-09-04
==================

  * Merge pull request #8 from carlositocasal/bower-json-update
    * Correct homepage url.
  * Update README.md
  * Merge pull request #7 from iwoodruff/master
    * Update README.md
  * update readme to reflect angular file upload addition
  * Merge branch 'fix-angular-dependency-injection' of https://github.com/dsager/cloudinary_angular
  * add support for angular file upload (https://github.com/danialfarid/angular-file-upload)
  * version bump
  * added missing semicolon
  * define $scope parameter as injected for controller in order to avoid mangling errors
  * Merge pull request #5 from dsager/bower-json-main-entry
    * added main entry to bower.json
  * make publicId in ng-image dynamic. issue #1

v0.1.1 / 2014-05-26
===================

  * fix cloudinary_js dependency. add list enabling instructions to sample. fix sample dependency
  * make the package not private

v0.1.0 / 2014-05-26
===================

  * initial commit: 0.1.0
