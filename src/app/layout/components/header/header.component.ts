import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter, OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

import { Observable, Subject, takeUntil } from 'rxjs';

import { CartService } from '../../../shared/services/cart.service';
import { AuthorizationService } from '../../../authorization/services/authorization.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output()
  public drawer: EventEmitter<void> = new EventEmitter<void>;

  public counter$!: Observable<number>;
  public isLoggedInStatus$!: Observable<boolean>;

  private _destroy$ = new Subject<void>();

  constructor(
    private _cartService: CartService,
    private _authorizationService: AuthorizationService,
  ) { }

  public ngOnInit(): void {
    this.counter$ = this.getCountCart();
    this.isLoggedIn();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public isLoggedIn(): void {
    this.isLoggedInStatus$ = this._authorizationService.isLoggedInStatus$;
  }

  public logOut(): void {
    this._authorizationService.logOut()
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe();
  }

  public toggle(): void {
    this.drawer.emit();
  }

  public getCountCart(): Observable<number> {
    return this._cartService.cartCount$;
  }
}
