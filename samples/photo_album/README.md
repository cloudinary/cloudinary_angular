Cloudinary AngularJS Photo Album Sample
=======================================

This sample project shows:

1. How to use the Cloudinary AngularJS directives.
2. How to upload files in an unsigned manner, using an upload preset, to Cloudinary.
3. How to use the dynamic list resource in order to maintain short list of resources aggregated by tags.

## Configuration ##

There are 2 settings you need to change for this demo to work. Copy or rename `app/js/config.js.sample` to `app/js/config.js` and edit the following:

1. **cloud_name** - Should be change to the cloud name you received when you registered for a Cloudinary account.
2. **upload_preset** - You should first "Enable unsigned uploads" in the ["Upload Settings"](https://cloudinary.com/console/settings/upload) of your Cloudinary console and assign the resulting preset name to that field. Note, you may want to tweak and modify the upload preset's parameters.
3. Additionally, in your Cloudinary console in the ["Security Settings"](https://cloudinary.com/console/settings/security) section you should uncheck the "list" item.

## Setup ##

This sample uses Node's "http-server" to serve as simple http server. No other server components are required. For client side package management Bower is used.

## Running ##

    npm start

Then go to

    http://localhost:8000/app

## Internals ##

### Directives ###

The `index.html` page and the `photo-upload.html` partial give some examples of both the URL directive and Image directive.

### Unsignd Upload ###

In order to add images to our photo album that would later be rettrievable from the Cloudinary service we must select a tag which will serve as our source for the list. In this case `myphotoalbum`. While this can tag can actually be set in the upload preset and be hidden from the client side, in this sample we included it in the request itself to make this sample work without fursther configuration steps.

The `photoUploadCtrl` uses the [Angular File Upload](https://github.com/danialfarid/angular-file-upload) in order to configure the direct upload widget.

The `photoUploadCtrlJQuery` uses the Cloudinary JQuery library in order to configure the direct upload widget. Notice that changes to the title field are propagated to the `formData` being sent in the upload request. This is meant to illustrate the possiblity of attaching extra meta-data to each upload image.

Also note, these upload widgets use the `upload_preset` we configured in Configuration step. This uses the settings defined on Cloudinary side to process the uploaded file.

### List Resource ###

Cloudinary supports a JSON list resource. This list represents all resources marked with a specific tag during upload (or later through other APIs). Whenever one a new resource is tagged or an existing resource already tagged is deleted the list is recomputed. This enables you to group a limited quantity of resources (100 currently) and make them retrievable for client only applications.

The list retrieval is done here in this sample using the Angular's service using `myphotoalbum` as the seed tag.

Notes:

1. Currently the list is cached for 1 minute in the CDN.
2. As mentioned above the maximum number of returned resources in the list 100


### 
