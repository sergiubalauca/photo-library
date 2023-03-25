import { Injectable } from '@angular/core';
import { RxdbProvider } from '@localStorage';
import { Photo } from '@shared';
import { map, Observable } from 'rxjs';

@Injectable()
export class FavPhotoService {
  constructor(private rxdbProvider: RxdbProvider) {}

  public getFavPhotos(): Observable<Photo[]> | undefined {
    const photoCollection = this.rxdbProvider.getDatabaseCollection('photos');
    if (photoCollection) {
      return photoCollection.find().$.pipe(
        map((data) => {
          return data as Photo[];
        })
      );
    }

    return undefined;
  }
}
