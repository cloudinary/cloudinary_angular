'use strict';
// Angular modules
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
// File upload module
import {FileUploadModule} from 'ng2-file-upload';
// Cloudinary module
import {CloudinaryModule, CloudinaryConfiguration, provideCloudinary} from '@cloudinary/angular';
// Application modules
import {AppComponent} from './app.component';
import {PhotoListComponent} from './photo-list/photo-list.component';
import {PhotoUploadComponent} from './photo-album/photo-upload.component';
import {PhotoAlbum} from './model/photo-album.service';
import cloudinaryConfiguration from './config';
import {routing} from './app.routing';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        CloudinaryModule,
        FileUploadModule,
        routing
    ],
    declarations: [
        AppComponent,
        PhotoListComponent,
        PhotoUploadComponent
    ],
    providers: [
        PhotoAlbum,
        provideCloudinary(require('cloudinary-core'), cloudinaryConfiguration as CloudinaryConfiguration)
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
