import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { forkJoin, Observable, shareReplay, Subject, switchMap } from 'rxjs';

import { IBook } from '../../../core/interfaces/books.interface';
import { BooksService } from '../../services/books.service';
import { CartService } from '../../../shared/services/cart.service';
import { AuthorsService } from '../../../authors/services/authors.service';
import { IAuthor } from '../../../core/interfaces/authors.interface';
import { GenresService } from '../../../genres/services/genres.service';
import { IGenre } from '../../../core/interfaces/genres.interface';


@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDetailComponent implements OnInit, OnDestroy {

  public book$!: Observable<IBook>;
  public genres$!: Observable<IGenre[]>;
  public authors$!: Observable<IAuthor[]>;

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
      private _activatedRoute: ActivatedRoute,
      private _router: Router,
      private _booksService: BooksService,
      private _cartService: CartService,
      private _authorService: AuthorsService,
      private _genresService: GenresService,
  ) { }

  public ngOnInit(): void {
    this.book$ = this._getBook();
    this.genres$ = this._getGenres();
    this.authors$ = this._getAuthors();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public goBack(): void {
    this._router.navigate(['books']);
  }

  public addToCart(element: IBook): void {
    this._cartService.addToCart(element);
  }

  private _getBook(): Observable<IBook> {
    const id: number = Number(this._activatedRoute.snapshot.paramMap.get('id'));

    return this._booksService.getBook(id)
      .pipe(shareReplay());
  }

  private _getGenres(): Observable<IGenre[]> {
    return this.book$
      .pipe(
        switchMap((book: IBook) => {
          const genres$: Observable<IGenre>[] = book.genres.map((genreId: number) => {
            return this._genresService.getGenre(genreId);
          });

          if (genres$.length) {
            return forkJoin(genres$);
          }

          return forkJoin({});
        }),
      );
  }

  private _getAuthors(): Observable<IAuthor[]> {
    return this.book$
      .pipe(
        switchMap((book: IBook) => {
          const authors$: Observable<IAuthor>[] = book.author.map((authorId: number) => {
            return this._authorService.getAuthor(authorId);
          });

          if (authors$.length) {
            return forkJoin(authors$);
          }

          return forkJoin({});
        }),
      );
  }
}
