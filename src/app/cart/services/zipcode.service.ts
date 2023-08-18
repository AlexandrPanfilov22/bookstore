import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ZipcodeService {

  constructor(
      private _http: HttpClient,
  ) { }

  public getZipcode(zipcode: number): Observable<boolean> {
    const params: { zipcode: number } = { zipcode: zipcode };

    return this._http.get<{ isValid: boolean }>('/api/cart/check_zipcode/', { params: params })
      .pipe(
        map((response: { isValid: boolean }) => response.isValid),
        catchError(() => of(false)),
      );
  }
}
