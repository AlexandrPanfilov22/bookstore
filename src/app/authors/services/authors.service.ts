import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, shareReplay } from 'rxjs';

import { IAuthor } from '../../core/interfaces/authors.interface';
import { IPaginatedData } from '../../core/interfaces/paginated-data.interface';
import { IMetaDataset } from '../../core/interfaces/meta-dataset-page';


@Injectable({
  providedIn: 'root',
})
export class AuthorsService {

  public getAllAuthors$: Observable<IPaginatedData<IAuthor>> =
    this._http.get<IPaginatedData<IAuthor>>('/api/authors/',{ params: { page: 1, page_size: 1000 }})
      .pipe(shareReplay());

  constructor(
      private _http: HttpClient,
  ) { }

  public getAuthor(id: number): Observable<IAuthor> {
    return this._http.get<IAuthor>(`/api/authors/${id}/`);
  }

  public getAuthors(params: IMetaDataset): Observable<IPaginatedData<IAuthor>> {

    return this._http.get<IPaginatedData<IAuthor>>('/api/authors/', { params: { ...params }});
  }

  public postAuthor(author: IAuthor): Observable<IAuthor> {
    return this._http.post<IAuthor>('/api/authors/', author);
  }
}
