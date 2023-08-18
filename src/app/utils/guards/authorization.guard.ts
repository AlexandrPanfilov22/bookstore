import { inject } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthorizationService } from '../../authorization/services/authorization.service';


export const AuthorizationGuard = (): Observable<boolean> => {
  const authService = inject(AuthorizationService);

  return authService.isLoggedIn();
};
