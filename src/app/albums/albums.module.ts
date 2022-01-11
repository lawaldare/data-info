import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumsRoutingModule } from './albums-routing.module';
import { AlbumsListComponent } from './albums-list/albums-list.component';
import { SingleAlbumComponent } from './single-album/single-album.component';
import { FormsModule } from '@angular/forms';


import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module







@NgModule({
  declarations: [
    AlbumsListComponent,
    SingleAlbumComponent
  ],
  imports: [
    CommonModule,
    AlbumsRoutingModule,
    SharedModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class AlbumsModule { }
