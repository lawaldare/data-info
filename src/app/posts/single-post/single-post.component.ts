import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/data.model';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  post: Post = {
    userId: 0,
    id: 0,
    title: '',
    body: ''
  }

  loading = false;

  sub: Subscription = new Subscription();

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this.getSinglePost(id)
    });
  }


  getSinglePost(id: any) {
    this.loading = true;
    this.sub = this.dataService.getSinglePost(id).subscribe((data: any) => {
      this.loading = false;
      this.post = data;
    }, error => {
      console.log(error);
      this.loading = false;
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
