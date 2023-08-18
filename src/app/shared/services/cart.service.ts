import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { IBook } from '../../core/interfaces/books.interface';
import { ICartBook } from '../../cart/interfaces/cart-book.interface';


@Injectable({
  providedIn: 'root',
})
export class CartService {

  private _cart$ = new BehaviorSubject<ICartBook[]>([]);
  private _cartCount$ = new BehaviorSubject<number>(0);

  public get cart$(): Observable<ICartBook[]> {
    return this._cart$.asObservable();
  }

  public get cartCount$(): Observable<number> {
    return this._cartCount$.asObservable();
  }

  public addToCart(book: IBook): void {
    const cart: ICartBook[] = this._cart$.value;

    const existingItemIndex: number = cart.findIndex((element: ICartBook) => {
      return element.element.id === book.id;
    });

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].count++;
    } else {
      cart.push({ element: book, count: 1 });
    }

    this._cartCount$.next(cart.length);
    this._cart$.next(cart);
  }

  public clearCart(): void {
    this._cartCount$.next(0);
    this._cart$.next([]);
  }

  public removeItem(index: number): void {
    const cart: ICartBook[] = this._cart$.value;

    if (index >= 0 && index < cart.length) {
      cart.splice(index, 1);
      this._cart$.next(cart);
      this._cartCount$.next(cart.length);
    }
  }
}
