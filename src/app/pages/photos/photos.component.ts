import { Component } from '@angular/core';
import { getBase64ImageFromUrl, Image, lazyArray, Photo } from '@shared';
import { RxDocument } from 'rxdb';
import {
  concatMap,
  flatMap,
  map,
  mergeMap,
  Observable,
  scan,
  switchMap,
} from 'rxjs';
import { RxdbProvider } from '@localStorage';
import { PhotosService } from './services/photos.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent {
  public photos$!: Observable<Photo[]>;
  private readonly photosApiOptions = {
    page: 1,
    limit: 5,
  };
  public currentPage = 1;
  public numOfImages = 5;
  items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);
  constructor(
    private photosService: PhotosService,
    private rxdbProvider: RxdbProvider
  ) {}

  public ngOnInit(): void {
    this.photos$ = this.loadPhotos(this.photosApiOptions);
  }

  public loadPhotos(photoApiOpts: {
    page: number;
    limit: number;
  }): Observable<Photo[]> {
    return this.photosService.getPhotos(photoApiOpts).pipe(
      map((photos: Photo[]) => {
        for (let index = 0; index < photos.length; index++) {
          const element = photos[index];
          element.alt = `#${index} - ${element.author}`;
          element.status = false;
          element.cols = 2;
          element.rows = 1;
        }
        return photos;
      })
    );
  }
  public loadMoreEntries(): void {
    this.photosApiOptions.page++;

    this.photos$ = this.photos$.pipe(
      concatMap((photos: Photo[]) => {
        return this.photosService.getPhotos(this.photosApiOptions).pipe(
          map((newPhotos: Photo[]) => {
            return [...photos, ...newPhotos];
          })
        );
      })
    );
  }

  public async uploadToRxdb(photo: Photo) {
    const imageAttachement = await getBase64ImageFromUrl(photo.download_url);
    const photoCollection = this.rxdbProvider.getDatabaseCollection('photos');

    if (photoCollection) {
      try {
        const doc: RxDocument = await photoCollection.insert(photo);
        await doc.putAttachment({
          id: photo.id,
          type: 'image/jpeg',
          data: imageAttachement,
        });
      } catch (error) {
        console.log('Already exists');
      }
    }
  }
}
