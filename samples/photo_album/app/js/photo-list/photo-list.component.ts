import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {PhotoAlbum} from '../model/photo-album.service';
import {Photo} from '../model/photo';

@Component({
    selector: 'photo-list',
    templateUrl: 'photo-list.component.html',
    styleUrls: ['photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

    private photos: Observable<Photo[]>;
    private publicId: string = 'officialchucknorrispage';

    constructor(
        private photoAlbum: PhotoAlbum
    ) { }

    ngOnInit(): void {
        this.photos = this.photoAlbum.getPhotos();
    }

    changePublicId() {
      this.publicId = (this.publicId === 'officialchucknorrispage') ? 'billclinton' : 'officialchucknorrispage';
    }
}
