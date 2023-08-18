import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { transformObjectToCamel } from '../utils/functions/snake-to-camel';
import { transformObjectToSnake } from '../utils/functions/camel-to-snake';


@Injectable()
export class ConvertCaseInterceptor implements HttpInterceptor {

  public intercept(request: HttpRequest<Request>,
    next: HttpHandler): Observable<HttpEvent<Event>> {
      
    const clonedRequest: HttpRequest<any> = request.body ?
      request.clone({ body: transformObjectToSnake(request.body) }) : 
      request;

    return next.handle(clonedRequest)
      .pipe(
        map((value: HttpEvent<Event>) => {
          if (value instanceof HttpResponse) {
            if (value.body) {
              return value.clone({
                body: transformObjectToCamel(value.body),
              });
            }
          }

          return value;
        }),
      );
  }
}
