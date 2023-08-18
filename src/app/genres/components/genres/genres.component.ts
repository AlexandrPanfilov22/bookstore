import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PageEvent } from '@angular/material/paginator';

import {
  BehaviorSubject,
  catchError,
  debounceTime,
  map,
  Observable,
  Subject,
  switchMap,
  tap } from 'rxjs';

import { IGenre } from '../../../core/interfaces/genres.interface';
import { GenresService } from '../../services/genres.service';
import { IPaginatedData } from '../../../core/interfaces/paginated-data.interface';
import { PAGE_SIZE_OPTIONS } from '../../../utils/constants';
import { IMetaDataset } from '../../../core/interfaces/meta-dataset-page';


@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenresComponent implements OnInit, OnDestroy {

  public genres$!: Observable<IGenre[]>;
  public page: number = 1;
  public totalItems!: number;
  public pageSize: number = 10;
  public pageIndex!: number;

  protected _pageSizeOptions: number[] = PAGE_SIZE_OPTIONS;

  private _genresParams$ =
    new BehaviorSubject<IMetaDataset>({ page: this.page, page_size: this.pageSize });

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
      private _router: Router,
      private _activatedRoute: ActivatedRoute,
      private _genresService: GenresService,
  ) { }

  public ngOnInit(): void {
    this._saveQueryParams();
    this.genres$ = this._getGenres();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public pageEvent(event: PageEvent): void {
    this._updatePaginationGenres(event.pageIndex + 1, event.pageSize);
    this._router.navigate([], { 
      queryParams: { 
        page: event.pageIndex + 1,
        pageSize: event.pageSize,
      },
    });
  }

  private _saveQueryParams(): void {
    const page: number = +(this._activatedRoute.snapshot.queryParams['page']);
    const pageSize: number = +(this._activatedRoute.snapshot.queryParams['pageSize']);

    this.page = page ? page : 1;
    this.pageSize = pageSize ? pageSize : 10;
    this.pageIndex = page - 1;

    this._updatePaginationGenres(this.page, this.pageSize);
  }

  private _setMetaData(genres: IPaginatedData<IGenre>): void {
    this.page = genres.page;
    this.totalItems = genres.totalItems;
    this.pageSize = genres.pageSize;
  }

  private _getGenres(): Observable<IGenre[]> {
    return this._genresParams$
      .pipe(
        debounceTime(300),
        switchMap((params: IMetaDataset) => {
          return this._genresService.getGenres(params)
            .pipe(
              tap((genres: IPaginatedData<IGenre>) => {
                this._setMetaData(genres);
              }),
              map((genres: IPaginatedData<IGenre>) => genres.result),
              catchError(() => []),
            );
        }),
      );
  }

  private _updatePaginationGenres(page: number, pageSize: number): void {
    const parameters: IMetaDataset = {
      page: page,
      page_size: pageSize,
    };

    this._genresParams$.next(parameters);
  }
}
