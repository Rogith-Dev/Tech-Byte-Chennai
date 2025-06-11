import { NavigationEnd, Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { AppSettings } from "src/app/app-setting";
import { catchError } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  param$!: Observable<any>;
  private url = AppSettings.ENDPOINT;
  private userId!: string;

  constructor(private http: HttpClient,
    private router: Router) {

    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        const path = val.url.split('/');
        if (path[1] == 'user') {
          this.userId = path[2];
        }
      }
    });
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  // get api call
  httpGetMethod(args: any) {
    const url = '/' + args;

    let headerObj = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'accountId': '',
      'userId': ''
    };

    if (this.userId) {
      headerObj['userId'] = this.userId;
    }

    const headers = new HttpHeaders(headerObj);

    return this.http.get(url, { headers }).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  // post api call
  httpPostMethod(args: any, postObj: any) {
    const url = '/' + args;

    let headerObj = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'accountId': '',
      'userId': ''
    };

    if (this.userId) {
      headerObj['userId'] = this.userId;
    }

    const headers = new HttpHeaders(headerObj);

    return this.http.post(url, postObj, { headers }).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
  }

}
