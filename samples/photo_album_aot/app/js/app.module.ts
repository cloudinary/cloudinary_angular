'use strict';
// Angular modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
// Cloudinary module
import { CloudinaryModule } from '@cloudinary/angular-4.x';
import { Cloudinary } from 'cloudinary-core/cloudinary-core-shrinkwrap';
// App modules
import { AppComponent } from './app.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoAlbum } from './model/photo-album.service';
import { config } from './config';
import { routing } from './app.routing';

const cloudinaryLib = {
  Cloudinary: Cloudinary
};

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    CloudinaryModule.forRoot(cloudinaryLib, config),
    routing
  ],
  declarations: [
    AppComponent,
    PhotoListComponent
  ],
  providers: [
    PhotoAlbum
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
