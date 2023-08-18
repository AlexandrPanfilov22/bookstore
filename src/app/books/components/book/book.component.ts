import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { IBook } from '../../../core/interfaces/books.interface';
import { CartService } from '../../../shared/services/cart.service';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookComponent {

  @Input()
  public book!: IBook;

  public image: string = 'url(http://placekitten.com/g/160/120)';

  constructor(
      private _cartService: CartService,
  ) { }

  public addToCart(book: IBook): void {
    this._cartService.addToCart(book);
  }
}
