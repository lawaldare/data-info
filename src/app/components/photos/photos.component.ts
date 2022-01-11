import { Photo } from './../../data.model';
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit, OnChanges {

  @Input() albumId = 0;
  photos: Photo[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['albumId'].currentValue) {
      this.getAlbumPhotosByAlbumId(changes['albumId'].currentValue);
    }
  }




  getAlbumPhotosByAlbumId(albumId: string) {
    this.dataService.getPhotosByAlbumId(albumId).subscribe((data: any) => {
      this.photos = data.slice(0, 4);
    })
  }

}
