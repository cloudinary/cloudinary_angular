import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CloudinaryModule } from '@cloudinary/angular-4.x';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    CloudinaryModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    CloudinaryModule,
    NgbModule
  ],
  providers: []
})
export class SharedModule {
}
