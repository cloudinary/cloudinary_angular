Cloudinary
==========

Cloudinary is a cloud service that offers a solution to a web application's entire image management pipeline. 

Easily upload images to the cloud. Automatically perform smart image resizing, cropping and conversion without installing any complex software. Integrate Facebook or Twitter profile image extraction in a snap, in any dimension and style to match your website’s graphics requirements. Images are seamlessly delivered through a fast CDN, and much much more. 

Cloudinary offers comprehensive APIs and administration capabilities and is easy to integrate with any web application, existing or new.

Cloudinary provides URL and HTTP based APIs that can be easily integrated with any Web development framework. 

For AngularJS, Cloudinary provides a plugin for simplifying the integration even further. The plugin serves as a layer on top the [Cloudinary jQuery plugin](http://cloudinary.com/documentation/jquery_integration#installation)

## Setup ######################################################################

Follow the setup procedure described in the [Cloudinary jQuery plugin](https://github.com/cloudinary/cloudinary_js#setup) setup procedure. The sample project contained in this repository can serve as an example.


## Usage ######################################################################

The plugin provides two angular directives. URL directive and image tag directive.

### Image tag generation directive - cl-image ##################################

Similarly to the above this directive will generate an image tag with requested transformation, type, and format. The image tag can contain transformation tags that will be used as piped transformations:

    <cl-image public-id="{some_public_id}" class="thumbnail inline" angle="20" format="jpg">
      <cl-transformation height="150" width="150" crop="fill" gravity="north" effect="sepia" radius="20"/>
    </cl-image>

Will be translated to:

    <img ng-transclude="" public-id="{some_public_id}" class="thumbnail inline ng-isolate-scope" angle="20" format="jpg" 
      src="http://res.cloudinary.com/{your cloud name}/image/upload/c_fill,e_sepia,g_north,h_150,r_20,w_150/a_20/{some_public_id}.jpg"></img>

For a complete list of image manipulation options see [this reference](http://cloudinary.com/documentation/image_transformations#reference).

### Manipulation URL generation directives - cl-src, cl-href, cl-srcset #######

These directives transform the given URI to a cloudinary URL. For example:

    <link rel="shortcut icon" cl-href="{publicly_available_image}" type="fetch" effect="sepia" width="16" heigh="16" crop="fit"/>

Will be transformed to:

    <link rel="shortcut icon" cl-href="{publicly_available_image}" type="fetch" effect="sepia" width="16" height="16" crop="fit"
      href ="http://res.cloudinary.com/{your cloud name}/image/fetch/c_fit,e_sepia,h_16,w_16/{publicly_available_image}">


### Uploading images

You can upload images directly from the browser using Cloudinary's jQuery plugin from you AngularJS app. See the sample [photo album app](https://github.com/cloudinary/cloudinary_angular/tree/master/samples/photo_album) for a usage example.


## Samples

You can find our simple and ready-to-use samples projects, along with documentation in the [samples folder](https://github.com/cloudinary/cloudinary_angular/tree/master/samples/photo_album). 
Please consult with the [README file](https://github.com/cloudinary/cloudinary_angular/blob/master/samples/photo_album/README.md), for usage and explanations.


## Additional resources ##########################################################

Additional resources are available at:

* [Website](http://cloudinary.com)
* [Documentation](http://cloudinary.com/documentation)
* [Knowledge Base](http://support.cloudinary.com/forums)
* [Documentation for jQuery integration](http://cloudinary.com/documentation/jquery_integration)
* [Image upload documentation](http://cloudinary.com/documentation/upload_images)
* [Image transformations documentation](http://cloudinary.com/documentation/image_transformations)

## Support

You can [open an issue through GitHub](https://github.com/cloudinary/cloudinary_gem/issues).

Contact us [http://cloudinary.com/contact](http://cloudinary.com/contact)

Stay tuned for updates, tips and tutorials: [Blog](http://cloudinary.com/blog), [Twitter](https://twitter.com/cloudinary), [Facebook](http://www.facebook.com/Cloudinary).


## License #######################################################################

Released under the MIT license. 
