import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';

import { PageEvent } from '@angular/material/paginator';

import {
  BehaviorSubject,
  catchError,
  debounceTime,
  map,
  Observable, Subject,
  switchMap, takeUntil,
  tap,
} from 'rxjs';

import { IAuthor } from '../../../core/interfaces/authors.interface';
import { AuthorsService } from '../../services/authors.service';
import { IPaginatedData } from '../../../core/interfaces/paginated-data.interface';
import { PAGE_SIZE_OPTIONS } from '../../../utils/constants';
import { IMetaDataset } from '../../../core/interfaces/meta-dataset-page';
import { ModalService } from '../../../shared/services/modal.service';


@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorsComponent implements OnInit, OnDestroy {

  public authors$!: Observable<IAuthor[]>;
  public allAuthors!: IAuthor[];
  public filteredAuthors!: Observable<IAuthor[]>;
  public showOption: boolean = true;
  public selectedAuthor!: IAuthor[];

  public control!: FormControl;

  public page: number = 1;
  public totalItems!: number;
  public pageSize: number = 10;
  public pageIndex!: number;
  protected _pageSizeOptions: number[] = PAGE_SIZE_OPTIONS;

  private _destroy$ = new Subject<void>();

  private _authorsParams$ =
    new BehaviorSubject<IMetaDataset>({ page: this.page, page_size: this.pageSize });

  constructor(
      private _router: Router,
      private _activatedRoute: ActivatedRoute,
      private _authorsService: AuthorsService,
      private _fb: FormBuilder,
      private _modalService: ModalService,
  ) { }

  public ngOnInit(): void {
    this._createForm();
    this.getFilteredAuthors();
    this._saveQueryParams();
    this._getAllAuthors();
    this.authors$ = this._getAuthors();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public openAuthorInfoModal(): void {
    if (this.selectedAuthor.length === 1) {
      this._modalService.openAuthorModal(this.selectedAuthor[0]);
    } else {
      this._modalService.openAuthorListModal(this.selectedAuthor);
    }
  }

  public getFilteredAuthors(): void {
    this.filteredAuthors = this.control.valueChanges
      .pipe(
        map((value: string) => {
          if (this.showOption) {
            this.selectedAuthor = this._filteringAuthors(value || '');

            return this._filteringAuthors(value || '');
          }
          this.showOption = true;

          return [];
        }),
      );
  }

  public selectedOption(option: IAuthor): void {
    this.control.patchValue(`${option.firstName} ${option.secondName}`);
    this.showOption = false;
    this._modalService.openAuthorModal(option);
  }

  public pageEvent(event: PageEvent): void {
    this._updatePaginationAuthors(event.pageIndex + 1, event.pageSize);
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

    this._updatePaginationAuthors(this.page, this.pageSize);
  }

  private _setMetaData(authors: IPaginatedData<IAuthor>): void {
    this.page = authors.page;
    this.totalItems = authors.totalItems;
    this.pageSize = authors.pageSize;
  }

  private _getAuthors(): Observable<IAuthor[]> {
    return this._authorsParams$
      .pipe(
        debounceTime(300),
        switchMap((params: IMetaDataset) => {
          return this._authorsService.getAuthors(params)
            .pipe(
              tap((authors: IPaginatedData<IAuthor>) => {
                this._setMetaData(authors);
              }),
              map((authors: IPaginatedData<IAuthor>) => authors.result),
              catchError(() => []),
            );
        }),
      );
  }

  private _updatePaginationAuthors(page: number, pageSize: number): void {
    const parameters: IMetaDataset = {
      page: page,
      page_size: pageSize,
    };

    this._authorsParams$.next(parameters);
  }

  private _getAllAuthors(): void {
    this._authorsService.getAllAuthors$
      .pipe(
        map((author: IPaginatedData<IAuthor>) => author.result),
        tap((author: IAuthor[]) => this.allAuthors = author),
        takeUntil(this._destroy$),
      )
      .subscribe();
  }

  private _filteringAuthors(value: string): IAuthor[] | [] {
    if (value){
      const filterValue: string = value.toLowerCase();

      if (this.allAuthors) {
        return this.allAuthors.filter((option: IAuthor) => {
          return `${option.firstName} ${option.secondName}`.toLowerCase().includes(filterValue);
        });
      }

      return this.allAuthors;
    }

    return [];
  }

  private _createForm(): void {
    this.control = this._fb.control('');
  }
}
