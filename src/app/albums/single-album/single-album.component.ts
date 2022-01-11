import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Photo, Post } from 'src/app/data.model';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-single-album',
  templateUrl: './single-album.component.html',
  styleUrls: ['./single-album.component.scss']
})
export class SingleAlbumComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router) { }

  photos: Photo[] = [];
  filteredPhotos: Photo[] = [];
  userId: string | null | undefined;

  loading = false;

  p = 1;



  private _searchTerm = "";

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.performFilter(this.searchTerm);
  }

  sub: Subscription = new Subscription();


  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this.getAlbumPhotosByAlbumId(id)
    });
    this.userId = localStorage.getItem("userId");
  }


  getAlbumPhotosByAlbumId(albumId: any) {
    this.loading = true;
    this.sub = this.dataService.getPhotosByAlbumId(albumId).subscribe((data: any) => {
      this.loading = false;
      this.photos = data;
      this.performFilter(this.searchTerm);
    }, error => {
      this.loading = false;
      console.log(error);
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

  goToUser(): void {
    this.router.navigate(['/users', this.userId]);
  }

  goToPhoto(id: number) {
    this.router.navigate(['/photos', id]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
