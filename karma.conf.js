module.exports = function (config) {
  return config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'bower_components/lodash/lodash.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/cloudinary-core/cloudinary-core.js',
      'js/angular.cloudinary.js',
      'spec/cloudinary_spec.js'],
    preprocessors: {
    },
    reporters: ['story'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_DEBUG,
    autoWatch: false,
    //browsers: ['Chrome', 'Firefox', 'Safari'],
    browsers: ['PhantomJS', "Chrome"],
    //browsers: ['Chrome'],
    singleRun: true,
    plugins: [
      'karma-jasmine',
      'karma-coverage',
      'karma-story-reporter',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher'
    ]
  });
};

