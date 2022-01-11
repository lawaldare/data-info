import { SinglePhotoComponent } from './single-photo/single-photo.component';
import { PhotosListComponent } from './photos-list/photos-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", component: PhotosListComponent },
  { path: ":id", component: SinglePhotoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhotosRoutingModule { }
