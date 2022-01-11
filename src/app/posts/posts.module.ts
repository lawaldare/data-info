import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsListComponent } from './posts-list/posts-list.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { FormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module



@NgModule({
  declarations: [
    PostsListComponent,
    SinglePostComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class PostsModule { }
