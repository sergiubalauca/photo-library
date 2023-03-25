import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesRoutingModule } from './favorites-routing.module';
import { SharedModule } from '@shared';
import { FavoritesComponent } from './favorites.component';
import { FavPhotoService } from './services/fav-photo.service';

@NgModule({
  declarations: [FavoritesComponent],
  imports: [CommonModule, FavoritesRoutingModule, SharedModule],
  providers: [FavPhotoService]
})
export class FavoritesModule {}
