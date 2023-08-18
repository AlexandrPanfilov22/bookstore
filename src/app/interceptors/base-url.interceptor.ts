import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {Observable} from "rxjs";
import { environment } from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class BaseUrlInterceptor implements HttpInterceptor {

  constructor() { }

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modifiedRequest = request.clone({
      url: environment.apiUrl + request.url,
    });

    return next.handle(modifiedRequest);
  }
}
