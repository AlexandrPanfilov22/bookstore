import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { map, Observable, Subject, takeUntil } from 'rxjs';

import { BooksService } from '../../services/books.service';
import { GenresService } from '../../../genres/services/genres.service';
import { AuthorsService } from '../../../authors/services/authors.service';
import { IAuthor } from '../../../core/interfaces/authors.interface';
import { IGenre } from '../../../core/interfaces/genres.interface';
import { IPaginatedData } from '../../../core/interfaces/paginated-data.interface';
import { IBook } from '../../../core/interfaces/books.interface';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { toDateOnly } from '../../../utils/functions/to-date-only';
import { comparisonGreaterDate } from '../../../utils/validators/comparison-greater-date-validator';
import { IFormBook } from '../../interfaces/book-form.interface';


@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateBookComponent implements OnInit, OnDestroy {

  public authors$!: Observable<IAuthor[]>;
  public genres$!: Observable<IGenre[]>;

  public bookForm!: FormGroup;
  public isDataSaved: boolean = false;

  private _destroy$ = new Subject<void>();

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _booksService: BooksService,
    private _genresService: GenresService,
    private _authorsService: AuthorsService,
  ) { }

  public get title(): FormControl {
    return this.bookForm.get('title') as FormControl;
  }

  public get description(): FormControl {
    return this.bookForm.get('description') as FormControl;
  }

  public get price(): FormControl {
    return this.bookForm.get('price') as FormControl;
  }

  public get author(): FormControl {
    return this.bookForm.get('author') as FormControl;
  }

  public get genres(): FormControl {
    return this.bookForm.get('genres') as FormControl;
  }

  public get writingDate(): FormControl {
    return this.bookForm.get('writingDate') as FormControl;
  }

  public get releaseDate(): FormControl {
    return this.bookForm.get('releaseDate') as FormControl;
  }

  public get image(): FormControl {
    return this.bookForm.get('image') as FormControl;
  }

  public ngOnInit(): void {
    this._getAuthors();
    this._getGenres();
    this._createForm();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public onSubmit(): void {
    if (this.bookForm.invalid) {
      return;
    }

    this.saveBook();
  }

  public redirectToBooks(): void {
    this._router.navigate(['books']);
  }

  public saveBook(): void {
    const writingDate: string | null = toDateOnly(this.writingDate.value as Date);
    const releaseDate: string | null = toDateOnly(this.releaseDate.value as Date);

    const bookObj: IBook = {
      title: this.title.value as string,
      description: this.description.value as string,
      price: (this.price.value ?? 0) as number,
      author: this.author.value as number[],
      genres: this.genres.value as number[],
      writingDate: writingDate,
      releaseDate: releaseDate,
    };

    this._booksService.postBook(bookObj)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: () => {
          this.openSnackBar();
          this.redirectToBooks();
          this.isDataSaved = true;
        },
        error: () => this.openSnackBarError('Error adding a book', 'Close'),
      });
  }

  public openSnackBar(): void {
    if (!this.bookForm.invalid) {
      this._snackBar.openFromComponent(SnackBarComponent, { duration: 3000 });
    }
  }

  public openSnackBarError(message: string, action: string): void {
    this._snackBar.open(message, action, { duration: 3000 });
  }

  private _createForm(): void {
    this.bookForm = this._formBuilder.group<IFormBook>({
      title: this._formBuilder.control('', Validators.required),
      description: this._formBuilder.control('', Validators.required),
      price: this._formBuilder.control(null),
      author: this._formBuilder.control([]),
      genres: this._formBuilder.control([]),
      writingDate: this._formBuilder.control(null, Validators.required),
      releaseDate: this._formBuilder.control(null, Validators.required),
      image: this._formBuilder.control(''),
    }, { validators: comparisonGreaterDate('writingDate', 'releaseDate') });
  }

  private _getAuthors(): void {
    this.authors$ = this._authorsService.getAllAuthors$
      .pipe(
        map((author: IPaginatedData<IAuthor>) => author.result),
      );
  }
  
  private _getGenres(): void {
    this.genres$ = this._genresService.getAllGenres$
      .pipe(
        map((genre: IPaginatedData<IGenre>) => genre.result),
      );
    
  }
}
