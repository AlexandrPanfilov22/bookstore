import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

import { debounceTime, map, Observable, switchMap, take } from 'rxjs';

import { AuthorizationService } from '../../authorization/services/authorization.service';


@Injectable({ providedIn: 'root' })
export class AvailableEmailValidator {
  constructor(
    private _authorizationService: AuthorizationService,
  ) { }

  public availableEmailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return control.valueChanges
        .pipe(
          debounceTime(600),
          take(1),
          switchMap((email: string) => this._authorizationService.isAvailableEmail(email)),
          map((isAvailable: boolean) => {
            if (!isAvailable) {
              return { isAvailableEmail: true };
            }

            return null;
          }),
        );
    };
  }
}
