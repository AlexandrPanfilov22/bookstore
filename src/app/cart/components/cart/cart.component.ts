import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { CartService } from '../../../shared/services/cart.service';
import { ICartBook } from '../../interfaces/cart-book.interface';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {

  public cartItems$!: Observable<ICartBook[]>;
  public cartItemsCount$!: Observable<number>;

  constructor(
      private _cartService: CartService,
  ) { }

  public ngOnInit(): void {
    this.cartItems$ = this.getCart();
    this.cartItemsCount$ = this.getCountCart();
  }

  public getCountCart(): Observable<number> {
    return this._cartService.cartCount$;
  }

  public getCart(): Observable<ICartBook[]> {
    return this._cartService.cart$;
  }

  public clearCart(): void {
    return this._cartService.clearCart();
  }

  public remove(index: number): void {
    this._cartService.removeItem(index);
  }

  public increaseQuantity(book: ICartBook): void {
    book.count++;
  }

  public decreaseQuantity(book: ICartBook, index: number): void {
    if (book.count > 1) {
      book.count--;
    } else {
      this.remove(index);
    }
  }
}
