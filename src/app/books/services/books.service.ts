import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IBook } from '../../core/interfaces/books.interface';
import { IPaginatedData } from '../../core/interfaces/paginated-data.interface';
import { IMetaDataset } from '../../core/interfaces/meta-dataset-page';


@Injectable({ providedIn: 'root' })
export class BooksService {

  constructor(
      private _http: HttpClient,
  ) { }

  public getBook(id: number): Observable<IBook> {
    return this._http.get<IBook>(`/api/books/${id}/`);
  }

  public getBooks(params: IMetaDataset): Observable<IPaginatedData<IBook>> {
    return this._http.get<IPaginatedData<IBook>>('/api/books/', { params: { ...params }});
  }

  public postBook(book: IBook): Observable<IBook> {
    return this._http.post<IBook>('/api/books/', book);
  }
}
