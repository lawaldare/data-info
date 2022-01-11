import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Album } from 'src/app/data.model';
import { DataService } from 'src/app/data.service';


@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.scss']
})
export class AlbumsListComponent implements OnInit, OnDestroy {

  albums: Album[] = [];
  filteredAlbums: Album[] = [];

  loading = false;
  userId = "";
  p = 1;


  users = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  private _searchTerm = "";
  returnedArray: Album[] = [];

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.performFilter(this.searchTerm);
  }

  sub: Subscription = new Subscription();

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.getAlbumsList();
  }

  selectUser(userId: string) {
    if (userId) {
      this.filteredAlbums = this.albums.filter((album: Album) =>
        album.userId == Number(userId)
      );
    } else {
      this.filteredAlbums = this.albums;
    }
  }


  getAlbumsList(): void {
    this.loading = true;
    this.sub = this.dataService.getAlbums().subscribe((data: any) => {
      this.loading = false;
      this.albums = data;
      this.performFilter(this.searchTerm);
    }, err => {
      this.loading = false;
      console.log(err);
    })
  }

  goToUser(userId: number): void {
    this.router.navigate(['/users', userId]);
  }


  goToAlbum(album: any) {
    if (this.searchTerm) {
      this.router.navigate(['/albums', album.id], { queryParams: { search: this.searchTerm } });
    } else {
      this.router.navigate(['/albums', album.id]);
    }
    localStorage.setItem('userId', album.userId);
  }

  performFilter(term: string): void {
    if (term) {
      this.filteredAlbums = this.albums.filter((album: Album) =>
        album.title.toLowerCase().indexOf(term.toLowerCase()) !== -1
      );
    } else {
      this.filteredAlbums = this.albums;
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }



}
