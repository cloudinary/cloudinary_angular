const bundlewatchConfig = {
  files: [
    {
      path: './dist/angular-cld/bundles/cloudinary-angular-5.x.umd.js',
      maxSize: '30kb'
    },
    {
      path: './dist/angular-cld/fesm5/cloudinary-angular-5.x.js',
      maxSize: '25kb'
    }
  ],
  defaultCompression: 'gzip',
};

module.exports = bundlewatchConfig;
