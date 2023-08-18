import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';

import { ITokenInterface } from '../interfaces/token.interface';
import { ILogIn } from '../interfaces/authorization.interface';


@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {

  private _isLoggedInStatus$ = new BehaviorSubject(false);

  constructor(
    private _http: HttpClient,
    private _router: Router,
  ) { }

  public get isLoggedInStatus$(): Observable<boolean> {
    return this._isLoggedInStatus$.asObservable();
  }

  public login(userData: ILogIn): Observable<ITokenInterface> {
    return this._http.post<ITokenInterface>('https://bookstore-api.verdgil.org/api/token/login/', userData);
  }

  public register(userData: ILogIn): Observable<ITokenInterface> {
    return this._http.post<ITokenInterface>('/api/users/', userData);
  }

  public logOut(): Observable<unknown> {
    this._router.navigate(['/login']);
    this._isLoggedInStatus$.next(false);

    return this._http.post('/api/token/logout/', null);
  }

  public isLoggedIn(): Observable<boolean> {
    return this._http.get('/api/users/me/')
      .pipe(
        map(() => {
          this._isLoggedInStatus$.next(true);

          return true;
        }),
        catchError(() => {
          this._isLoggedInStatus$.next(false);
          this._router.navigate(['/login']);

          return of(false);
        }),
      );
  }

  public isAvailableEmail(email: string): Observable<boolean> {
    const params: { email: string } = { email: email };

    return this._http.get<{ isAvailable: boolean }>('/api/users/available/', { params: params })
      .pipe(
        map((response: { isAvailable: boolean }) => response.isAvailable),
        catchError(() => of(false)),
      );
  }
}
