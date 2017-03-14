import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import 'rxjs/add/operator/toPromise';
import { Cloudinary } from '@cloudinary/angular';

@Component({
  selector: 'photo-list',
  templateUrl: 'photo-upload.component.html'
})
export class PhotoUploadComponent implements OnInit {

  @Input()
  responses: Array<any>;

  private hasBaseDropZoneOver: boolean = false;
  private uploader: FileUploader;
  private title: string;

  constructor(
    private cloudinary: Cloudinary,
    private zone: NgZone,
    private http: Http
  ) {
    this.responses = [];
    this.title = '';
  }

  ngOnInit(): void {
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
      autoUpload: true,
      isHTML5: true,
      removeAfterUpload: true,
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };
    this.uploader = new FileUploader(uploaderOptions);

    // Add custom tag for displaying the uploaded photo in the list
    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      form.append('upload_preset', this.cloudinary.config().upload_preset);
      let tags = 'myphotoalbum';
      if (this.title) {
        form.append('context', `photo=${this.title}`);
        tags = `myphotoalbum,${this.title}`;
      }
      form.append('tags', tags);
      form.append('file', fileItem);

      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    // Insert or update an entry in the responses array
    const upsertResponse = fileItem => {

      // Run the update in a custom zone since for some reason change detection isn't performed
      // as part of the XHR request to upload the files.
      // Running in a custom zone forces change detection
      this.zone.run(() => {
        // Update an existing entry if it's upload hasn't completed yet

        // Find the id of an existing item
        const existingId = this.responses.reduce((prev, current, index) => {
          if (current.file.name === fileItem.file.name && !current.status) {
            return index;
          }
          return prev;
        }, -1);
        if (existingId > -1) {
          // Update existing item with new data
          this.responses[existingId] = Object.assign(this.responses[existingId], fileItem);
        } else {
          // Create new response
          this.responses.push(fileItem);
        }
      });
    };

    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) =>
      upsertResponse(
        {
          file: item.file,
          status,
          data: JSON.parse(response)
        }
      );

    this.uploader.onProgressItem = (fileItem: any, progress: any) =>
      upsertResponse(
        {
          file: fileItem.file,
          progress,
          data: {}
        }
      );
  }

  updateTitle(value: string) {
    this.title = value;
  }

  deleteImage = function (data: any, index: number) {
    const url = `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/delete_by_token`;
    let headers = new Headers({ 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' });
    let options = new RequestOptions({ headers: headers });
    const body = {
      token: data.delete_token
    };
    this.http.post(url, body, options)
      .toPromise()
      .then((response) => {
        console.log(`Deleted image - ${data.public_id} ${response.json().result}`);
        // Remove deleted item for responses
        this.responses.splice(index, 1);
      }).catch((err: any) => {
        console.log(`Failed to delete image ${data.public_id} ${err}`);
      });
  };

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  getFileProperties(fileProperties: any) {
    // Transforms Javascript Object to an iterable to be used by *ngFor
    if (!fileProperties) {
      return null;
    }
    return Object.keys(fileProperties)
      .map((key) => ({ 'key': key, 'value': fileProperties[key] }));
  }
}
