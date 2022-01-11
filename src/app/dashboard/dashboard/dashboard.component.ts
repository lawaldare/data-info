/* eslint-disable @typescript-eslint/no-explicit-any */
import { Album, Photo, Post } from './../../data.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  loading = false;
  posts: Post[] = [];
  albums: Album[] = [];
  photos: Photo[] = [];
  sub: Subscription = new Subscription();

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.sub = forkJoin(
      [this.dataService.getPosts(),
      this.dataService.getAlbums(),
      this.dataService.getPhotos()]
    ).subscribe((data: any) => {
      this.loading = false;
      const [posts, albums, photos] = data;
      this.posts = posts;
      this.albums = albums;
      this.photos = photos;
    }, error => {
      this.loading = false;
      console.log(error);
    })

  }

  goToPost(id: number) {
    this.router.navigate(['/posts', id]);
  }

  goToPhoto(photoId: number) {
    this.router.navigate(['/photos', photoId]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
