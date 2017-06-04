import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from '@cloudinary/angular-4.x';

import { EagerComponent } from './eager.component';
import { SharedModule } from './shared/shared.module';
import { routing } from './app.routing';

import { AppComponent } from './app.component';

export const cloudinaryLib = {
  Cloudinary: Cloudinary
};

@NgModule({
  declarations: [
    AppComponent,
    EagerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    NgbModule.forRoot(),
    CloudinaryModule.forRoot(cloudinaryLib, { cloud_name: 'demo'}),
    routing,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
