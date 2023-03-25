import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class PhotosService {
  constructor(private http: HttpClient) {}

  public getPhotos({ page = 1, limit = 50 }): Observable<any> {
    // return this.http.get('https://picsum.photos/v2/list?page=2&limit=100');
    const width = 600;
    const height = Number((Math.random() * (1000 - 400) + 400).toFixed());
    // return this.http.get(`https://picsum.photos/${width}/${height}/?random`);
    return this.http.get(
      `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
    );
  }
}
