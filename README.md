Cloudinary Angular SDK
=========================
## About
**NOTE-IMPORTANT**: This is a legacy package, please find latest at https://github.com/cloudinary/frontend-frameworks/tree/master/packages/angular

The Cloudinary Angular SDK allows you to quickly and easily integrate your application with Cloudinary.
Effortlessly optimize, transform, and manage your cloud's assets.


#### Note
This Readme provides basic installation and usage information. 
For the complete documentation, see the [Angular SDK Guide](https://cloudinary.com/documentation/angular_integration).


## Table of Contents
- [Key Features](#key-features)
- [Version Support](#Version-Support)
- [Installation](#installation)
- [Usage](#usage)
    - [Setup](#Setup)
    - [Transform and Optimize Assets](#Transform-and-Optimize-Assets)
    - [Generate Image and HTML Tags](#Generate-Image-and-Video-HTML-Tags)
    

## Key Features
- [Transform](https://cloudinary.com/documentation/angular1_video_manipulation#video_transformation_examples) and [optimize](https://cloudinary.com/documentation/angular1_image_manipulation#image_optimizations) assets.
- Generate [image](https://cloudinary.com/documentation/angular1_image_manipulation#deliver_and_transform_images) and [video](https://cloudinary.com/documentation/angular1_video_manipulation#video_element) tags.


## Version Support
| SDK Version   | ng 2 | ng 4 | ng >=5.0.0 |
|---------------|------|------|------------|
| 5.x           | X    | X    | V          |
| 4.x           | X    | V    | X          |
| 2.x           | V    | X    | X          |

## Installation
```shell
npm install @cloudinary/angular-5.x cloudinary-core --save
```


## Usage
### Setup
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

### Transform and Optimize Assets
- [See full documentation](https://cloudinary.com/documentation/angular1_image_manipulation)
```html
    <cl-image public-id="readme" class="thumbnail inline" angle="20" format="jpg">
        <cl-transformation height="150" width="150" crop="fill" effect="sepia" radius="20"></cl-transformation>
        <cl-transformation overlay="text:arial_60:readme" gravity="north" y="20"></cl-transformation>
    </cl-image>
```

### Generate Image and Video HTML Tags
    - Use <cl-image> to generate image tags
    - Use <cl-video> to generate video tags

### File upload
This SDK does not provide file upload functionality, however there are [several methods of uploading from the client side](https://cloudinary.com/documentation/angular1_image_and_video_upload).

## Contributions
- Ensure tests run locally (```npm run test```)
- Open a PR and ensure Travis tests pass


## Get Help
If you run into an issue or have a question, you can either:
- Issues related to the SDK: [Open a Github issue](https://github.com/cloudinary/cloudinary_angular/issues)
- Issues related to your account: [Open a support ticket](https://cloudinary.com/contact)


## About Cloudinary
Cloudinary is a powerful media API for websites and mobile apps alike, Cloudinary enables developers to efficiently manage, transform, optimize, and deliver images and videos through multiple CDNs. Ultimately, viewers enjoy responsive and personalized visual-media experiences—irrespective of the viewing device.


## Additional Resources
- [Cloudinary Transformation and REST API References](https://cloudinary.com/documentation/cloudinary_references): Comprehensive references, including syntax and examples for all SDKs.
- [MediaJams.dev](https://mediajams.dev/): Bite-size use-case tutorials written by and for Cloudinary Developers
- [DevJams](https://www.youtube.com/playlist?list=PL8dVGjLA2oMr09amgERARsZyrOz_sPvqw): Cloudinary developer podcasts on YouTube.
- [Cloudinary Academy](https://training.cloudinary.com/): Free self-paced courses, instructor-led virtual courses, and on-site courses.
- [Code Explorers and Feature Demos](https://cloudinary.com/documentation/code_explorers_demos_index): A one-stop shop for all code explorers, Postman collections, and feature demos found in the docs.
- [Cloudinary Roadmap](https://cloudinary.com/roadmap): Your chance to follow, vote, or suggest what Cloudinary should develop next. 
- [Cloudinary Facebook Community](https://www.facebook.com/groups/CloudinaryCommunity): Learn from and offer help to other Cloudinary developers.
- [Cloudinary Account Registration](https://cloudinary.com/users/register/free): Free Cloudinary account registration.
- [Cloudinary Website](https://cloudinary.com): Learn about Cloudinary's products, partners, customers, pricing, and more.


## Licence
Released under the MIT license.
