import { ChangeDetectionStrategy, Component,
  EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { map, Observable, Subject, takeUntil, tap } from 'rxjs';

import { IAuthor } from '../../../core/interfaces/authors.interface';
import { IGenre } from '../../../core/interfaces/genres.interface';
import { AuthorsService } from '../../../authors/services/authors.service';
import { GenresService } from '../../../genres/services/genres.service';
import { IPaginatedData } from '../../../core/interfaces/paginated-data.interface';
import { BooksService } from '../../services/books.service';
import { IFilter } from '../../../core/interfaces/meta-dataset-page';
import { IFilterBook } from '../../interfaces/filter-form.interface';
import { toDateOnly } from '../../../utils/functions/to-date-only';
import { deleteEmptyFields } from '../../../utils/functions/delete-empty-fields';


@Component({
  selector: 'app-filter-books',
  templateUrl: './filter-books.component.html',
  styleUrls: ['./filter-books.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterBooksComponent implements OnInit, OnDestroy {

  @Input()
  public initValueForm: IFilter = {};

  @Output()
  public filterEvent: EventEmitter<IFilter> = new EventEmitter<IFilter>;

  @Output()
  public clearFilter: EventEmitter<IFilter> = new EventEmitter<IFilter>;

  public filterForm!: FormGroup;

  public authors!: IAuthor[];
  public filteredAuthors$!: Observable<IAuthor[]>;

  public genres!: IGenre[];
  public filteredGenres$!: Observable<IGenre[]>;

  private _destroy$ = new Subject<void>();

  constructor(
    private _formBuilder: FormBuilder,
    private _booksService: BooksService,
    private _authorService: AuthorsService,
    private _genresService: GenresService,
  ) { }

  public get title(): FormControl {
    return this.filterForm.get('title') as FormControl;
  }

  public get author(): FormControl {
    return this.filterForm.get('author') as FormControl;
  }

  public get genre(): FormControl {
    return this.filterForm.get('genre') as FormControl;
  }

  public get writingDateLte(): FormControl {
    return this.filterForm.get('writing_date_lte') as FormControl;
  }

  public get writingDateGte(): FormControl {
    return this.filterForm.get('writing_date_gte') as FormControl;
  }

  public ngOnInit(): void {
    this._createForm();
    this.initValue();
    
    this._getAuthors();
    this._getFilteredAuthorsElements();
    
    this._getGenres();
    this._getFilteredGenresElements();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public initValue(): void {
    this.filterForm.patchValue(deleteEmptyFields(this.initValueForm));
  }

  public emitObject(): void {
    const filterValue: IFilter = this.filterForm.getRawValue() as IFilter;

    filterValue.writing_date_lte = toDateOnly(this.writingDateLte.value as Date);
    filterValue.writing_date_gte = toDateOnly(this.writingDateGte.value as Date);

    this.filterEvent.emit(deleteEmptyFields(filterValue));
  }

  public clear(): void {
    this.filterForm.reset();

    this.clearFilter.emit(deleteEmptyFields(this.filterForm.value as IFilter));
  }

  private _createForm(): void {
    this.filterForm = this._formBuilder.group<IFilterBook>({
      title: this._formBuilder.control(''),
      author: this._formBuilder.control(''),
      genre: this._formBuilder.control(''),
      price_gte: this._formBuilder.control(null),
      price_lte: this._formBuilder.control(null),
      writing_date_lte: this._formBuilder.control(''),
      writing_date_gte: this._formBuilder.control(''),
    });
  }

  private _getAuthors(): void {
    this._authorService.getAllAuthors$
      .pipe(
        map((author: IPaginatedData<IAuthor>) => author.result),
        tap((author: IAuthor[]) => this.authors = author),
        takeUntil(this._destroy$),
      )
      .subscribe();
  }

  private _getFilteredAuthorsElements(): void {
    this.filteredAuthors$ = this.author.valueChanges
      .pipe(
        map((value: string) => this._filteringAuthors(value || '')),
      );
  }

  private _filteringAuthors(value: string): IAuthor[] {
    const filterValue: string = value.toLowerCase();

    if (this.authors) {
      return this.authors.filter((option: IAuthor) => {
        return `${option.firstName} ${option.secondName}`.toLowerCase().includes(filterValue);
      });
    }

    return this.authors;
  }

  private _getGenres(): void {
    this._genresService.getAllGenres$
      .pipe(
        map((genres: IPaginatedData<IGenre>) => genres.result),
        tap((genre: IGenre[]) => this.genres = genre),
        takeUntil(this._destroy$),
      ).subscribe();
  }

  private _getFilteredGenresElements(): void {
    this.filteredGenres$ = this.genre.valueChanges
      .pipe(
        map((value: string) => this._filteringGenres(value || '')),
      );
  }

  private _filteringGenres(value: string): IGenre[] {
    const filterValue: string = value.toLowerCase();

    if (this.genres) {
      return this.genres.filter((option: IGenre) => {
        return option.title.toLowerCase().includes(filterValue);
      });
    }

    return this.genres;
  }
}
