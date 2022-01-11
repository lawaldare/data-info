import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { Album, Photo, Post, User } from 'src/app/data.model';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router) { }

  user: User = {
    id: 0,
    name: '',
    username: '',
    email: '',
    website: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zip: '',
      geo: {
        lat: '',
        lng: ''
      }
    },
    company: {
      bs: '',
      catchPhrase: '',
      name: ''
    }
  }

  posts: Post[] = [];
  albums: Album[] = [];

  loading = false;

  userSub: Subscription = new Subscription();
  postSub: Subscription = new Subscription();
  albumSub: Subscription = new Subscription();

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this.getSingleUser(id);
      this.getSingleUserPosts(id);
      this.getSingleUserAlbums(id);
    });
  }



  getSingleUser(id: any) {
    this.loading = true;
    this.userSub = this.dataService.getSingleUser(id).subscribe((data: any) => {
      this.user = data;
      this.loading = false;
    }, err => {
      this.loading = false;
      console.log(err);
    })
  }

  getSingleUserPosts(id: any) {
    this.loading = true;
    this.postSub = this.dataService.getSingleUserPosts(id).subscribe((data: any) => {
      this.posts = data;
      this.loading = false;
    }, err => {
      this.loading = false;
      console.log(err);
    })
  }

  getSingleUserAlbums(id: any) {
    this.loading = true;
    this.albumSub = this.dataService.getSingleUserAlbums(id).subscribe((data: any) => {
      this.albums = data;
      this.loading = false;
    }, err => {
      this.loading = false;
      console.log(err);
    })
  }


  goToAlbum(albumId: number) {
    this.router.navigate(['/albums', albumId]);
  }

  goToPost(postId: number) {
    this.router.navigate(['/posts', postId]);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.postSub.unsubscribe();
    this.albumSub.unsubscribe();
  }

}
