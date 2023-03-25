import { Component, OnInit } from '@angular/core';
import { RxdbProvider } from '@localStorage';
import { Photo } from '@shared';
import { map, Observable } from 'rxjs';
import { FavPhotoService } from './services/fav-photo.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  public favPhotos$: Observable<Photo[]> | undefined;

  constructor(
    private favPhotoService: FavPhotoService,
    private rxdbProvider: RxdbProvider
  ) {}

  public ngOnInit(): void {
    this.favPhotos$ = this.favPhotoService.getFavPhotos();
  }

  public async removeFromFavorites(photo: Photo): Promise<void> {
    const photoCollection = this.rxdbProvider.getDatabaseCollection('photos');
    if (photoCollection) {
      const photoDoc = await photoCollection.findOne(photo.download_url).exec();
      if (photoDoc) {
        return await photoDoc.remove();
      }
    }
  }
}
