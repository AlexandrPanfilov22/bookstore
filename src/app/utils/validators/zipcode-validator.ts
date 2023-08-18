import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';

import { debounceTime, map, Observable, switchMap, take } from 'rxjs';

import { ZipcodeService } from '../../cart/services/zipcode.service';


@Injectable({ providedIn: 'root' })
export class ZipcodeValidator {

  constructor(
        private _zipcodeService: ZipcodeService,
  ) { }

  public zipcodeValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {

      return control.valueChanges.pipe(
        debounceTime(600),
        take(1),
        switchMap((zipCode: number) => this._zipcodeService.getZipcode(zipCode)),
        map((isValid: boolean) => {
          if (!isValid) {
            return { zipcode: true };
          }

          return null;
        }),
      );
    };
  }
}
