import { Photo } from './../../data.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/data.model';
import { DataService } from 'src/app/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-photo',
  templateUrl: './single-photo.component.html',
  styleUrls: ['./single-photo.component.scss']
})
export class SinglePhotoComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router) { }

  photo: Photo = {
    albumId: 0,
    id: 0,
    title: '',
    url: '',
    thumbnailUrl: ''
  }

  loading = false;

  sub: Subscription = new Subscription();

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this.getSinglePhoto(id)
    });
  }


  getSinglePhoto(id: any) {
    this.loading = true;
    this.sub = this.dataService.getSinglePhoto(id).subscribe((data: any) => {
      this.photo = data;
      this.loading = false;
    }, err => {
      this.loading = false;
      console.log(err);
    })
  }


  goToAlbum(albumId: number) {
    this.router.navigate(['albums', albumId]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
