import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from '@cloudinary/angular';

import { AppComponent } from './app.component';

export const cloudinaryLib = {
  Cloudinary: Cloudinary
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CloudinaryModule.forRoot(cloudinaryLib, { cloud_name: 'demo'}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
