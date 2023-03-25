import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosComponent } from './photos.component';
import { PhotosRoutingModule } from './photos-routing.module';
import { SharedModule } from '@shared';
import { PhotosService } from './services/photos.service';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
@NgModule({
  declarations: [PhotosComponent],
  imports: [
    CommonModule,
    PhotosRoutingModule,
    SharedModule,
    MatListModule,
    MatIconModule,
    MatGridListModule,
  ],
  providers: [PhotosService],
})
export class PhotosModule {}
