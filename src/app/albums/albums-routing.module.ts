import { SingleAlbumComponent } from './single-album/single-album.component';
import { AlbumsListComponent } from './albums-list/albums-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", component: AlbumsListComponent },
  { path: ":id", component: SingleAlbumComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumsRoutingModule { }
