import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotosRoutingModule } from './photos-routing.module';
import { PhotosListComponent } from './photos-list/photos-list.component';
import { SinglePhotoComponent } from './single-photo/single-photo.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module



@NgModule({
  declarations: [
    PhotosListComponent,
    SinglePhotoComponent
  ],
  imports: [
    CommonModule,
    PhotosRoutingModule,
    SharedModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class PhotosModule { }
