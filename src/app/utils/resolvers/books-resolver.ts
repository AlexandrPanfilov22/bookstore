import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { inject } from '@angular/core';

import { Observable } from 'rxjs';

import { BooksService } from '../../books/services/books.service';
import { IFilter, IMetaDataset } from '../../core/interfaces/meta-dataset-page';
import { IPaginatedData } from '../../core/interfaces/paginated-data.interface';
import { IBook } from '../../core/interfaces/books.interface';

export const BooksResolver: ResolveFn<IPaginatedData<IBook>> =
  (route: ActivatedRouteSnapshot): Observable<IPaginatedData<IBook>> => {
    const page: number = +(route.queryParams['page']) || 1;
    const pageSize: number = +(route.queryParams['pageSize']) || 10;
    const filter = route.queryParams['filter'] as IFilter | string;
    if (typeof filter === 'string') {
      return inject(BooksService).getBooks({
        page: page,
        page_size: pageSize,
        ...JSON.parse(filter),
      } as IMetaDataset);
    }

    return inject(BooksService).getBooks({ page: page, page_size: pageSize });
  };
