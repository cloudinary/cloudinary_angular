Cloudinary Angular photo Album Ahead of Time compilation Sample
=======================================

This sample project shows:

1. How to use the Cloudinary Angular directives.
2. How to consume Cloudinary SDK in an Angular AOT setup using rollup

This sample does not show how to upload images directly frmo the browser.
You can see how this is implemented in other samples in this repository.

## Configuration ##

There are 2 settings you need to change for this demo to work. Copy or rename `app/js/config.ts.sample` to `app/js/config.ts` and edit the following:

1. **cloud_name** - Should be change to the cloud name you received when you registered for a Cloudinary account.
2. **upload_preset** - You should first "Enable unsigned uploads" in the ["Upload Settings"](https://cloudinary.com/console/settings/upload) of your Cloudinary console and assign the resulting preset name to that field. Note, you may want to tweak and modify the upload preset's parameters.
3. Additionally, in your Cloudinary console in the ["Security Settings"](https://cloudinary.com/console/settings/security) section you should uncheck the "list" item.

Learn more about [Angular AOT](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html)

## Setup ##

Run `npm install` to install the required dependencies for this module.

Alternatively use `yarn install`

## Running ##

Run `npm run clean-aot` to delete AOT compilation artifacts.

Run `npm run ngc` to run Angular's AOT compiler.

Run `npm run rollup` to bundle the application.

Run `npm run lite` to start the server and automatically open a browser and navigate to the application's url.

## Internals ##
This sample is using [Rollup](http://rollupjs.org/) for bundling the application and [lite-server](https://github.com/johnpapa/lite-server) for serving the application.

[index.html](index.html) loads Rollup's output, which is based on Angular's AOT compiler.

The sample creates a new NgModule, and depends on CloudinaryModule which is imported from the SDK module.

### List Resource ###

Cloudinary supports a JSON list resource. 
This list represents all resources marked with a specific tag during upload (or later through other APIs).
Whenever a new resource is uploaded with a tag, or an existing resource already tagged is deleted then the list is recalculated. 
This enables you to group a list of resources which can be retrieved by a single query. The size of the list is currently limited to 100 entires.
[Learn more](http://cloudinary.com/documentation/image_transformations#client_side_resource_lists)
