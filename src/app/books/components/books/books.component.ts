import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PageEvent } from '@angular/material/paginator';

import {
  catchError,
  debounceTime,
  map,
  Observable, startWith, Subject,
  switchMap,
  tap,
} from 'rxjs';

import { IBook } from '../../../core/interfaces/books.interface';
import { BooksService } from '../../services/books.service';
import { IPaginatedData } from '../../../core/interfaces/paginated-data.interface';
import { PAGE_SIZE_OPTIONS } from '../../../utils/constants';
import { IFilter, IMetaDataset } from '../../../core/interfaces/meta-dataset-page';
import { deleteEmptyFields } from '../../../utils/functions/delete-empty-fields';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksComponent implements OnInit {

  public books$!: Observable<IBook[]>;
  public page: number = 1;
  public totalItems!: number;
  public pageSize: number = 10;
  public pageIndex!: number;

  public filterData!: IFilter;

  protected _pageSizeOptions: number[] = PAGE_SIZE_OPTIONS;

  private _booksParams$ = new Subject<IMetaDataset>();

  constructor(
      private _router: Router,
      private _activatedRoute: ActivatedRoute,
      private _bookService: BooksService,
  ) { }

  public ngOnInit(): void {
    this.books$ = this._getBooks();
    this._saveQueryParams();
    this._updatePaginationBooks(this.page, this.pageSize, this.filterData);
  }

  public getFilter(filter: IFilter): void {
    this.filterData = deleteEmptyFields(filter);

    this.page = 1;
    this.pageIndex = 0;

    this.setQueryParams(this.page, this.pageSize, this.filterData);
    this._updatePaginationBooks(this.page, this.pageSize, this.filterData);
  }

  public clearFilter(filter: IFilter): void {
    this.filterData = filter;
    this.setQueryParams(this.page, this.pageSize, filter);
    this._updatePaginationBooks(this.page, this.pageSize, filter);
  }

  public pageEvent(event: PageEvent): void {
    this._updatePaginationBooks(event.pageIndex + 1, event.pageSize, this.filterData);
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.pageIndex = this.page - 1;
    this.setQueryParams(this.page, this.pageSize, this.filterData);
  }

  public setQueryParams(page: number, pageSize: number, filter?: IFilter): void {
    this._router.navigate([], { 
      queryParams: {
        page: page,
        pageSize: pageSize,
        filter: JSON.stringify(filter),
      },
    });
  }

  private _saveQueryParams(): void {
    const page: number = +(this._activatedRoute.snapshot.queryParams['page']);
    const pageSize: number = +(this._activatedRoute.snapshot.queryParams['pageSize']);

    const filter = this._activatedRoute.snapshot.queryParams['filter'] as string;

    try {
      if (filter) {
        this.filterData = deleteEmptyFields(JSON.parse(filter) as IFilter);
      }
    } catch (error) {
      this.filterData = {};
    }

    this.page = page ? page : 1;
    this.pageSize = pageSize ? pageSize : 10;
    this.pageIndex = page - 1;

    this._updatePaginationBooks(this.page, this.pageSize, this.filterData);
  }

  private _setMetaData(books: IPaginatedData<IBook>): void {
    this.page = books.page;
    this.totalItems = books.totalItems;
    this.pageSize = books.pageSize;
  }
  
  private _getBooks(): Observable<IBook[]> {
    return this._booksParams$
      .pipe(
        debounceTime(300),
        switchMap((params: IMetaDataset) => {
          return this._bookService.getBooks(params)
            .pipe(
              catchError(() => []),
            );
        }),
        startWith(<IPaginatedData<IBook>>this._activatedRoute.snapshot.data['booksResolver']),
        tap((books: IPaginatedData<IBook>) => {
          this._setMetaData(books);
        }),
        map((book: IPaginatedData<IBook>) => book.result),
      );
  }

  private _updatePaginationBooks(page: number, pageSize: number, filter?: IFilter): void {
    const parameters: IMetaDataset = {
      page: page,
      page_size: pageSize,
      ...filter,
    };

    this._booksParams$.next(parameters);
  }
}
