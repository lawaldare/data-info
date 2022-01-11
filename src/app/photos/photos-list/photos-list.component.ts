import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Album, Photo } from 'src/app/data.model';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['../../albums/single-album/single-album.component.scss', './photos-list.component.scss']
})
export class PhotosListComponent implements OnInit, OnDestroy {


  photos: Photo[] = [];
  filteredPhotos: Photo[] = [];
  loading = false;

  albumId = "";

  p = 1;

  albums: string[] = [];


  private _searchTerm = "";

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.performFilter(this.searchTerm);
  }

  sub: Subscription = new Subscription();

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.getPhotoList();
    this.albums = this.generateAlbumId();
  }


  generateAlbumId() {
    const output = [];
    for (let i = 1; i <= 100; i++) {
      output.push(String(i));
    }
    return output;
  }

  selectAlbum(albumId: string) {
    if (albumId) {
      this.filteredPhotos = this.photos.filter((photo: Photo) =>
        photo.albumId == Number(albumId)
      );
    } else {
      this.filteredPhotos = this.photos;
    }
  }

  goToPhoto(photoId: number) {
    if (this.searchTerm) {
      this.router.navigate(['/photos', photoId], { queryParams: { search: this.searchTerm } });
    } else {
      this.router.navigate(['/photos', photoId]);
    }
  }



  getPhotoList(): void {
    this.loading = true;
    this.sub = this.dataService.getPhotos().subscribe((data: any) => {
      this.loading = false;
      console.log(data);
      this.photos = data;
      this.performFilter(this.searchTerm);
    }, err => {
      this.loading = false;
      console.log(err);
    })
  }

  performFilter(term: string): void {
    if (term) {
      this.filteredPhotos = this.photos.filter((photo: Photo) =>
        photo.title.toLowerCase().indexOf(term.toLowerCase()) !== -1
      );
    } else {
      this.filteredPhotos = this.photos;
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
