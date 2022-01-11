import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  BASE_URL = "https://jsonplaceholder.typicode.com/"

  constructor(private httpClient: HttpClient) { }


  getPosts() {
    return this.httpClient.get(`${this.BASE_URL}posts`);
  }

  getSinglePost(id: string) {
    return this.httpClient.get(`${this.BASE_URL}posts/${id}`);
  }

  getSingleUser(id: string) {
    return this.httpClient.get(`${this.BASE_URL}users/${id}`);
  }

  getAlbums() {
    return this.httpClient.get(`${this.BASE_URL}albums`);
  }

  getPhotosByAlbumId(albumId: string) {
    return this.httpClient.get(`${this.BASE_URL}albums/${albumId}/photos`)
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
