import { PostsListComponent } from './posts-list/posts-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SinglePostComponent } from './single-post/single-post.component';

const routes: Routes = [
  { path: "", component: PostsListComponent },
  { path: ":id", component: SinglePostComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
