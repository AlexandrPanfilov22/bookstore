import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, shareReplay } from 'rxjs';

import { IGenre } from '../../core/interfaces/genres.interface';
import { IPaginatedData } from '../../core/interfaces/paginated-data.interface';
import { IMetaDataset } from '../../core/interfaces/meta-dataset-page';


@Injectable({
  providedIn: 'root',
})
export class GenresService {

  public getAllGenres$: Observable<IPaginatedData<IGenre>> =
    this._http.get<IPaginatedData<IGenre>>('/api/genres/',{ params: { page: 1, page_size: 1000 }})
      .pipe(shareReplay());

  constructor(
      private _http: HttpClient,
  ) { }

  public getGenre(id: number): Observable<IGenre> {
    return this._http.get<IGenre>(`/api/genres/${id}/`);
  }
  
  public getGenres(params: IMetaDataset): Observable<IPaginatedData<IGenre>> {
    return this._http.get<IPaginatedData<IGenre>>('/api/genres/', { params: { ...params }});
  }
}
