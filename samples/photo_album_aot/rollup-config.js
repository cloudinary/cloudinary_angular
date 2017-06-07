import rollup      from 'rollup'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs    from 'rollup-plugin-commonjs';
import uglify      from 'rollup-plugin-uglify'

export default {
  entry: 'app/main.js',
  dest: 'dist/build.js', // output a single application bundle
  sourceMap: false,
  format: 'iife',
  plugins: [
      nodeResolve({jsnext: true, module: true}),
      commonjs({
        include: ['node_modules/rxjs/**',
        'node_modules/@cloudinary/angular-4.x/**',
        'node_modules/cloudinary-core/**',
        ],
        namedExports: {
          // left-hand side can be an absolute path, a path
          // relative to the current directory, or the name
          // of a module in node_modules
          'cloudinary-core/cloudinary-core-shrinkwrap': [ 'Cloudinary' ],
          '@cloudinary/angular-4.x': [ 'CloudinaryModule', 'Cloudinary' ],
        }
      }),
  ]
}
