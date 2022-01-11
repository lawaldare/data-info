import { PhotosComponent } from './../components/photos/photos.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../components/loader/loader.component';
import { TruncatePipe } from '../truncate.pipe';






@NgModule({
  declarations: [LoaderComponent, TruncatePipe, PhotosComponent],
  exports: [LoaderComponent, TruncatePipe, PhotosComponent],
  imports: [
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [TruncatePipe]

})
export class SharedModule { }
