Cloudinary
==========
The official [Cloudinary](https://cloudinary.com) SDK for Angular.

We maintain difference branches for different versions. Cloudinary's latest Angular SDK can be found [here](https://github.com/cloudinary/cloudinary_angular/tree/angular-5.x)

[Cloudinary](https://cloudinary.com) is a cloud service that offers a solution to a web application's entire image management pipeline. 

Easily upload images to the cloud. Automatically perform smart image resizing, cropping and conversion without installing any complex software. Integrate Facebook or Twitter profile image extraction in a snap, in any dimension and style to match your website’s graphics requirements. 
Images are seamlessly delivered through a fast CDN, and much much more. 

Cloudinary offers comprehensive APIs and administration capabilities and is easy to integrate with any web application, existing or new.

Cloudinary provides URL and HTTP based APIs that can be easily integrated with any Web development framework. 

For Angular, Cloudinary provides an SDK for simplifying the integration even further. 
The SDK serves as a layer on top of one of [Cloudinary's Javascript library](https://github.com/cloudinary/cloudinary_js).


## Live examples ##################################################################
Start experimenting right away with one of these live examples:

* [Codepen example](https://codepen.io/team/Cloudinary/project/editor/AxrvPZ/)
* [Plunker example](https://plnkr.co/edit/Tvrwxt2AW8K5DEhuTKhB?p=preview)
* [Glitch example](https://glitch.com/edit/#!/cloudinary-angular-sdk)

## Installation ######################################################################
Install the SDK version that supports the Angular version you are using:

* For Angular 2, use `2.x`
* For Angular 4, use `4.x`
* For Angular 5-11, use `5.x`

For example: 

```shell
npm install @cloudinary/angular-5.x cloudinary-core --save
```

## Usage ######################################################################

The module provides three types of directives:

* A Cloudinary image component with child transformation directives for creating `<image>` tags and controlling its underlying chained transformations
* A Cloudinary video component with child transformation directives for creating `<video>` tags with multiple video sources and settings and controlling its underlying chained transformations
* Attribute directives for enhancing native HTML elements with Cloudinary image management capabilities

Further image manipulation options are listed in [this reference](https://cloudinary.com/documentation/image_transformations#reference).

Further video manipulation and delivery capabilities see listed in [this reference](https://cloudinary.com/documentation/video_manipulation_and_delivery).

Note that the attribute names in the docs are using snake_case, however this SDK supports both snake_case and kebab-case for attribute names,
e.g. both `fetch_format: 'auto'` and `'fetch-format': 'auto'` are eventually translated to `f_auto`. 

### Cloudinary module configuration and setup ##################################
This SDK is based on the Cloudinary JS module, however the two are decoupled, i.e. this module's `Cloudinary` is a configurable service
to which you provide your choice of our JS module.

Example Coudinary configuration in your application's module definition:

```javascript
import { NgModule } from '@angular/core';
// ...
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';

@NgModule({
    imports: [
        CloudinaryModule.forRoot({Cloudinary}, { cloud_name: 'your_cloud_name' } as CloudinaryConfiguration),
    ],
    bootstrap: [/* ... */]
})
export class AppModule { }
```

See [samples folder](https://github.com/cloudinary/cloudinary_angular/tree/master/projects/angular-cld/samples) for a complete reference project.

### Creating new image tags with cl-image & cl-transformation ##################################

The [cl-image](https://github.com/cloudinary/cloudinary_angular/blob/master/projects/angular-cld/src/lib/cloudinary-image.component.ts) component generates an `<image>` tag with requested transformation, type, and format. 
The image tag can contain optional `<cl-transformation>` tags that will be used as chained transformations:

```html
    <cl-image public-id="readme" class="thumbnail inline" angle="20" format="jpg">
        <cl-transformation height="150" width="150" crop="fill" effect="sepia" radius="20"></cl-transformation>
        <cl-transformation overlay="text:arial_60:readme" gravity="north" y="20"></cl-transformation>
    </cl-image>
```

Will be compiled by Angular to:

```html
    <cl-image _ngcontent-ywn-2="" public-id="readme" class="thumbnail inline" format="jpg" angle="20" ng-reflect-public-id="readme">
        <img src="http://res.cloudinary.com/{your_cloud_name}/image/upload/c_fill,e_sepia,h_150,r_20,w_150/g_north,l_text:arial_60:readme,y_20/a_20/readme.jpg">
    </cl-image>
```

### Creating new video tags with cl-video & cl-transformation ##################################

The [cl-video](src/cloudinary-video.component.ts) component generates a `<video>` tag with requested transformation, type, and format.
 
The generated `<video>` is created with configurable child `<source>` elements for all relevant formats supported by web browsers (`webm`, `mp4` and `ogv`), as well as a poster thumbnail image.

The video tag can contain optional `<cl-transformation>` tags that will be used as chained transformations:

```html
    <cl-video cloud-name="my_other_cloud" public-id="watchme" secure="true" class="my-videos">
        <cl-transformation overlay="text:arial_60:watchme" gravity="north" y="20"></cl-transformation>
    </cl-video>
```

Will be compiled by Angular to:

```html
    <video class="my-videos" public-id="watchme" ng-reflect-public-id="watchme" 
            poster="https://res.cloudinary.com/my_other_cloud/video/upload/g_north,l_text:arial_60:watchme,y_20/watchme.jpg">
        <source src="https://res.cloudinary.com/my_other_cloud/video/upload/g_north,l_text:arial_60:watchme,y_20/watchme.webm" type="video/webm">
        <source src="https://res.cloudinary.com/my_other_cloud/video/upload/g_north,l_text:arial_60:watchme,y_20/watchme.mp4" type="video/mp4">
        <source src="https://res.cloudinary.com/my_other_cloud/video/upload/g_north,l_text:arial_60:watchme,y_20/watchme.ogv" type="video/ogg">
    </video>
```

#### Updating images and videos dynamically ######################################################
You can update attributes dynamically for `<cl-image>` and `<cl-video>` elements to reload the underlying native elements with 
new transformations.
 
The following example from the sample projects demonstrates setting the opacity to 50% when hovering on top of an element:
```html
    <cl-image
        public-id={{photo.public_id}}
        (mouseenter)="photo.isMouseOver = true"
        (mouseleave)="photo.isMouseOver = false"
        [attr.opacity]="photo.isMouseOver ? '50' : null"
    >
```

### Attribute directives for enhancing HTML elements - clSrc, clHref, clSrcset ##################################

These directives transform the given URI to a cloudinary URL. For example:

```html
    <img clSrc="https://cloudinary.com/images/logo.png" type="fetch" fetch-format="auto" quality="auto">
```

Will be compiled by Angular to:

```html
    <img clSrc="https://cloudinary.com/images/logo.png" fetch-format="auto" quality="auto" type="fetch" ng-reflect-clSrc="https://cloudinary.com/images/logo.png" 
    src="http://res.cloudinary.com/{your_cloud_name}/image/fetch/f_auto,q_auto/https://cloudinary.com/images/logo.png">
```

See additional usage examples [here](https://github.com/cloudinary/cloudinary_angular/blob/master/projects/angular-cld/src/lib/cloudinary-image.component.spec.ts) and in the sample projects.

## Samples ########################################################

You can find our sample projects, along with documentation in the [samples folder](https://github.com/cloudinary/cloudinary_angular/tree/master/projects/angular-cld/samples).

:information_source: In order to run the samples you need to create a new file called config.ts with your cloud credentials.
Copy `config.ts.sample` in the sample of your choice and replace the placeholders with your credentials.

### What's in the box ########################################################
Both sample applications demonstrate a basic photo gallery showcasing basic image transformations and upload of new images either by a file input dialog or by drag-and-drop.

The samples differ by their bundling solution and upload implementation:

* [Photo album sample app](https://github.com/cloudinary/cloudinary_angular/tree/master/projects/angular-cld/samples/photo_album) 
    * Uses [ng2-file-upload](https://github.com/valor-software/ng2-file-upload) for uploading files using an opensource file uploader
    * Uses [Webpack](https://webpack.github.io) for bundling and serving the application
* [Photo album sample app with jQuery](https://github.com/cloudinary/cloudinary_angular/tree/master/projects/angular-cld/samples/photo_album_with_jquery) 
    * Uses [Cloudinary's jQuery plugin](https://cloudinary.com/blog/direct_upload_made_easy_from_browser_or_mobile_app_to_the_cloud#direct_uploading_from_the_browser_using_jquery) for uploading files using jQuery and blueimp.
    * Uses [SystemJS](https://github.com/systemjs/systemjs) for bundling the application and [lite-server](https://github.com/johnpapa/lite-server) for serving the application. 
* [Photo Album AOT compilation](samples/photo_album_aot) 
    * Demonstrates usage of Cloudinary SDK in an [Angular AOT](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html) application
    * Uses [Rollup](http://rollupjs.org/) for bundling the application and [lite-server](https://github.com/johnpapa/lite-server) for serving the application.

Please consult with the respective README file of each sample for usage and additional information.

## Development ################################################################

:raised_hands: This module supports the following npm scripts:

* **lint** - Runs tslint on **/*.ts
* **test** - Compiles TypeScript and runs unit tests on the generated JS files, re-running tests automatically on chages 
* **test-once** - Compiles TypeSCript and executes unit tests once, closing the browser once it's done
* **pree2e** - Updates WebDriver binary
* **start-sample** - Starts the photo album sample, without automatically opening the browser and navigating to the started app
* **start-sample:jquery** - Same as *start-sample* for the jQuery sample
* **install-sample-from-source** - Compiles TypeScript, packs this module and installs it into samples/photo_album
* **install-sample-from-source:jquery** - Same as *install-sample-from-source* for the jQuery sample
* **e2e** - Runs *install-sample-from-source*, starts the app and runs protractor tests on the started app
* **e2e:jquery** - Same as *e2e* for the jQuery sample
* **tsc** - Runs the tsc compiler
* **tsc:w** - Runs the tsc compiler and watches for changes
* **webdriver:update** - Updates WebDriver binary

## Additional resources ##########################################################

Additional resources are available at:

* [Website](https://cloudinary.com)
* [Interactive demo](https://demo.cloudinary.com/default)
* [Documentation](https://cloudinary.com/documentation)
* [Knowledge Base](https://support.cloudinary.com/hc/en-us)
* [Documentation for Angular integration](https://cloudinary.com/documentation/angular_integration)
* [Image upload documentation](https://cloudinary.com/documentation/upload_images)
* [Image transformations documentation](https://cloudinary.com/documentation/image_transformations)

## Support #######################################################################

You can [open an issue through GitHub](https://github.com/cloudinary/cloudinary_angular/issues).

Contact us [https://cloudinary.com/contact](https://cloudinary.com/contact)

Stay tuned for updates, tips and tutorials: [Blog](https://cloudinary.com/blog), [Twitter](https://twitter.com/cloudinary), [Facebook](https://www.facebook.com/Cloudinary).

## Join the Community ##########################################################

Impact the product, hear updates, test drive new features and more! Join [here](https://www.facebook.com/groups/CloudinaryCommunity).


## License #######################################################################

Released under the MIT license. 
