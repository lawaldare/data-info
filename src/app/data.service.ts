import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Album, Photo, Post } from './data.model';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  BASE_URL = 'https://jsonplaceholder.typicode.com/';

  constructor(private httpClient: HttpClient) {}

  getPosts() {
    return this.httpClient.get(`${this.BASE_URL}posts`);
  }

  private posts$ = this.httpClient.get<Post[]>(`${this.BASE_URL}posts`);
  posts = toSignal<Post[], Post[]>(this.posts$, { initialValue: [] });
  singlePostId = signal<string | undefined>(undefined);
  selectedPost$ = toObservable(this.singlePostId).pipe(
    switchMap((id) => this.httpClient.get<Post>(`${this.BASE_URL}posts/${id}`))
  );
  selectedPost = toSignal<Post, undefined>(this.selectedPost$, {
    initialValue: undefined,
  });

  private albums$ = this.httpClient.get<Album[]>(`${this.BASE_URL}albums`);
  albums = toSignal<Album[], Album[]>(this.albums$, { initialValue: [] });

  private photos$ = this.httpClient.get<Photo[]>(`${this.BASE_URL}photos`);
  photos = toSignal<Photo[], Photo[]>(this.photos$, { initialValue: [] });

  getSinglePost(id: string) {
    this.singlePostId.set(id);
  }

  getSingleUser(id: string) {
    return this.httpClient.get(`${this.BASE_URL}users/${id}`);
  }

  getAlbums() {
    return this.httpClient.get(`${this.BASE_URL}albums`);
  }

  getPhotosByAlbumId(albumId: string) {
    return this.httpClient.get(`${this.BASE_URL}albums/${albumId}/photos`);
  }

  getPhotos() {
    return this.httpClient.get(`${this.BASE_URL}photos`);
  }

  getSinglePhoto(id: string) {
    return this.httpClient.get(`${this.BASE_URL}photos/${id}`);
  }

  getSingleUserPosts(id: string) {
    return this.httpClient.get(`${this.BASE_URL}users/${id}/posts`);
  }

  getSingleUserAlbums(id: string) {
    return this.httpClient.get(`${this.BASE_URL}users/${id}/albums`);
  }
}
