/**
 * System configuration for Angular2 Cloudinary sample
 */
(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': '../node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'app',
            // Cloudinary lib
            '@cloudinary/angular': 'npm:@cloudinary/angular',
            'cloudinary-jquery-file-upload': 'npm:cloudinary-jquery-file-upload',
            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            // other libraries
            'rxjs': 'npm:rxjs',
            'jquery': 'npm:jquery/dist/jquery.js',
            'jquery.ui.widget': 'npm:blueimp-file-upload/js/vendor/jquery.ui.widget.js',
            'jquery-ui/widget': 'npm:blueimp-file-upload/js/vendor/jquery.ui.widget.js',
            'jquery-ui/ui/widget': 'npm:blueimp-file-upload/js/vendor/jquery.ui.widget.js',
            'jquery.iframe-transport': 'npm:blueimp-file-upload/js/jquery.iframe-transport.js',
            'jquery.fileupload': 'npm:blueimp-file-upload/js/jquery.fileupload.js'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            "@cloudinary/angular": {
                main: 'lib/index.js',
                defaultExtension: 'js'
            },
            "cloudinary-jquery-file-upload": {
                main: 'cloudinary-jquery-file-upload.js',
                defaultExtension: 'js'
            }
        }
    });
})(this);
