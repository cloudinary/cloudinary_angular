import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-4.x';
import cloudinaryConfiguration from './config';
import { AppComponent } from './app.component';

export const cloudinary = {
  Cloudinary: CloudinaryCore
};
export const config: CloudinaryConfiguration = cloudinaryConfiguration;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CloudinaryModule.forRoot(cloudinary, config),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
