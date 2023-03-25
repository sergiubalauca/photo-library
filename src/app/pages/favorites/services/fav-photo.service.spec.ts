import { TestBed } from '@angular/core/testing';

import { FavPhotoService } from './fav-photo.service';

describe('FavPhotoService', () => {
  let service: FavPhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavPhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
