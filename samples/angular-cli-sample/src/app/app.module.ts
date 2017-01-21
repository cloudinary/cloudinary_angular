import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CloudinaryModule } from '@cloudinary/angular';

import { AppComponent } from './app.component';

import * as  Cloudinary from 'cloudinary-core';

@NgModule({
  declarations: [
    AppComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'demo'}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
