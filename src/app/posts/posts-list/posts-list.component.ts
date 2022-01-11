import { Post } from './../../data.model';
import { DataService } from 'src/app/data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit, OnDestroy {

  loading = false;
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  userId = "";
  p = 1;

  sub: Subscription = new Subscription();

  users = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  private _searchTerm = "";

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.performFilter(this.searchTerm);
  }

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.getPostsList();
  }


  selectUser(userId: string) {
    if (userId) {
      this.filteredPosts = this.posts.filter((post: Post) =>
        post.userId == Number(userId)
      );
    } else {
      this.filteredPosts = this.posts;
    }
  }



  getPostsList(): void {
    this.loading = true;
    this.sub = this.dataService.getPosts().subscribe((data: any) => {
      this.loading = false;
      this.posts = data;
      this.performFilter(this.searchTerm);
    }, error => {
      this.loading = false;
      console.log(error);
    })
  }

  performFilter(term: string): void {
    if (term) {
      this.filteredPosts = this.posts.filter((post: Post) =>
        post.title.toLowerCase().indexOf(term.toLowerCase()) !== -1
      );
    } else {
      this.filteredPosts = this.posts;
    }
  }

  goToUser(userId: number): void {
    this.router.navigate(['/users', userId]);
  }

  goToPost(postId: number) {
    if (this.searchTerm) {
      this.router.navigate(['/posts', postId], { queryParams: { search: this.searchTerm } });
    } else {
      this.router.navigate(['/posts', postId]);
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
